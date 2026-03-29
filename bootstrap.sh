nano bootstrap.sh

#!/usr/bin/env bash
# =====================================================
# CreatorFloor v1.0 Bootstrap Script
# -----------------------------------------------------
# This script creates a clean, ready-to-run environment
# with Next.js, TailwindCSS, Supabase, and Stripe setup.
# It represents Move #1 in the Controlled Refactor Chess loop.
# =====================================================

set -e

echo "🚀 Bootstrapping CreatorFloor v1.0 Clean Build..."

# 1. Create base directory
mkdir -p creatorfloor_v1
cd creatorfloor_v1

# 2. Initialize Next.js app with TypeScript and Turbopack
echo "📦 Initializing Next.js app..."
npx create-next-app@latest web --typescript --use-npm --turbopack --no-tailwind --eslint

cd web

# 3. Install dependencies
echo "🧩 Installing dependencies..."
npm install @supabase/supabase-js stripe posthog-js
npm install -D tailwindcss postcss autoprefixer

# 4. Initialize TailwindCSS
echo "🎨 Setting up TailwindCSS..."
npx tailwindcss init -p

# 5. Configure Tailwind (CJS)
cat > tailwind.config.cjs <<'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        accent: '#7c3aed', // violet base accent
      },
    },
  },
  plugins: [],
}
EOF

# 6. Update globals.css
cat > app/globals.css <<'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body {
  @apply bg-neutral-50 text-neutral-900 min-h-screen;
  font-family: system-ui, sans-serif;
}
EOF

# 7. Create folder structure
echo "📂 Creating folder structure..."
mkdir -p app/{site,platform,account,agents,api,projects,kits,pm}
mkdir -p app/api/{stripe,checkout_sessions,analytics,memory}
mkdir -p components lib types docs

# 8. Create placeholder files
echo "🧱 Creating placeholder files..."

# Layouts and pages
cat > app/layout.tsx <<'EOF'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
EOF

cat > app/page.tsx <<'EOF'
export default function HomePage() {
  return <div className="p-8 text-center text-2xl font-semibold">Hello CreatorFloor — Public Site</div>;
}
EOF

cat > app/platform/page.tsx <<'EOF'
export default function PlatformHome() {
  return <div className="p-8 text-center text-2xl font-semibold">Hello CreatorFloor — Platform</div>;
}
EOF

# Libraries
cat > lib/supabaseClient.ts <<'EOF'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
EOF

cat > lib/stripeClient.ts <<'EOF'
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-10-28',
})
EOF

cat > lib/useUser.ts <<'EOF'
"use client"
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export function useUser() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);
  return user;
}
EOF

# Types
cat > types/index.ts <<'EOF'
// Shared Type Definitions
export interface Project {
  id: string;
  name: string;
  description?: string;
  created_at?: string;
}
EOF

# Env example
cat > .env.local.example <<'EOF'
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_PERSONAL=
STRIPE_PRICE_STUDIO=
STRIPE_PRICE_PRO=
STRIPE_PRICE_ENTERPRISE=
EOF

# 9. Initialize Git and first commit
echo "🪄 Initializing Git..."
git init
git add .
git commit -m "chore: CreatorFloor v1.0 clean foundation"
git tag -a v1.0.0-clean-foundation -m "CreatorFloor v1.0 clean foundation"

echo "✅ Bootstrap complete!"
echo "Next steps:"
echo "1. cd creatorfloor_v1/web"
echo "2. npm run dev"
echo "3. Visit http://localhost:3000 to confirm both pages render"
echo "🏗️ CreatorFloor foundation is ready for Controlled Refactor Chess."


