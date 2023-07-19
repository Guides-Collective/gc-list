import { supabase } from './supabaseClient';

export async function getProviders(page: number, pageSize: number, searchFilter: string, selectedOrganization: string) {
  let query = supabase
    .from('Training Programs')
    .select('*')
    .range((page - 1) * pageSize, page * pageSize - 1);

  // If a search filter is provided, apply it
  if (searchFilter.trim() !== '') {
    query = query.or(`Organization.ilike.%${searchFilter}%,Program.ilike.%${searchFilter}%,Tuition.ilike.%${searchFilter}%,"Teaching Format".ilike.%${searchFilter}%`);
  }

  // If an organization filter is provided, apply it
  if (selectedOrganization.trim() !== '') {
    query = query.eq('Organization', selectedOrganization);
  }

  
  const { data, error } = await supabase
    .from('Training Programs')
    .select('*')
    .or(`Organization.ilike.%${searchFilter}%,Program.ilike.%${searchFilter}%,Tuition.ilike.%${searchFilter}%,"Teaching Format".ilike.%${searchFilter}%`)
      .range((page - 1) * pageSize, page * pageSize - 1);

  console.log('Returned Data:', data);
  console.log('Returned Error:', error);

  if (error) {
    throw error;
  }

  return data || [];
}
