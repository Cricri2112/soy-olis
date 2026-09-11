import { createClient } from '@supabase/supabase-js';

// Único cliente de Supabase para toda la app.
// Las variables vienen de .env.local (local) o de Vercel (producción).
const url = import.meta.env.VITE_SUPABASE_URL;
const clave = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !clave) {
  throw new Error(
    'Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. Copiá .env.example como .env.local y completalo.'
  );
}

export const supabase = createClient(url, clave);
