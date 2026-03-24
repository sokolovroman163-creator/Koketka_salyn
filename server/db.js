import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'data.json');

// Default data
function getDefaultData() {
  return {
    categories: [
      { id: 1, slug: 'nails', name: 'Ногтевой сервис', icon: 'Hand', sort_order: 1 },
      { id: 2, slug: 'pedicure', name: 'Педикюр', icon: 'Hand', sort_order: 2 },
      { id: 3, slug: 'brows', name: 'Брови', icon: 'Sparkles', sort_order: 3 },
      { id: 4, slug: 'lashes', name: 'Ресницы', icon: 'Sparkles', sort_order: 4 },
      { id: 5, slug: 'courses', name: 'Обучение', icon: 'GraduationCap', sort_order: 5 },
    ],
    price_items: [
      { id: 1, category_id: 1, name: 'Маникюр без покрытия', price: 'от 900 ₽', duration: '30 мин', sort_order: 1, is_active: true },
      { id: 2, category_id: 1, name: 'Маникюр + гель-лак', price: 'от 1 700 ₽', duration: '60 мин', sort_order: 2, is_active: true },
      { id: 3, category_id: 1, name: 'Маникюр + укрепление + гель-лак', price: 'от 1 900 ₽', duration: '60 мин', sort_order: 3, is_active: true },
      { id: 4, category_id: 1, name: 'Наращивание ногтей', price: 'от 2 700 ₽', duration: '90 мин', sort_order: 4, is_active: true },
      { id: 5, category_id: 1, name: 'Наращивание ногтей с дизайном', price: 'от 2 800 ₽', duration: '90 мин', sort_order: 5, is_active: true },
      { id: 6, category_id: 2, name: 'Педикюр (пальчики без покрытия)', price: 'от 1 600 ₽', duration: '30 мин', sort_order: 1, is_active: true },
      { id: 7, category_id: 2, name: 'Педикюр (пальчики) + гель-лак', price: 'от 1 800 ₽', duration: '60 мин', sort_order: 2, is_active: true },
      { id: 8, category_id: 2, name: 'Педикюр без покрытия (полный)', price: 'от 1 800 ₽', duration: '60 мин', sort_order: 3, is_active: true },
      { id: 9, category_id: 2, name: 'Smart Педикюр полный + гель-лак', price: 'от 2 000 ₽', duration: '60 мин', sort_order: 4, is_active: true },
      { id: 10, category_id: 2, name: 'Педикюр препаратный', price: '+ 200 ₽ к прайсу', duration: '30 мин', sort_order: 5, is_active: true },
      { id: 11, category_id: 3, name: 'Коррекция формы бровей', price: 'от 400 ₽', duration: '15 мин', sort_order: 1, is_active: true },
      { id: 12, category_id: 3, name: 'Окрашивание бровей', price: 'от 500 ₽', duration: '30 мин', sort_order: 2, is_active: true },
      { id: 13, category_id: 3, name: 'Долговременная укладка бровей', price: 'от 1 000 ₽', duration: '30 мин', sort_order: 3, is_active: true },
      { id: 14, category_id: 3, name: 'КОМПЛЕКС «BROW»', price: 'от 1 600 ₽', duration: '60 мин', sort_order: 4, is_active: true },
      { id: 15, category_id: 4, name: 'Наращивание ресниц 2D', price: 'от 1 800 ₽', duration: '90 мин', sort_order: 1, is_active: true },
      { id: 16, category_id: 4, name: 'Наращивание ресниц 3D', price: 'от 2 000 ₽', duration: '90 мин', sort_order: 2, is_active: true },
      { id: 17, category_id: 4, name: 'Наращивание ресниц 4D', price: 'от 2 100 ₽', duration: '90 мин', sort_order: 3, is_active: true },
      { id: 18, category_id: 4, name: 'Наращивание ресниц 5D', price: 'от 2 200 ₽', duration: '90 мин', sort_order: 4, is_active: true },
      { id: 19, category_id: 5, name: 'КУРС «BROWS с нуля»', price: 'от 10 000 ₽', duration: '6 часов', sort_order: 1, is_active: true },
      { id: 20, category_id: 5, name: 'Курс «Lashечка» (ресницы)', price: 'от 20 000 ₽', duration: '12 часов', sort_order: 2, is_active: true },
      { id: 21, category_id: 5, name: 'Курс «IDEAL» (маникюр)', price: 'от 35 000 ₽', duration: '12 часов', sort_order: 3, is_active: true },
    ],
    services: [
      { id: 1, title: 'Макияж', image: '/images/service-makeup.jpg', sort_order: 1, is_active: true },
      { id: 2, title: 'Наращивание ресниц', image: '/images/service-lashes.jpg', sort_order: 2, is_active: true },
      { id: 3, title: 'Косметология', image: '/images/service-cosmetology.jpg', sort_order: 3, is_active: true },
      { id: 4, title: 'Парикмахерские услуги', image: '/images/service-hair.jpg', sort_order: 4, is_active: true },
      { id: 5, title: 'Маникюр', image: '/images/service-nails.jpg', sort_order: 5, is_active: true },
    ],
    team_members: [
      { id: 1, name: 'Анна', role: 'Стилист-парикмахер', experience: '8 лет опыта', specialty: 'Окрашивание, стрижки', image: '/images/master-1.jpg', instagram: '', sort_order: 1, is_active: true },
      { id: 2, name: 'Мария', role: 'Визажист', experience: '6 лет опыта', specialty: 'Макияж, брови', image: '/images/master-2.jpg', instagram: '', sort_order: 2, is_active: true },
      { id: 3, name: 'Анжела', role: 'Brow-мастер / Специалист по наращиванию ресниц', experience: '10 лет опыта', specialty: 'Наращивание ресниц, брови', image: '/images/brow-lashes.jpg', instagram: '', sort_order: 3, is_active: true },
      { id: 4, name: 'Анжела', role: 'Мастер маникюра', experience: '10 лет опыта', specialty: 'Маникюр, педикюр', image: '/images/nails-master.jpg', instagram: '', sort_order: 4, is_active: true },
    ],
    testimonials: [
      { id: 1, name: 'Марина С.', text: 'Обожаю скорость работы! За пару часов сделала и маникюр, и реснички. Качество — супер! Идеально для тех, кто ценит свое время.', rating: 5, is_active: true },
      { id: 2, name: 'Екатерина М.', text: 'В студии очень уютно, огромное разнообразие цветов и оттенков. Мастер постоянно пополняет ассортимент новинками. Все стерильно, это для меня главное.', rating: 5, is_active: true },
      { id: 3, name: 'Александра К.', text: 'Удобство «Всё в одном»! Сделала маникюр, педикюр, реснички и брови в одном месте. Приятная атмосфера, легкое общение и любимые сериалы во время процедур.', rating: 5, is_active: true },
    ],
    gallery: [],
    admin_users: [
      { id: 1, username: 'admin', password_hash: bcrypt.hashSync('koketka2024', 10) },
    ],
    _counters: {
      categories: 5,
      price_items: 21,
      services: 5,
      team_members: 4,
      testimonials: 3,
      gallery: 0,
      admin_users: 1,
    },
  };
}

