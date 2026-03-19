// API base URL — in dev mode we use the Vite proxy, in production requests go to the same server
const API_BASE = import.meta.env.DEV ? 'http://localhost:3001/api' : '/api';

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  return res.json();
}

export async function fetchPrices() {
  const res = await fetch(`${API_BASE}/prices`);
  return res.json();
}

export async function fetchServices() {
  const res = await fetch(`${API_BASE}/services`);
  return res.json();
}

export async function fetchTeam() {
  const res = await fetch(`${API_BASE}/team`);
  return res.json();
}

export async function fetchTestimonials() {
  const res = await fetch(`${API_BASE}/testimonials`);
  return res.json();
}

// ---- Admin API ----

function getAuthHeaders() {
  const token = localStorage.getItem('admin_token');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Ошибка авторизации');
  }
  return res.json();
}

export async function verifyToken() {
  const res = await fetch(`${API_BASE}/auth/verify`, {
    headers: getAuthHeaders(),
  });
  return res.ok;
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const res = await fetch(`${API_BASE}/auth/change-password`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Ошибка при смене пароля');
  }
  return res.json();
}

export async function uploadImage(file: File) {
  const token = localStorage.getItem('admin_token');
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) throw new Error('Ошибка загрузки файла');
  return res.json();
}

// Generic CRUD helpers
async function apiPost(endpoint: string, data: any) {
  const res = await fetch(`${API_BASE}/${endpoint}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Ошибка создания');
  return res.json();
}

async function apiPut(endpoint: string, id: number, data: any) {
  const res = await fetch(`${API_BASE}/${endpoint}/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Ошибка обновления');
  return res.json();
}

async function apiDelete(endpoint: string, id: number) {
  const res = await fetch(`${API_BASE}/${endpoint}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Ошибка удаления');
  return res.json();
}

// Prices
export const adminPrices = {
  getAll: async () => {
    const res = await fetch(`${API_BASE}/admin/prices`, { headers: getAuthHeaders() });
    return res.json();
  },
  create: (data: any) => apiPost('prices', data),
  update: (id: number, data: any) => apiPut('prices', id, data),
  delete: (id: number) => apiDelete('prices', id),
};

// Services
export const adminServices = {
  create: (data: any) => apiPost('services', data),
  update: (id: number, data: any) => apiPut('services', id, data),
  delete: (id: number) => apiDelete('services', id),
};

// Team
export const adminTeam = {
  getAll: async () => {
    const res = await fetch(`${API_BASE}/admin/team`, { headers: getAuthHeaders() });
    return res.json();
  },
  create: (data: any) => apiPost('team', data),
  update: (id: number, data: any) => apiPut('team', id, data),
  delete: (id: number) => apiDelete('team', id),
};

// Testimonials
export const adminTestimonials = {
  getAll: async () => {
    const res = await fetch(`${API_BASE}/admin/testimonials`, { headers: getAuthHeaders() });
    return res.json();
  },
  create: (data: any) => apiPost('testimonials', data),
  update: (id: number, data: any) => apiPut('testimonials', id, data),
  delete: (id: number) => apiDelete('testimonials', id),
};
