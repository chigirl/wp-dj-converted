-- =============================================================================
-- Jacob Black DJ Site — Database Migration
-- =============================================================================
-- Source: theme/manual_install/jacob.sql (WordPress/Elementor export)
-- Target: Clean relational MySQL schema for a custom REST API back-end
--
-- Usage:
--   mysql -u <user> -p < migrate.sql
--   OR run individual sections against your preferred DB tool.
--
-- Supported engines: MySQL 5.7+ / MariaDB 10.3+
--   For PostgreSQL, replace AUTO_INCREMENT → SERIAL, TINYINT(1) → BOOLEAN,
--   LONGTEXT → TEXT, and adjust DATETIME defaults as needed.
--
-- CUSTOMIZATION NOTES:
--   1. Change the database name on line ~30 if desired.
--   2. Update the seed data (INSERT statements) to match your real content.
--   3. The 'social_links' column in 'artists' stores JSON; for MySQL < 5.7.8
--      replace JSON with LONGTEXT and validate in application code.
-- =============================================================================

SET NAMES utf8mb4;
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

-- -----------------------------------------------------------------------------
-- Database
-- CUSTOMIZATION: rename 'jacob_black_dj' to your preferred database name
-- -----------------------------------------------------------------------------
CREATE DATABASE IF NOT EXISTS `jacob_black_dj`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `jacob_black_dj`;

-- =============================================================================
-- TABLE: artists
-- Holds all artist profiles (Victoria Russell, Priscilla Williamson, etc.)
-- API: GET /api/artists, GET /api/artists/:slug
-- =============================================================================
CREATE TABLE IF NOT EXISTS `artists` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(255) NOT NULL,
  `slug`        VARCHAR(255) NOT NULL UNIQUE,
  `bio`         LONGTEXT,
  `image_url`   VARCHAR(500),
  -- social_links stores JSON: [{"platform":"facebook","url":"https://..."},...]
  -- CUSTOMIZATION: if you need MySQL < 5.7.8 compatibility, change to LONGTEXT
  `social_links` JSON,
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_artists_slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Seed: artists
-- Source: wp_posts (page_id=21 Artists Single + page_id=8 Artists list)
-- -----------------------------------------------------------------------------
INSERT INTO `artists` (`id`, `name`, `slug`, `bio`, `image_url`, `social_links`) VALUES
(1, 'Victoria Russell',      'victoria-russell',
 'Duis et neque a urna feugiat facilisis. Aliquamir blandit aliquam mi, non auctor turpis interdum eget. Aenean augue nisi, condimentum non tempus at, commodo. Vestibulum vulputate erat. Donec finibus malesuada enim, id gravida neque bibendum sit amet.',
 '/assets/images/img-2.jpg',
 JSON_ARRAY(
   JSON_OBJECT('platform','facebook',  'url','#'),
   JSON_OBJECT('platform','instagram', 'url','#'),
   JSON_OBJECT('platform','youtube',   'url','#')
 )),
(2, 'Priscilla Williamson',  'priscilla-williamson',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tellus augue, finibus eget condimentum in, rutrum ac metus. Nulla non ullamcorper libero, et gravida urna. Aliquam tincidunt tempus velit a tincidunt.',
 '/assets/images/img-3.jpg',
 JSON_ARRAY(
   JSON_OBJECT('platform','facebook',  'url','#'),
   JSON_OBJECT('platform','instagram', 'url','#'),
   JSON_OBJECT('platform','youtube',   'url','#')
 )),
(3, 'Cameron Cooper',        'cameron-cooper',
 'Condimentum in, rutrum ac metus. Nulla non ullamcorper libero et gravida urna. Aliquam tincidunt tempus velit. Sed tellus augue, finibus eget condimentum in, rutrum ac metus.',
 '/assets/images/img-4.jpg',
 JSON_ARRAY(
   JSON_OBJECT('platform','facebook',  'url','#'),
   JSON_OBJECT('platform','instagram', 'url','#'),
   JSON_OBJECT('platform','youtube',   'url','#')
 )),
(4, 'Shawn Robertson',       'shawn-robertson',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non ullamcorper libero, et gravida urna. Aliquam tincidunt tempus velit a tincidunt. Condimentum in, rutrum ac metus.',
 '/assets/images/img-5.jpg',
 JSON_ARRAY(
   JSON_OBJECT('platform','facebook',  'url','#'),
   JSON_OBJECT('platform','instagram', 'url','#'),
   JSON_OBJECT('platform','youtube',   'url','#')
 ));

