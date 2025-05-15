import { createServer } from '@/lib/supabase/server'

export const getDivisions = async () => {
  const supabase = await createServer()
  return supabase.from('divisions').select('*')
}

export const getDivisionWithServices = async (slug: string) => {
  const supabase = await createServer()
  return supabase
    .from('divisions')
    .select('*, services(*)')
    .eq('slug', slug)
    .single()
}