import { Router } from 'express';
import db from '../db.js';
import { authMiddleware } from './auth.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// =====================
// File upload config
// =====================
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Разрешены только изображения (jpeg, png, webp, gif)'));
    }
  },
});

// =====================
// XSS PROTECTION
// =====================
function sanitizeData(obj) {
  if (typeof obj === 'string') {
    return obj.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeData);
  }
  if (typeof obj === 'object' && obj !== null) {
    const res = {};
    for (const key in obj) {
      if (key !== 'image' && key !== 'icon') {
        res[key] = sanitizeData(obj[key]);
      } else {
        res[key] = obj[key];
      }
    }
    return res;
  }
  return obj;
}

const xssProtect = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeData(req.body);
  }
  next();
};

router.use(xssProtect);

// =====================
// PUBLIC ENDPOINTS
// =====================

router.get('/categories', (req, res) => {
  res.json(db.getCategories());
});

router.get('/prices', (req, res) => {
  const categories = db.getCategories();
  const result = {};
  for (const cat of categories) {
    result[cat.slug] = db.getPriceItemsByCategory(cat.id, true);
  }
  res.json({ categories, prices: result });
});

router.get('/services', (req, res) => {
  res.json(db.getServices(true));
});

router.get('/team', (req, res) => {
  res.json(db.getTeamMembers(true));
});

router.get('/testimonials', (req, res) => {
  res.json(db.getTestimonials(true));
});

// =====================
// ADMIN ENDPOINTS
// =====================

router.post('/upload', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Файл не загружен' });
  }
  const url = `/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
});

// --- CATEGORIES ---
router.post('/categories', authMiddleware, (req, res) => {
  try {
    const item = db.addCategory(req.body);
    res.json({ id: item.id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put('/categories/:id', authMiddleware, (req, res) => {
  db.updateCategory(parseInt(req.params.id), req.body);
  res.json({ success: true });
});

router.delete('/categories/:id', authMiddleware, (req, res) => {
  db.deleteCategory(parseInt(req.params.id));
  res.json({ success: true });
});

// --- PRICE ITEMS ---
router.get('/admin/prices', authMiddleware, (req, res) => {
  const items = db.getPriceItems();
  const categories = db.getCategories();
  const catMap = Object.fromEntries(categories.map(c => [c.id, c]));
  const enriched = items.map(item => ({
    ...item,
    category_name: catMap[item.category_id]?.name || '',
    category_slug: catMap[item.category_id]?.slug || '',
  }));
  res.json(enriched);
});

router.post('/prices', authMiddleware, (req, res) => {
  const item = db.addPriceItem(req.body);
  res.json({ id: item.id });
});

router.put('/prices/:id', authMiddleware, (req, res) => {
  db.updatePriceItem(parseInt(req.params.id), req.body);
  res.json({ success: true });
});

router.delete('/prices/:id', authMiddleware, (req, res) => {
  db.deletePriceItem(parseInt(req.params.id));
  res.json({ success: true });
});

// --- SERVICES ---
router.post('/services', authMiddleware, (req, res) => {
  const item = db.addService(req.body);
  res.json({ id: item.id });
});

router.put('/services/:id', authMiddleware, (req, res) => {
  db.updateService(parseInt(req.params.id), req.body);
  res.json({ success: true });
});

router.delete('/services/:id', authMiddleware, (req, res) => {
  db.deleteService(parseInt(req.params.id));
  res.json({ success: true });
});

// --- TEAM ---
router.get('/admin/team', authMiddleware, (req, res) => {
  res.json(db.getTeamMembers());
});

router.post('/team', authMiddleware, (req, res) => {
  const item = db.addTeamMember(req.body);
  res.json({ id: item.id });
});

router.put('/team/:id', authMiddleware, (req, res) => {
  db.updateTeamMember(parseInt(req.params.id), req.body);
  res.json({ success: true });
});

router.delete('/team/:id', authMiddleware, (req, res) => {
  db.deleteTeamMember(parseInt(req.params.id));
  res.json({ success: true });
});

// --- TESTIMONIALS ---
router.get('/admin/testimonials', authMiddleware, (req, res) => {
  res.json(db.getTestimonials());
});

router.post('/testimonials', authMiddleware, (req, res) => {
  const item = db.addTestimonial(req.body);
  res.json({ id: item.id });
});

router.put('/testimonials/:id', authMiddleware, (req, res) => {
  db.updateTestimonial(parseInt(req.params.id), req.body);
  res.json({ success: true });
});

router.delete('/testimonials/:id', authMiddleware, (req, res) => {
  db.deleteTestimonial(parseInt(req.params.id));
  res.json({ success: true });
});

export default router;