-- =============================================================================
-- TABLE: releases
-- Music releases: albums, singles shown on the Releases slider page
-- API: GET /api/releases, GET /api/releases/:slug
-- =============================================================================
CREATE TABLE IF NOT EXISTS `releases` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(255) NOT NULL,
  `slug`        VARCHAR(255) NOT NULL UNIQUE,
  `artist_id`   INT UNSIGNED NOT NULL,
  `release_date` DATE,
  `image_url`   VARCHAR(500),
  -- type: 'album' | 'single' | 'ep'
  `type`        VARCHAR(50) NOT NULL DEFAULT 'single',
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_releases_slug` (`slug`),
  KEY `idx_releases_artist` (`artist_id`),
  CONSTRAINT `fk_releases_artist`
    FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Seed: releases
-- Source: wp_posts page_id=11 (Releases slider content from Elementor)
-- Slider had three releases with slider-1/2/3.jpg images
-- -----------------------------------------------------------------------------
INSERT INTO `releases` (`id`, `title`, `slug`, `artist_id`, `release_date`, `image_url`, `type`) VALUES
(1, 'DarkStreets',         'darkstreets',          3, '2023-08-18', '/assets/images/slider-1.jpg', 'single'),
(2, 'Never Be The Same',   'never-be-the-same',    2, '2023-12-22', '/assets/images/slider-2.jpg', 'single'),
(3, 'Vision',              'vision',               1, '2023-09-24', '/assets/images/slider-3.jpg', 'album');

-- =============================================================================
-- TABLE: events
-- Upcoming and past gigs / concerts
-- API: GET /api/events
-- =============================================================================
CREATE TABLE IF NOT EXISTS `events` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `artist_id`   INT UNSIGNED NOT NULL,
  `event_date`  DATE NOT NULL,
  `venue`       VARCHAR(255) NOT NULL,
  `city`        VARCHAR(255) NOT NULL,
  `country`     VARCHAR(100),
  `ticket_url`  VARCHAR(500),
  -- status: 'available' | 'sold-out' | 'free'
  `status`      VARCHAR(20) NOT NULL DEFAULT 'available',
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_events_date` (`event_date`),
  KEY `idx_events_artist` (`artist_id`),
  CONSTRAINT `fk_events_artist`
    FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Seed: events
-- Source: wp_posts page_id=13 (Events page Elementor content)
-- -----------------------------------------------------------------------------
INSERT INTO `events` (`id`, `artist_id`, `event_date`, `venue`, `city`, `country`, `ticket_url`, `status`) VALUES
(1, 1, '2024-01-29', 'Radio XBass',        'Warszawa',   'PL', NULL,       'available'),
(2, 2, '2023-12-22', 'Fabric Club',        'London',     'UK', NULL,       'available'),
(3, 4, '2023-11-10', 'State Farm Arena',   'Atlanta',    'US', NULL,       'sold-out'),
(4, 3, '2023-10-12', 'Migros Pour Cent',   'Genève',     'CH', NULL,       'available'),
(5, 1, '2023-09-24', 'Alice Tully Hall',   'New York',   'US', NULL,       'free'),
(6, 1, '2023-09-07', 'Kwadrat Club',       'Warszawa',   'PL', NULL,       'available');

-- =============================================================================
-- TABLE: posts
-- Blog articles
-- API: GET /api/posts, GET /api/posts/:slug
-- =============================================================================
CREATE TABLE IF NOT EXISTS `posts` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(500) NOT NULL,
  `slug`        VARCHAR(500) NOT NULL UNIQUE,
  `excerpt`     TEXT,
  `content`     LONGTEXT,
  `author`      VARCHAR(255) NOT NULL DEFAULT 'Jacob Black',
  `image_url`   VARCHAR(500),
  `published_at` DATETIME,
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_posts_slug` (`slug`),
  KEY `idx_posts_published` (`published_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Seed: posts
-- Source: wp_posts (post_type='post', ID=1)
-- -----------------------------------------------------------------------------
INSERT INTO `posts` (`id`, `title`, `slug`, `excerpt`, `content`, `author`, `image_url`, `published_at`) VALUES
(1,
 'Hello World!',
 'hello-world',
 'Welcome to Jacob Black. This is the first post. Edit or delete it, then start writing!',
 '<p>Welcome to WordPress. This is your first post. Edit or delete it, then start writing!</p>',
 'Jacob Black',
 '/assets/images/img-1.jpg',
 '2019-11-16 18:12:03'),
(2,
 'DarkStreets — New Release',
 'darkstreets-new-release',
 'Cameron Cooper drops his latest single "DarkStreets" — a pulsing blend of deep bass and melodic synths.',
 '<p>Cameron Cooper drops his latest single "DarkStreets" — a pulsing blend of deep bass and melodic synths that is set to dominate every club floor this season.</p>',
 'Jacob Black',
 '/assets/images/slider-1.jpg',
 '2023-08-18 00:00:00'),
(3,
 'Live at Fabric Club, London',
 'live-at-fabric-club-london',
 'Priscilla Williamson delivered an unforgettable night at Fabric Club. Relive the experience through our gallery.',
 '<p>Priscilla Williamson delivered an unforgettable night at Fabric Club. Relive the experience through our gallery.</p>',
 'Jacob Black',
 '/assets/images/slider-2.jpg',
 '2023-12-22 00:00:00');

