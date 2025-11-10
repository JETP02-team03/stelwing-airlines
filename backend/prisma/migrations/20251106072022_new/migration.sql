-- CreateTable
CREATE TABLE `countries` (
    `country_id` BIGINT NOT NULL AUTO_INCREMENT,
    `country_code` CHAR(2) NOT NULL,
    `country_name` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `countries_country_code_key`(`country_code`),
    PRIMARY KEY (`country_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cities` (
    `city_id` BIGINT NOT NULL AUTO_INCREMENT,
    `city_name` VARCHAR(191) NOT NULL,
    `country_id` BIGINT NOT NULL,

    PRIMARY KEY (`city_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `airports` (
    `airport_id` BIGINT NOT NULL AUTO_INCREMENT,
    `airport_code` CHAR(3) NOT NULL,
    `airport_name` VARCHAR(150) NOT NULL,
    `city_id` BIGINT NOT NULL,

    UNIQUE INDEX `airports_airport_code_key`(`airport_code`),
    PRIMARY KEY (`airport_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flights` (
    `flight_id` BIGINT NOT NULL AUTO_INCREMENT,
    `flight_number` VARCHAR(6) NOT NULL,
    `flight_date` DATE NOT NULL,
    `origin_iata` CHAR(3) NOT NULL,
    `destination_iata` CHAR(3) NOT NULL,
    `dep_time_utc` DATETIME(3) NULL,
    `arr_time_utc` DATETIME(3) NULL,
    `status` ENUM('SCHEDULED', 'CANCELED') NOT NULL,

    PRIMARY KEY (`flight_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cities` ADD CONSTRAINT `cities_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`country_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `airports` ADD CONSTRAINT `airports_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `cities`(`city_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flights` ADD CONSTRAINT `flights_origin_iata_fkey` FOREIGN KEY (`origin_iata`) REFERENCES `airports`(`airport_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flights` ADD CONSTRAINT `flights_destination_iata_fkey` FOREIGN KEY (`destination_iata`) REFERENCES `airports`(`airport_code`) ON DELETE RESTRICT ON UPDATE CASCADE;
