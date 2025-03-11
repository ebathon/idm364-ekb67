import { supabase } from '$lib/supabaseClient';

export async function load() {
  const { data, error } = await supabase.from('happen').select('*');

  if (error) {
    console.error(error);
    return { items: [] };
  }

  return { items: data };
}
