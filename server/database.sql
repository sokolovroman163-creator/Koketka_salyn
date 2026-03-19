-- Koketka Salon Database Schema for MySQL (Beget)
-- Run this script in phpMyAdmin on Beget to create the database

SET CHARSET utf8mb4;

-- Services categories (Ногтевой сервис, Педикюр, Брови, etc.)
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  icon VARCHAR(50) NOT NULL DEFAULT 'Sparkles',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Price list items
CREATE TABLE IF NOT EXISTS price_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  name VARCHAR(200) NOT NULL,
  price VARCHAR(50) NOT NULL,
  duration VARCHAR(50) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Services gallery (visual cards on Services section)
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  image VARCHAR(500) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(200) NOT NULL,
  experience VARCHAR(100) NOT NULL DEFAULT '',
  specialty VARCHAR(200) NOT NULL DEFAULT '',
  image VARCHAR(500) NOT NULL,
  instagram VARCHAR(200) DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Testimonials / Reviews
CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  text TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Admin user (single admin)
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================
-- INSERT DEFAULT DATA
-- ============================

-- Categories
INSERT INTO categories (slug, name, icon, sort_order) VALUES
  ('nails', 'Ногтевой сервис', 'Hand', 1),
  ('pedicure', 'Педикюр', 'Hand', 2),
  ('brows', 'Брови', 'Sparkles', 3),
  ('lashes', 'Ресницы', 'Sparkles', 4),
  ('courses', 'Обучение', 'GraduationCap', 5);

-- Price items
INSERT INTO price_items (category_id, name, price, duration, sort_order) VALUES
  (1, 'Маникюр без покрытия', 'от 900 ₽', '30 мин', 1),
  (1, 'Маникюр + гель-лак', 'от 1 700 ₽', '60 мин', 2),
  (1, 'Маникюр + укрепление + гель-лак', 'от 1 900 ₽', '60 мин', 3),
  (1, 'Наращивание ногтей', 'от 2 700 ₽', '90 мин', 4),
  (1, 'Наращивание ногтей с дизайном', 'от 2 800 ₽', '90 мин', 5),
  (2, 'Педикюр (пальчики без покрытия)', 'от 1 600 ₽', '30 мин', 1),
  (2, 'Педикюр (пальчики) + гель-лак', 'от 1 800 ₽', '60 мин', 2),
  (2, 'Педикюр без покрытия (полный)', 'от 1 800 ₽', '60 мин', 3),
  (2, 'Smart Педикюр полный + гель-лак', 'от 2 000 ₽', '60 мин', 4),
  (2, 'Педикюр препаратный', '+ 200 ₽ к прайсу', '30 мин', 5),
  (3, 'Коррекция формы бровей', 'от 400 ₽', '15 мин', 1),
  (3, 'Окрашивание бровей', 'от 500 ₽', '30 мин', 2),
  (3, 'Долговременная укладка бровей', 'от 1 000 ₽', '30 мин', 3),
  (3, 'КОМПЛЕКС «BROW»', 'от 1 600 ₽', '60 мин', 4),
  (4, 'Наращивание ресниц 2D', 'от 1 800 ₽', '90 мин', 1),
  (4, 'Наращивание ресниц 3D', 'от 2 000 ₽', '90 мин', 2),
  (4, 'Наращивание ресниц 4D', 'от 2 100 ₽', '90 мин', 3),
  (4, 'Наращивание ресниц 5D', 'от 2 200 ₽', '90 мин', 4),
  (5, 'КУРС «BROWS с нуля»', 'от 10 000 ₽', '6 часов', 1),
  (5, 'Курс «Lashечка» (ресницы)', 'от 20 000 ₽', '12 часов', 2),
  (5, 'Курс «IDEAL» (маникюр)', 'от 35 000 ₽', '12 часов', 3);

-- Services gallery
INSERT INTO services (title, image, sort_order) VALUES
  ('Макияж', '/images/service-makeup.jpg', 1),
  ('Наращивание ресниц', '/images/service-lashes.jpg', 2),
  ('Косметология', '/images/service-cosmetology.jpg', 3),
  ('Парикмахерские услуги', '/images/service-hair.jpg', 4),
  ('Маникюр', '/images/service-nails.jpg', 5);

-- Team members
INSERT INTO team_members (name, role, experience, specialty, image, sort_order) VALUES
  ('Анна', 'Стилист-парикмахер', '8 лет опыта', 'Окрашивание, стрижки', '/images/master-1.jpg', 1),
  ('Мария', 'Визажист', '6 лет опыта', 'Макияж, брови', '/images/master-2.jpg', 2),
  ('Анжела', 'Brow-мастер / Специалист по наращиванию ресниц', '10 лет опыта', 'Наращивание ресниц, брови', '/images/brow-lashes.jpg', 3),
  ('Анжела', 'Мастер маникюра', '10 лет опыта', 'Маникюр, педикюр', '/images/nails-master.jpg', 4);

-- Testimonials
INSERT INTO testimonials (name, text, rating) VALUES
  ('Марина С.', 'Обожаю скорость работы! За пару часов сделала и маникюр, и реснички. Качество — супер! Идеально для тех, кто ценит свое время.', 5),
  ('Екатерина М.', 'В студии очень уютно, огромное разнообразие цветов и оттенков. Мастер постоянно пополняет ассортимент новинками. Все стерильно, это для меня главное.', 5),
  ('Александра К.', 'Удобство «Всё в одном»! Сделала маникюр, педикюр, реснички и брови в одном месте. Приятная атмосфера, легкое общение и любимые сериалы во время процедур.', 5);
