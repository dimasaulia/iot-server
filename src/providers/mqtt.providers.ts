import mqtt from 'mqtt';
import { logger } from './logging.providers';

export class MqttSingelton {
  private static mqttInstance: MqttSingelton;
  public mqttClient: mqtt.MqttClient;

  private constructor() {
    logger.info('[MQTT]: Start Mqtt Connection');
    this.mqttClient = mqtt.connect('mqtt://dimasaulia.com', {
      username: Bun.env.MQTT_USERNAME,
      password: Bun.env.MQTT_PASSWORD,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 4000,
    });
    this.mqttClient.on('connect', () => {
      logger.info('[MQTT]: Connected');
    });

    this.mqttClient.on('error', (e) => {
      logger.info('[MQTT]: Connection Error');
      logger.info(e.message);
    });
  }

  public static new(): MqttSingelton {
    logger.info('[MQTT]: Create New Mqtt Instance');
    MqttSingelton.mqttInstance = new MqttSingelton();
    return MqttSingelton.mqttInstance;
  }

  public static getInstance(): MqttSingelton {
    logger.info('[MQTT]: Find Mqtt Instance');

    if (!MqttSingelton.mqttInstance) {
      logger.info('[MQTT]: Create New Instance');
      MqttSingelton.mqttInstance = new MqttSingelton();
      return MqttSingelton.mqttInstance;
    }

    logger.info('[MQTT]: Mqtt return existing instance');
    return MqttSingelton.mqttInstance;
  }
}
