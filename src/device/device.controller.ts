import { Hono } from 'hono';
import { logger } from '../providers/logging.providers';
import { MqttSingelton } from '../providers/mqtt.providers';
import { DeviceService } from './device.service';

export const deviceController = new Hono();
const mqttTopic = 'device-record';
const mqtt = MqttSingelton.getInstance().mqttClient;

deviceController.get('/', async (c) => {
  return c.json({
    data: {},
  });
});

// mqtt.on('connect', () => {
//   mqtt.subscribe(mqttTopic, (err) => {
//     if (!err) {
//       logger.info(`[MQTT]: Success Connect to "${mqttTopic}"`);
//     } else {
//       logger.error(`[MQTT]: Failed Connect to "${mqttTopic}": `, err);
//     }
//   });
// });

// mqtt.on('message', (topic, payload) => {
//   try {
//     logger.info(`New Data From "${topic}": ${payload}`);
//     if (topic == mqttTopic) {
//       const parsedPayload = JSON.parse(payload.toString()) as DeviceData;
//       DeviceService.recordData(parsedPayload);
//     }
//   } catch (error) {
//     logger.info(`[MQTT]: Error: ${error}`);
//   }
// });
