import { useState, useEffect, useCallback } from 'react';
import {
  login,
  verifyToken,
  fetchServices,
  adminPrices,
  adminServices,
  adminTeam,
  adminTestimonials,
  uploadImage,
  fetchCategories,
  changePassword,
} from '../lib/api';
import {
  LogOut,
  Plus,
  Trash2,
  Save,
  X,
  Edit3,
  Image,
  ChevronDown,
  ChevronUp,
  Lock,
  User,
  DollarSign,
  Users,
  Star,
  Layers,
  Home,
  Key,
} from 'lucide-react';

// Image base URL for admin display
const IMG_BASE = import.meta.env.DEV ? 'http://localhost:3001' : '';

// =====================
// LOGIN FORM
// =====================
function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await login(username, password);
      localStorage.setItem('admin_token', data.token);
      onLogin(data.token);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-white mb-2">
            Ко<span className="text-pink-500">кет</span>ка
          </h1>
          <p className="text-gray-500 text-sm">Панель управления</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#151515] border border-white/10 rounded-2xl p-8 space-y-6"
        >
          <div>
            <label htmlFor="login-username" className="block text-gray-400 text-sm mb-2">Логин</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                id="login-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:border-pink-500/50 focus:outline-none transition-colors"
                placeholder="admin"
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="block text-gray-400 text-sm mb-2">Пароль</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:border-pink-500/50 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}

// =====================
// IMAGE UPLOAD BUTTON
// =====================
function ImageUpload({
  currentImage,
  onUpload,
}: {
  currentImage: string;
  onUpload: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = await uploadImage(file);
      onUpload(data.url);
    } catch {
      alert('Ошибка загрузки изображения');
    } finally {
      setUploading(false);
    }
  };

  const imgSrc = currentImage
    ? currentImage.startsWith('/uploads')
      ? `${IMG_BASE}${currentImage}`
      : currentImage.startsWith('/')
        ? currentImage
        : `/${currentImage}`
    : '';

  return (
    <div className="flex items-center gap-3">
      {imgSrc && (
        <img
          src={imgSrc}
          alt=""
          className="w-12 h-12 rounded-lg object-cover border border-white/10"
        />
      )}
      <label className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs text-gray-300">
        <Image className="w-3.5 h-3.5" />
        {uploading ? 'Загрузка...' : 'Загрузить фото'}
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </label>
    </div>
  );
}

// =====================
// EDITABLE ROW COMPONENT
// =====================
function EditableRow({
  children,
  onSave,
  onDelete,
  isNew,
  onCancelNew,
}: {
  children: React.ReactNode;
  onSave: () => void;
  onDelete?: () => void;
  isNew?: boolean;
  onCancelNew?: () => void;
}) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 space-y-3">
      {children}
      <div className="flex gap-2 pt-2 border-t border-white/5">
        <button
          onClick={onSave}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 transition-colors text-xs"
        >
          <Save className="w-3.5 h-3.5" />
          Сохранить
        </button>
        {isNew && onCancelNew && (
          <button
            onClick={onCancelNew}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition-colors text-xs"
          >
            <X className="w-3.5 h-3.5" />
            Отмена
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-xs ml-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}

// =====================
// PRICES PANEL
// =====================
interface PriceItem {
  id: number;
  category_id: number;
  name: string;
  price: string;
  duration: string;
  sort_order: number;
  is_active: number;
}

interface Category {
  id: number;
  slug: string;
  name: string;
  icon: string;
  sort_order: number;
}

function PricesPanel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<PriceItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<Partial<PriceItem> | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', price: '', duration: '', category_id: 0 });

  const load = useCallback(async () => {
    const cats = await fetchCategories();
    setCategories(cats);
    if (cats.length > 0 && activeCategory === null) {
      setActiveCategory(cats[0].id);
    }
    const all = await adminPrices.getAll();
    setItems(all);
  }, [activeCategory]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = items.filter((i) => i.category_id === activeCategory);

  const handleSave = async (item: PriceItem) => {
    await adminPrices.update(item.id, item);
    setEditingItem(null);
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить эту услугу?')) return;
    await adminPrices.delete(id);
    load();
  };

  const handleAdd = async () => {
    if (!newItem.name || !newItem.price) return;
    await adminPrices.create({
      ...newItem,
      category_id: activeCategory,
      sort_order: filtered.length + 1,
    });
    setNewItem({ name: '', price: '', duration: '', category_id: 0 });
    setIsAdding(false);
    load();
  };

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setIsAdding(false);
            }}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeCategory === cat.id
                ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Items list */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div key={item.id}>
            {editingItem?.id === item.id ? (
              <EditableRow
                onSave={() => handleSave(editingItem as PriceItem)}
                onDelete={() => handleDelete(item.id)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    placeholder="Название"
                  />
                  <input
                    value={editingItem.price || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                    className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    placeholder="Цена"
                  />
                  <input
                    value={editingItem.duration || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, duration: e.target.value })}
                    className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                    placeholder="Время"
                  />
                </div>
              </EditableRow>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors group">
                <div>
                  <p className="text-white text-sm">{item.name}</p>
                  <p className="text-gray-500 text-xs">{item.duration}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-pink-400 font-medium text-sm">{item.price}</span>
                  <button
                    onClick={() => setEditingItem({ ...item })}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/10 transition-all"
                    aria-label="Редактировать"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add new */}
      {isAdding ? (
        <div className="mt-4">
          <EditableRow onSave={handleAdd} isNew onCancelNew={() => setIsAdding(false)}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                placeholder="Название услуги"
              />
              <input
                value={newItem.price}
                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                placeholder="от 1 000 ₽"
              />
              <input
                value={newItem.duration}
                onChange={(e) => setNewItem({ ...newItem, duration: e.target.value })}
                className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                placeholder="60 мин"
              />
            </div>
          </EditableRow>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-dashed border-white/10 text-gray-400 hover:text-pink-400 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all text-sm w-full justify-center"
        >
          <Plus className="w-4 h-4" />
          Добавить услугу
        </button>
      )}
    </div>
  );
}

