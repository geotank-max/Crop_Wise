export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'farmer' | 'seller';
  provider?: 'email' | 'google' | 'facebook' | 'instagram';
  avatarUrl?: string;
}

export interface PendingCartItem {
  id: string;
  title: string;
  price: number | string;
  imageUrl?: string;
}

const USER_STORAGE_KEY = 'cropwise_user';
const PENDING_CART_KEY = 'cropwise_pending_cart';
const CART_ITEMS_KEY = 'cropwise_cart_items';

export function getUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setUser(user: User): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('cropwise_auth_change'));
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(USER_STORAGE_KEY);
  window.dispatchEvent(new Event('cropwise_auth_change'));
}

export function isAuthenticated(): boolean {
  return getUser() !== null;
}

export function getPendingCartItem(): PendingCartItem | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PENDING_CART_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setPendingCartItem(item: PendingCartItem): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PENDING_CART_KEY, JSON.stringify(item));
}

export function clearPendingCartItem(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PENDING_CART_KEY);
}

export function getSavedCart(): any[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CART_ITEMS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: any[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
}
