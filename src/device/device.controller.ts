import { Hono } from 'hono';
import { logger } from '../providers/logging.providers';
import { MqttSingelton } from '../providers/mqtt.providers';
import { DeviceService } from './device.service';
import { createBunWebSocket } from 'hono/bun';
import type { ServerWebSocket } from 'bun';
import { WSContext } from 'hono/ws';
import { DeviceData } from './device.model';

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();
export const deviceController = new Hono();
const mqttTopic = 'device-record';
const mqtt = MqttSingelton.getInstance().mqttClient;
const clients = new Set<WSContext>();

deviceController.get(
  '/ws',
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        console.log(`Message from client: ${event.data}`);
        ws.send('Hello from server!');
      },
      onClose(evt, ws) {
        console.log('Connection Close');
        clients.delete(ws);
      },
      onError(evt, ws) {
        console.log('Connection Error');
        clients.delete(ws);
      },
      onOpen(evt, ws) {
        console.log('Connection open');
        clients.add(ws);
      },
    };
  })
);

deviceController.get('/', async (c) => {
  return c.json({
    data: {},
  });
});

mqtt.on('connect', () => {
  mqtt.subscribe(mqttTopic, (err) => {
    if (!err) {
      logger.info(`[MQTT]: Success Connect to "${mqttTopic}"`);
    } else {
      logger.error(`[MQTT]: Failed Connect to "${mqttTopic}": `, err);
    }
  });
});

mqtt.on('message', (topic, payload) => {
  try {
    logger.info(`New Data From "${topic}": ${payload}`);
    if (topic == mqttTopic) {
      const parsedPayload = JSON.parse(payload.toString()) as DeviceData;
      // Broadcast ke semua WebSocket clients
      const message = JSON.stringify({
        type: 'device-data',
        data: parsedPayload,
      });

      for (const client of clients) {
        client.send(message);
      }

      DeviceService.recordData(parsedPayload);
    }
  } catch (error) {
    logger.info(`[MQTT]: Error: ${error}`);
  }
});