// =====================
// SERVICES PANEL
// =====================
interface ServiceItem {
  id: number;
  title: string;
  image: string;
  sort_order: number;
  is_active: number;
}

function ServicesPanel() {
  const [items, setItems] = useState<ServiceItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<ServiceItem>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', image: '' });

  const load = useCallback(async () => {
    const data = await fetchServices();
    setItems(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    if (editingId && editData) {
      await adminServices.update(editingId, editData);
      setEditingId(null);
      load();
    }
  };

  const handleAdd = async () => {
    if (!newItem.title || !newItem.image) return;
    await adminServices.create({ ...newItem, sort_order: items.length + 1 });
    setNewItem({ title: '', image: '' });
    setIsAdding(false);
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить эту услугу?')) return;
    await adminServices.delete(id);
    load();
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id}>
          {editingId === item.id ? (
            <EditableRow
              onSave={handleSave}
              onDelete={() => handleDelete(item.id)}
            >
              <input
                value={editData.title || ''}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="w-full bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm mb-2"
                placeholder="Название"
              />
              <ImageUpload
                currentImage={editData.image || ''}
                onUpload={(url) => setEditData({ ...editData, image: url })}
              />
            </EditableRow>
          ) : (
            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors group">
              {item.image && (
                <img
                  src={item.image.startsWith('/uploads') ? `${IMG_BASE}${item.image}` : item.image.startsWith('/') ? item.image : `/${item.image}`}
                  alt={item.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}
              <span className="text-white text-sm flex-1">{item.title}</span>
              <button
                onClick={() => {
                  setEditingId(item.id);
                  setEditData({ ...item });
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/10 transition-all"
                aria-label="Редактировать услугу"
              >
                <Edit3 className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          )}
        </div>
      ))}

      {isAdding ? (
        <EditableRow onSave={handleAdd} isNew onCancelNew={() => setIsAdding(false)}>
          <input
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="w-full bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm mb-2"
            placeholder="Название услуги"
          />
          <ImageUpload
            currentImage={newItem.image}
            onUpload={(url) => setNewItem({ ...newItem, image: url })}
          />
        </EditableRow>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-dashed border-white/10 text-gray-400 hover:text-pink-400 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all text-sm w-full justify-center"
        >
          <Plus className="w-4 h-4" />
          Добавить услугу
        </button>
      )}
    </div>
  );
}

// =====================
// TEAM PANEL
// =====================
interface TeamMember {
  id: number;
  name: string;
  role: string;
  experience: string;
  specialty: string;
  image: string;
  instagram: string;
  sort_order: number;
  is_active: number;
}

function TeamPanel() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<TeamMember>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    role: '',
    experience: '',
    specialty: '',
    image: '',
    instagram: '',
  });

  const load = useCallback(async () => {
    const data = await adminTeam.getAll();
    setItems(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    if (editingId && editData) {
      await adminTeam.update(editingId, editData);
      setEditingId(null);
      load();
    }
  };

  const handleAdd = async () => {
    if (!newItem.name || !newItem.role) return;
    await adminTeam.create({ ...newItem, sort_order: items.length + 1 });
    setNewItem({ name: '', role: '', experience: '', specialty: '', image: '', instagram: '' });
    setIsAdding(false);
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить этого мастера?')) return;
    await adminTeam.delete(id);
    load();
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id}>
          {editingId === item.id ? (
            <EditableRow onSave={handleSave} onDelete={() => handleDelete(item.id)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  value={editData.name || ''}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                  placeholder="Имя"
                />
                <input
                  value={editData.role || ''}
                  onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                  className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                  placeholder="Должность"
                />
                <input
                  value={editData.experience || ''}
                  onChange={(e) => setEditData({ ...editData, experience: e.target.value })}
                  className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                  placeholder="Опыт (напр. 8 лет опыта)"
                />
                <input
                  value={editData.specialty || ''}
                  onChange={(e) => setEditData({ ...editData, specialty: e.target.value })}
                  className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                  placeholder="Специальность"
                />
                <input
                  value={editData.instagram || ''}
                  onChange={(e) => setEditData({ ...editData, instagram: e.target.value })}
                  className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
                  placeholder="Ссылка на Instagram"
                />
              </div>
              <div className="mt-3">
                <ImageUpload
                  currentImage={editData.image || ''}
                  onUpload={(url) => setEditData({ ...editData, image: url })}
                />
              </div>
            </EditableRow>
          ) : (
            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors group">
              {item.image && (
                <img
                  src={item.image.startsWith('/uploads') ? `${IMG_BASE}${item.image}` : item.image.startsWith('/') ? item.image : `/${item.image}`}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{item.name}</p>
                <p className="text-gray-500 text-xs truncate">{item.role}</p>
              </div>
              <span className="text-gray-600 text-xs hidden sm:block">{item.experience}</span>
              <button
                onClick={() => {
                  setEditingId(item.id);
                  setEditData({ ...item });
                }}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/10 transition-all"
                aria-label="Редактировать мастера"
              >
                <Edit3 className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>
          )}
        </div>
      ))}

      {isAdding ? (
        <EditableRow onSave={handleAdd} isNew onCancelNew={() => setIsAdding(false)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              placeholder="Имя мастера"
            />
            <input
              value={newItem.role}
              onChange={(e) => setNewItem({ ...newItem, role: e.target.value })}
              className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              placeholder="Должность"
            />
            <input
              value={newItem.experience}
              onChange={(e) => setNewItem({ ...newItem, experience: e.target.value })}
              className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              placeholder="Опыт"
            />
            <input
              value={newItem.specialty}
              onChange={(e) => setNewItem({ ...newItem, specialty: e.target.value })}
              className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm"
              placeholder="Специальность"
            />
          </div>
          <div className="mt-3">
            <ImageUpload
              currentImage={newItem.image}
              onUpload={(url) => setNewItem({ ...newItem, image: url })}
            />
          </div>
        </EditableRow>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-dashed border-white/10 text-gray-400 hover:text-pink-400 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all text-sm w-full justify-center"
        >
          <Plus className="w-4 h-4" />
          Добавить мастера
        </button>
      )}
    </div>
  );
}

// =====================
// TESTIMONIALS PANEL
// =====================
interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  is_active: number;
}

