# Environment Variables Setup Guide

## Quick Start

1. Create a file named `.env.local` in the `GrindAI` folder (same level as `package.json`)
2. Copy the template below into that file
3. Replace all placeholder values with your actual keys

## Environment Variables Template

Copy this into your `.env.local` file:

```env
# ============================================
# GrindApp Environment Variables
# ============================================
# 
# IMPORTANT: Replace the placeholder values below with your actual keys
# Never commit this file to version control (it's already in .gitignore)
#
# ============================================

# ============================================
# Supabase Configuration
# ============================================
# Get these values from: https://supabase.com/dashboard/project/_/settings/api
# 
# NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
#   Example: https://your-project-id.supabase.co
#
# NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anonymous/public key
#   This is safe to expose in client-side code (it's public)
#   Example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# ============================================

NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# ============================================
# Google Gemini AI Configuration
# ============================================
# Get your API key from: https://makersuite.google.com/app/apikey
# or https://ai.google.dev/
#
# You can use either GOOGLE_GENERATIVE_AI_API_KEY or GEMINI_API_KEY
# The application will check for both
# ============================================

GOOGLE_GENERATIVE_AI_API_KEY=your-google-gemini-api-key-here
# Alternative variable name (optional):
# GEMINI_API_KEY=your-google-gemini-api-key-here

# ============================================
# Optional: Additional Configuration
# ============================================
# Add any other environment variables you need below
# ============================================
```

## Where to Get Your Keys

### Supabase Keys

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → Use for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → Use for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey) or [Google AI for Developers](https://ai.google.dev/)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key → Use for `GOOGLE_GENERATIVE_AI_API_KEY`

## Important Notes

- ✅ The `.env.local` file is already in `.gitignore` - it won't be committed to version control
- ✅ After creating/updating `.env.local`, **restart your Next.js dev server** for changes to take effect
- ✅ Never share your API keys publicly
- ✅ The `NEXT_PUBLIC_` prefix means these variables are exposed to the browser (safe for Supabase anon key)

## Troubleshooting

If you're still getting errors after setting up your `.env.local`:

1. Make sure the file is named exactly `.env.local` (not `.env` or `.env.example`)
2. Make sure the file is in the `GrindAI` folder (same level as `package.json`)
3. Restart your Next.js dev server: Stop it (Ctrl+C) and run `npm run dev` again
4. Check that there are no extra spaces or quotes around your values
5. Make sure you're using the correct keys (Supabase URL and anon key, not service role key)

## Example (Don't use these - they're fake!)

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMDAwMDAwMCwiZXhwIjoxOTQ1NTc2MDAwfQ.fake_key_for_example_only
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567
```

