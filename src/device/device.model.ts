type SensorRecord = {
  sensor_id: string;
  sensor_type: string;
  sensor_description: string;
  sensor_value: number;
  sensor_raw_value?: number; // Optional karena tidak semua sensor memilikinya
};

type DeviceData = {
  device: string;
  firmware: string;
  sensors: SensorRecord[];
};