class JsonDB {
  constructor() {
    this.data = null;
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DB_PATH)) {
        const raw = fs.readFileSync(DB_PATH, 'utf-8');
        this.data = JSON.parse(raw);
        console.log('📦 Database loaded from data.json');
      } else {
        this.data = getDefaultData();
        this.save();
        console.log('✅ Database created with default data');
      }
    } catch (e) {
      console.error('❌ Error loading database:', e.message);
      this.data = getDefaultData();
      this.save();
    }
  }

  save() {
    fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), 'utf-8');
  }

  // Generate next ID for a table
  nextId(table) {
    this.data._counters[table] = (this.data._counters[table] || 0) + 1;
    this.save();
    return this.data._counters[table];
  }

  // ---- Categories ----
  getCategories() {
    return [...this.data.categories].sort((a, b) => a.sort_order - b.sort_order);
  }

  addCategory(data) {
    const item = { id: this.nextId('categories'), ...data };
    this.data.categories.push(item);
    this.save();
    return item;
  }

  updateCategory(id, data) {
    const idx = this.data.categories.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.data.categories[idx] = { ...this.data.categories[idx], ...data };
    this.save();
    return this.data.categories[idx];
  }

  deleteCategory(id) {
    this.data.categories = this.data.categories.filter((c) => c.id !== id);
    this.data.price_items = this.data.price_items.filter((p) => p.category_id !== id);
    this.save();
  }

  // ---- Price Items ----
  getPriceItems(activeOnly = false) {
    let items = [...this.data.price_items];
    if (activeOnly) items = items.filter((i) => i.is_active);
    return items.sort((a, b) => a.sort_order - b.sort_order);
  }

  getPriceItemsByCategory(categoryId, activeOnly = false) {
    let items = this.data.price_items.filter((i) => i.category_id === categoryId);
    if (activeOnly) items = items.filter((i) => i.is_active);
    return items.sort((a, b) => a.sort_order - b.sort_order);
  }

  addPriceItem(data) {
    const item = { id: this.nextId('price_items'), is_active: true, ...data };
    this.data.price_items.push(item);
    this.save();
    return item;
  }

  updatePriceItem(id, data) {
    const idx = this.data.price_items.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.data.price_items[idx] = { ...this.data.price_items[idx], ...data };
    this.save();
    return this.data.price_items[idx];
  }

  deletePriceItem(id) {
    this.data.price_items = this.data.price_items.filter((p) => p.id !== id);
    this.save();
  }

  // ---- Services ----
  getServices(activeOnly = false) {
    let items = [...this.data.services];
    if (activeOnly) items = items.filter((s) => s.is_active);
    return items.sort((a, b) => a.sort_order - b.sort_order);
  }

  addService(data) {
    const item = { id: this.nextId('services'), is_active: true, ...data };
    this.data.services.push(item);
    this.save();
    return item;
  }

  updateService(id, data) {
    const idx = this.data.services.findIndex((s) => s.id === id);
    if (idx === -1) return null;
    this.data.services[idx] = { ...this.data.services[idx], ...data };
    this.save();
    return this.data.services[idx];
  }

  deleteService(id) {
    this.data.services = this.data.services.filter((s) => s.id !== id);
    this.save();
  }

  // ---- Team ----
  getTeamMembers(activeOnly = false) {
    let items = [...this.data.team_members];
    if (activeOnly) items = items.filter((t) => t.is_active);
    return items.sort((a, b) => a.sort_order - b.sort_order);
  }

  addTeamMember(data) {
    const item = { id: this.nextId('team_members'), is_active: true, ...data };
    this.data.team_members.push(item);
    this.save();
    return item;
  }

  updateTeamMember(id, data) {
    const idx = this.data.team_members.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    this.data.team_members[idx] = { ...this.data.team_members[idx], ...data };
    this.save();
    return this.data.team_members[idx];
  }

  deleteTeamMember(id) {
    this.data.team_members = this.data.team_members.filter((t) => t.id !== id);
    this.save();
  }

  // ---- Testimonials ----
  getTestimonials(activeOnly = false) {
    let items = [...this.data.testimonials];
    if (activeOnly) items = items.filter((t) => t.is_active);
    return items.sort((a, b) => b.id - a.id); // newest first
  }

  addTestimonial(data) {
    const item = { id: this.nextId('testimonials'), is_active: true, ...data };
    this.data.testimonials.push(item);
    this.save();
    return item;
  }

  updateTestimonial(id, data) {
    const idx = this.data.testimonials.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    this.data.testimonials[idx] = { ...this.data.testimonials[idx], ...data };
    this.save();
    return this.data.testimonials[idx];
  }

  deleteTestimonial(id) {
    this.data.testimonials = this.data.testimonials.filter((t) => t.id !== id);
    this.save();
  }

  // ---- Gallery ----
  getGallery(activeOnly = false) {
    if (!this.data.gallery) this.data.gallery = [];
    let items = [...this.data.gallery];
    if (activeOnly) items = items.filter((g) => g.is_active);
    return items.sort((a, b) => b.id - a.id); // newest first
  }

  addGalleryItem(data) {
    if (!this.data.gallery) this.data.gallery = [];
    const item = { id: this.nextId('gallery'), is_active: true, created_at: new Date().toISOString(), ...data };
    this.data.gallery.push(item);
    this.save();
    return item;
  }

  updateGalleryItem(id, data) {
    if (!this.data.gallery) return null;
    const idx = this.data.gallery.findIndex((g) => g.id === id);
    if (idx === -1) return null;
    this.data.gallery[idx] = { ...this.data.gallery[idx], ...data };
    this.save();
    return this.data.gallery[idx];
  }

  deleteGalleryItem(id) {
    if (!this.data.gallery) return;
    this.data.gallery = this.data.gallery.filter((g) => g.id !== id);
    this.save();
  }

  // ---- Admin Users ----
  getAdminByUsername(username) {
    return this.data.admin_users.find((u) => u.username === username) || null;
  }

  getAdminById(id) {
    return this.data.admin_users.find((u) => u.id === id) || null;
  }

  updateAdminPassword(id, passwordHash) {
    const idx = this.data.admin_users.findIndex((u) => u.id === id);
    if (idx === -1) return;
    this.data.admin_users[idx].password_hash = passwordHash;
    this.save();
  }
}

const db = new JsonDB();
export default db;
