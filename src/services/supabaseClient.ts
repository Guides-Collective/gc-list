import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://jjuymnuuqyffzmtukcfe.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqdXltbnV1cXlmZnptdHVrY2ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk3NjMwNDAsImV4cCI6MjAwNTMzOTA0MH0.uF4je7DnruizuDbAnPrw5mJF59ayz_NugMJrhVXLxSk'
)
