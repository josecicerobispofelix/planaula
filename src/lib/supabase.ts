import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yqnbxpbbpbwjbtzydrqk.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxbmJ4cGJicGJ3amJ0enlkcnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MjAxNTIsImV4cCI6MjA5NjA5NjE1Mn0.7HembRp1vVLz43XLCy6sw1Kx_xGPkK0N2Ra5wtsUXZ8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