function TestimonialsPanel() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Testimonial>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', text: '', rating: 5 });

  const load = useCallback(async () => {
    const data = await adminTestimonials.getAll();
    setItems(data);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSave = async () => {
    if (editingId && editData) {
      await adminTestimonials.update(editingId, editData);
      setEditingId(null);
      load();
    }
  };

  const handleAdd = async () => {
    if (!newItem.name || !newItem.text) return;
    await adminTestimonials.create(newItem);
    setNewItem({ name: '', text: '', rating: 5 });
    setIsAdding(false);
    load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить этот отзыв?')) return;
    await adminTestimonials.delete(id);
    load();
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id}>
          {editingId === item.id ? (
            <EditableRow onSave={handleSave} onDelete={() => handleDelete(item.id)}>
              <input
                value={editData.name || ''}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="w-full bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm mb-3"
                placeholder="Имя клиента"
              />
              <textarea
                value={editData.text || ''}
                onChange={(e) => setEditData({ ...editData, text: e.target.value })}
                className="w-full bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm min-h-[80px]"
                placeholder="Текст отзыва"
              />
              <div className="flex items-center gap-2 mt-3">
                <span className="text-gray-400 text-xs">Рейтинг:</span>
                {[1, 2, 3, 4, 5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setEditData({ ...editData, rating: r })}
                    className="transition-colors"
                    aria-label={`Оценка ${r} звезд`}
                    title={`Оценка ${r} звезд`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        r <= (editData.rating || 5)
                          ? 'fill-pink-500 text-pink-500'
                          : 'text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </EditableRow>
          ) : (
            <div className="p-4 rounded-xl bg-[#0a0a0a] border border-white/5 hover:border-white/10 transition-colors group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-white text-sm font-medium">{item.name}</span>
                    <div className="flex gap-0.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-pink-500 text-pink-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-2">{item.text}</p>
                </div>
                <button
                  onClick={() => {
                    setEditingId(item.id);
                    setEditData({ ...item });
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-white/10 transition-all flex-shrink-0"
                  aria-label="Редактировать отзыв"
                >
                  <Edit3 className="w-3.5 h-3.5 text-gray-400" />
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {isAdding ? (
        <EditableRow onSave={handleAdd} isNew onCancelNew={() => setIsAdding(false)}>
          <input
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm mb-3"
            placeholder="Имя клиента"
          />
          <textarea
            value={newItem.text}
            onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
            className="w-full bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-white text-sm min-h-[80px]"
            placeholder="Текст отзыва"
          />
        </EditableRow>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-dashed border-white/10 text-gray-400 hover:text-pink-400 hover:border-pink-500/30 hover:bg-pink-500/5 transition-all text-sm w-full justify-center"
        >
          <Plus className="w-4 h-4" />
          Добавить отзыв
        </button>
      )}
    </div>
  );
}

// =====================
// SETTINGS PANEL
// =====================
function SettingsPanel() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Новые пароли не совпадают' });
      return;
    }
    setLoading(true);
    setMessage({ type: '', text: '' });
    try {
      await changePassword(currentPassword, newPassword);
      setMessage({ type: 'success', text: 'Пароль успешно изменен' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: unknown) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Ошибка' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md">
      <div className="bg-[#151515] border border-white/10 rounded-2xl p-6">
        <h3 className="text-white font-medium mb-6 flex items-center gap-2">
          <Key className="w-4 h-4 text-pink-500" />
          Смена пароля
        </h3>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="current-password" className="block text-gray-400 text-xs mb-1.5">Текущий пароль</label>
            <input
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-pink-500/50 focus:outline-none transition-colors"
              required
              placeholder="Введите текущий пароль"
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-gray-400 text-xs mb-1.5">Новый пароль</label>
            <input
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-pink-500/50 focus:outline-none transition-colors"
              required
              minLength={6}
              placeholder="Минимум 6 символов"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-gray-400 text-xs mb-1.5">Повторите новый пароль</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-pink-500/50 focus:outline-none transition-colors"
              required
              minLength={6}
              placeholder="Повторите пароль"
            />
          </div>

          {message.text && (
            <div
              className={`px-4 py-3 rounded-xl border text-sm ${
                message.type === 'success'
                  ? 'bg-green-500/10 border-green-500/30 text-green-400'
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500/20 text-pink-400 hover:bg-pink-500/30 py-2.5 rounded-xl font-medium transition-all text-sm mt-2 disabled:opacity-50"
          >
            {loading ? 'Сохранение...' : 'Изменить пароль'}
          </button>
        </form>
      </div>
    </div>
  );
}

// =====================
// MAIN ADMIN PANEL
// =====================
const tabs = [
  { id: 'prices', label: 'Цены', icon: DollarSign },
  { id: 'services', label: 'Услуги', icon: Layers },
  { id: 'team', label: 'Команда', icon: Users },
  { id: 'testimonials', label: 'Отзывы', icon: Star },
  { id: 'settings', label: 'Настройки', icon: Key },
];

export default function AdminPanel() {
  const [isAuth, setIsAuth] = useState(false);
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('prices');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      verifyToken()
        .then((valid) => {
          setIsAuth(valid);
          setChecking(false);
        })
        .catch(() => {
          setIsAuth(false);
          setChecking(false);
        });
    } else {
      setChecking(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuth(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuth) {
    return <LoginForm onLogin={() => setIsAuth(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-16'
        } bg-[#111] border-r border-white/5 flex flex-col transition-all duration-300 flex-shrink-0`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="font-display text-lg text-white">
              Ко<span className="text-pink-500">кет</span>ка
            </h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label={sidebarOpen ? 'Свернуть меню' : 'Развернуть меню'}
          >
            {sidebarOpen ? (
              <ChevronUp className="w-4 h-4 text-gray-500 rotate-[-90deg]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500 rotate-[-90deg]" />
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm ${
                activeTab === tab.id
                  ? 'bg-pink-500/10 text-pink-400'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span>{tab.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-2 border-t border-white/5 space-y-1">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-gray-300 hover:bg-white/5 transition-all text-sm"
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>На сайт</span>}
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all text-sm"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>Выйти</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-display text-white mb-1">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Управление содержимым сайта
          </p>

          {activeTab === 'prices' && <PricesPanel />}
          {activeTab === 'services' && <ServicesPanel />}
          {activeTab === 'team' && <TeamPanel />}
          {activeTab === 'testimonials' && <TestimonialsPanel />}
          {activeTab === 'settings' && <SettingsPanel />}
        </div>
      </main>
    </div>
  );
}
