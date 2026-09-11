import { supabase } from '../lib/supabase.js';

// Sesión de administración con Supabase Auth (email + contraseña).
// No hay registro ni recuperación de contraseña: los usuarios se crean desde el dashboard.

export async function iniciarSesion(email, contrasena) {
  const { error } = await supabase.auth.signInWithPassword({ email, password: contrasena });
  if (error) throw error;
}

export async function cerrarSesion() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Sesión guardada en el navegador (o null si no hay).
export async function obtenerSesion() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// Avisa cada vez que la sesión cambia (login, logout, vencimiento).
// Devuelve una función para dejar de escuchar.
export function escucharSesion(alCambiar) {
  const { data } = supabase.auth.onAuthStateChange((_evento, sesion) => alCambiar(sesion));
  return () => data.subscription.unsubscribe();
}
