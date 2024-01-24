-- AlterTable
ALTER TABLE `event` ALTER COLUMN `maxCapacity` DROP DEFAULT,
    MODIFY `image` VARCHAR(191) NULL;
