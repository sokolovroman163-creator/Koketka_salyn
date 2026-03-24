import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../db.js';
import { rateLimit } from 'express-rate-limit';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'koketka-super-secret-key-2024';
if (JWT_SECRET === 'koketka-super-secret-key-2024') {
  console.warn('⚠️ ВНИМАНИЕ: Используется стандартный JWT_SECRET. Пожалуйста, задайте переменную окружения JWT_SECRET в продакшене!');
}
const TOKEN_EXPIRY = '2h';

// Rate limiter: max 5 login attempts per 15 minutes per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // only count failed requests
  handler: (req, res) => {
    const retryAfter = Math.ceil(req.rateLimit.resetTime / 1000 - Date.now() / 1000);
    const minutes = Math.ceil(retryAfter / 60);
    res.status(429).json({
      error: `Слишком много попыток входа. Попробуйте через ${minutes} мин.`,
    });
  },
});

// Middleware to check JWT token
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Требуется авторизация' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Недействительный токен' });
  }
}

// Login (rate-limited: 5 attempts per 15 min)
router.post('/login', loginLimiter, (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Введите логин и пароль' });
  }

  const user = db.getAdminByUsername(username);

  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Неверный логин или пароль' });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );

  res.json({ token, username: user.username });
});

// Change password
router.post('/change-password', authMiddleware, (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Заполните все поля' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Пароль должен быть не менее 6 символов' });
  }

  const user = db.getAdminById(req.user.id);

  if (!bcrypt.compareSync(currentPassword, user.password_hash)) {
    return res.status(401).json({ error: 'Неверный текущий пароль' });
  }

  const hash = bcrypt.hashSync(newPassword, 10);
  db.updateAdminPassword(req.user.id, hash);

  res.json({ success: true });
});

// Verify token
router.get('/verify', authMiddleware, (req, res) => {
  res.json({ valid: true, username: req.user.username });
});

export default router;