-- =============================================================================
-- TABLE: photo_albums
-- Gallery albums shown on the Photo page
-- API: GET /api/photo-albums, GET /api/photo-albums/:id/photos
-- =============================================================================
CREATE TABLE IF NOT EXISTS `photo_albums` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title`       VARCHAR(255) NOT NULL,
  `artist_id`   INT UNSIGNED NOT NULL,
  `year`        YEAR,
  `cover_image` VARCHAR(500),
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_albums_artist` (`artist_id`),
  CONSTRAINT `fk_albums_artist`
    FOREIGN KEY (`artist_id`) REFERENCES `artists` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Seed: photo_albums
-- Source: wp_posts page_id=15 (Photo page) and page_id=24 (photo albums)
-- -----------------------------------------------------------------------------
INSERT INTO `photo_albums` (`id`, `title`, `artist_id`, `year`, `cover_image`) VALUES
(1, 'Cameron Cooper 2023',          3, 2023, '/assets/images/img-6.jpg'),
(2, 'Victoria Russell — Live',      1, 2023, '/assets/images/img-11.jpg'),
(3, 'Priscilla Williamson',         2, 2023, '/assets/images/img-15.jpg'),
(4, 'Shawn Robertson — Session',    4, 2022, '/assets/images/img-1.jpg');

-- =============================================================================
-- TABLE: photos
-- Individual photos inside albums
-- API: GET /api/photo-albums/:id/photos
-- =============================================================================
CREATE TABLE IF NOT EXISTS `photos` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `album_id`    INT UNSIGNED NOT NULL,
  `image_url`   VARCHAR(500) NOT NULL,
  `caption`     VARCHAR(500),
  `sort_order`  INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_photos_album` (`album_id`),
  CONSTRAINT `fk_photos_album`
    FOREIGN KEY (`album_id`) REFERENCES `photo_albums` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Seed: photos
-- Source: uploads/2019/11 (img-6.jpg through img-18.jpg from WP uploads)
-- -----------------------------------------------------------------------------
INSERT INTO `photos` (`album_id`, `image_url`, `sort_order`) VALUES
-- Album 1: Cameron Cooper 2023
(1, '/assets/images/img-6.jpg',  1),
(1, '/assets/images/img-7.jpg',  2),
(1, '/assets/images/img-8.jpg',  3),
(1, '/assets/images/img-9.jpg',  4),
(1, '/assets/images/img-10.jpg', 5),
-- Album 2: Victoria Russell — Live
(2, '/assets/images/img-11.jpg', 1),
(2, '/assets/images/img-12.jpg', 2),
(2, '/assets/images/img-13.jpg', 3),
(2, '/assets/images/img-14.jpg', 4),
-- Album 3: Priscilla Williamson
(3, '/assets/images/img-15.jpg', 1),
(3, '/assets/images/img-16.jpg', 2),
(3, '/assets/images/img-17.jpg', 3),
(3, '/assets/images/img-18.jpg', 4),
-- Album 4: Shawn Robertson — Session
(4, '/assets/images/img-1.jpg',  1),
(4, '/assets/images/img-2.jpg',  2),
(4, '/assets/images/img-3.jpg',  3),
(4, '/assets/images/img-4.jpg',  4),
(4, '/assets/images/img-5.jpg',  5);

-- =============================================================================
-- TABLE: contacts
-- Contact form submissions received from the Contacts page
-- API: POST /api/contact
-- =============================================================================
CREATE TABLE IF NOT EXISTS `contacts` (
  `id`          INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(255) NOT NULL,
  `email`       VARCHAR(255) NOT NULL,
  `subject`     VARCHAR(500),
  `message`     LONGTEXT NOT NULL,
  `created_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_contacts_email` (`email`),
  KEY `idx_contacts_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- TABLE: site_settings
-- Key-value store for global site configuration (social URLs, contact info)
-- API: GET /api/settings  (admin-only: PUT /api/settings/:key)
-- =============================================================================
CREATE TABLE IF NOT EXISTS `site_settings` (
  `key`         VARCHAR(100) NOT NULL,
  `value`       LONGTEXT,
  `updated_at`  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------------------------------
-- Seed: site_settings
-- Source: WordPress theme options + original Elementor widget data
-- CUSTOMIZATION: Replace '#' URLs with your real social profile links
-- CUSTOMIZATION: Replace contact details with your real information
-- -----------------------------------------------------------------------------
INSERT INTO `site_settings` (`key`, `value`) VALUES
-- Site identity
('site_name',           'Jacob Black'),
('site_tagline',        'Producer & DJ'),

-- Social links (used in Home hero + Footer)
-- CUSTOMIZATION: replace '#' with your actual URLs
('social_facebook',     '#'),
('social_twitter',      '#'),
('social_instagram',    '#'),
('social_youtube',      '#'),
('social_telegram',     '#'),

-- Contact details (used on Contacts page)
-- CUSTOMIZATION: replace with your actual contact information
('contact_phone',       '+1 234 567 89 01'),
('contact_address',     '178 West 27th Street, Suite 527, New York NY 10012'),
('contact_email',       'youremail@gmail.com'),

-- Copyright (used in Footer)
('footer_copyright',    'Jacob Black');

SET foreign_key_checks = 1;

-- =============================================================================
-- End of migration
-- =============================================================================
