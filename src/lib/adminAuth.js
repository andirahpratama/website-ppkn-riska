/**
 * Modul Autentikasi Admin Ruang PPKn
 * Kredensial Resmi:
 * Username: admin
 * Password: Polman@21
 */

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Polman@21';
const SESSION_KEY = 'ruang_ppkn_admin_session';

export function loginAdmin(username, password) {
  if (
    username?.trim().toLowerCase() === ADMIN_USERNAME && 
    password === ADMIN_PASSWORD
  ) {
    const session = {
      username: ADMIN_USERNAME,
      role: 'super_admin',
      fullName: 'Riska Puspita, S.Pd.',
      loginAt: Date.now(),
      expiresAt: Date.now() + (12 * 60 * 60 * 1000) // Sesi berlaku 12 jam
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return { success: true };
  }

  return { 
    success: false, 
    message: 'Username atau kata sandi yang Anda masukkan salah.' 
  };
}

export function logoutAdmin() {
  localStorage.removeItem(SESSION_KEY);
}

export function getAdminSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      logoutAdmin();
      return null;
    }
    return session;
  } catch {
    logoutAdmin();
    return null;
  }
}

export function isAdminAuthenticated() {
  return Boolean(getAdminSession());
}
