-- CreateTable
CREATE TABLE "Device" (
    "device_id" SERIAL NOT NULL,
    "device_code" TEXT NOT NULL,
    "description" TEXT,
    "firmware" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("device_id")
);

-- CreateTable
CREATE TABLE "Sensor" (
    "sensor_id" SERIAL NOT NULL,
    "sensor_code" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "device_id" INTEGER,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("sensor_id")
);

-- CreateTable
CREATE TABLE "SensorRecord" (
    "sensor_record_id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION,
    "raw_value" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "sensor_id" INTEGER,

    CONSTRAINT "SensorRecord_pkey" PRIMARY KEY ("sensor_record_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_device_code_key" ON "Device"("device_code");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "Device"("device_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SensorRecord" ADD CONSTRAINT "SensorRecord_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "Sensor"("sensor_id") ON DELETE SET NULL ON UPDATE CASCADE;
