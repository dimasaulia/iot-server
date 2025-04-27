import { prisma } from '../providers/database.providers';
import { logger } from '../providers/logging.providers';

export class DeviceService {
  static async recordData(data: DeviceData) {
    try {
      let deviceId: number, deviceCode: String;
      const existingDevice = await prisma.device.findUnique({
        select: {
          device_id: true,
          device_code: true,
        },
        where: {
          device_code: data.device,
        },
      });

      if (!existingDevice) {
        logger.info('[Device]: Create New Device');
        const newDevice = await prisma.device.create({
          data: {
            device_code: data.device,
            firmware: data.firmware,
          },
          select: {
            device_code: true,
            device_id: true,
          },
        });
        deviceId = newDevice.device_id;
        deviceCode = newDevice.device_code;
      } else {
        logger.info('[Device]: Found Existing Device');
        deviceId = existingDevice.device_id;
        deviceCode = existingDevice.device_code;
      }

      logger.info(`Device ID: ${deviceId}`);

      for (let i = 0; i < data.sensors.length; i++) {
        const sensorRecord = data.sensors[i];
        let sensorId: number;

        // Cek Existing Sensor dan Create
        const existingSensor = await prisma.sensor.findMany({
          where: {
            device_id: deviceId,
            sensor_code: sensorRecord.sensor_id,
          },
        });

        if (existingSensor.length === 0) {
          logger.info('[Device]: Create New Sensor');

          const newSensor = await prisma.sensor.create({
            data: {
              sensor_code: sensorRecord.sensor_id,
              description: sensorRecord.sensor_description,
              device_id: deviceId,
            },
            select: {
              sensor_id: true,
            },
          });

          sensorId = newSensor.sensor_id;
          logger.info(`Sensor ID: ${sensorId}`);
        } else {
          logger.info('[Device]: Found Existing Sensor');
          sensorId = existingSensor[0].sensor_id;
        }

        // Store Record
        await prisma.sensorRecord.create({
          data: {
            sensor_id: sensorId,
            value: sensorRecord.sensor_value,
            raw_value: sensorRecord.sensor_raw_value,
          },
        });
      }
    } catch (error) {
      logger.error('Failed to store device record');
    }
  }
}
