import Link from 'next/link'
import Image from 'next/image'
import { Shield } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="admin-container py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/polyprop_lockup_white_balanced.png"
              alt="PolyProp"
              width={120}
              height={28}
              className="h-6 w-auto"
              priority
            />
            <span className="text-sm font-medium text-text-muted border-l border-border pl-3">Admin</span>
          </Link>
          <Link 
            href="https://polyprop.co" 
            className="text-text-secondary hover:text-text-primary transition-colors text-sm"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-3">
            Admin Dashboard
          </h1>
          <p className="text-text-secondary max-w-md mx-auto">
            Admin panel is under development. Check back soon.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="admin-container py-6 text-center text-text-muted text-sm">
          © 2026 PolyProp. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
