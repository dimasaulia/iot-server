/*
  Warnings:

  - You are about to drop the column `eoffice_password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `eoffice_username` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `job_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Job` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `JobActivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Scheduler` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_location_friday_id_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_location_monday_id_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_location_saturday_id_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_location_sunday_id_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_location_thursday_id_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_location_tuesday_id_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_location_wednesday_id_fkey";

-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_user_id_fkey";

-- DropForeignKey
ALTER TABLE "JobActivity" DROP CONSTRAINT "JobActivity_job_id_fkey";

-- DropForeignKey
ALTER TABLE "JobActivity" DROP CONSTRAINT "JobActivity_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Scheduler" DROP CONSTRAINT "Scheduler_user_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_job_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "eoffice_password",
DROP COLUMN "eoffice_username",
DROP COLUMN "job_id";

-- DropTable
DROP TABLE "Attendance";

-- DropTable
DROP TABLE "Job";

-- DropTable
DROP TABLE "JobActivity";

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Scheduler";

-- DropEnum
DROP TYPE "Day";

-- DropEnum
DROP TYPE "Via";
