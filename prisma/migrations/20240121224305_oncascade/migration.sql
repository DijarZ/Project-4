-- DropForeignKey
ALTER TABLE `registration` DROP FOREIGN KEY `Registration_eventId_fkey`;

-- AddForeignKey
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
