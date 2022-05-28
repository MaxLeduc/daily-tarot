import { createClient, SupabaseClient } from '@supabase/supabase-js'

type ListItem = {
  id: 1
  created_at: string
  name: string
}

export default class List {
  client: SupabaseClient

  constructor(method?: 'GET' | 'POST' | 'DELETE' | 'PUT', body?: string) {
    this.client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_ANON_KEY, {
      fetch: (...args) => {
        const [url, options] = args
        const updatedOptions = {
          ...options,
          method: method ? method : 'GET',
          body: body,
        }

        return fetch(url, { ...updatedOptions })
      },
    })
  }

  getAll = async (columns: string = '*') => {
    const res = await this.client.from('List').select(columns)

    return res.data
  }

  get = async (id: string, columns: string = '*') => {
    const res = await this.client
      .from('List')
      .select(columns)
      .eq('id', id)

    return res.data
  }

  getListTasks = async (id: string, columns: string = '*') => {
    const res = await this.client
      .from('Tasks')
      .select(columns)
      .eq('list_id', id)

    return res.data
  }
}
