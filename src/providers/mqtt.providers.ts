import mqtt from 'mqtt';
import { logger } from './logging.providers';

export class MqttSingelton {
  private static mqttInstance: MqttSingelton;
  public mqttClient: mqtt.MqttClient;

  private constructor() {
    logger.info('[MQTT]: Start Mqtt Connection');
    this.mqttClient = mqtt.connect('mqtt://dimasaulia.com');
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
