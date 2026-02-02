'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, User, ArrowRight, Chrome, Phone } from 'lucide-react'
import Link from 'next/link'
import { Navbar, Footer } from '@/components'
import { Button } from '@/components/ui'
import { clsx } from 'clsx'
import Image from 'next/image'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement JWT authentication
    console.log('Auth submission:', { email, password, name, phone, isSignUp })
  }

  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth
    console.log('Google sign in')
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-20 pb-12">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        </div>

        <div className="section-container relative">
          <div className="max-w-md mx-auto pt-12">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <Link href="/" className="inline-block mb-6">
                <Image
                  src="/polyprop_lockup_white_balanced.png"
                  alt="PolyProp"
                  width={180}
                  height={42}
                  className="h-10 w-auto mx-auto"
                />
              </Link>
              <h1 className="text-h2 text-text-primary mb-2">
                {isSignUp ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-body text-text-secondary">
                {isSignUp
                  ? 'Start your journey to becoming a funded trader'
                  : 'Sign in to continue your evaluation'}
              </p>
            </motion.div>

            {/* Auth Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-surface/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-card"
            >
              {/* Google OAuth Button */}
              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-medium transition-all border border-gray-200 hover:border-gray-300 mb-6"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-caption">
                  <span className="bg-surface px-4 text-text-muted">Or continue with email</span>
                </div>
              </div>

              {/* Auth Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  {isSignUp && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-body-sm font-medium text-text-primary mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full pl-11 pr-4 py-3 bg-surface-elevated border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            required={isSignUp}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-body-sm font-medium text-text-primary mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full pl-11 pr-4 py-3 bg-surface-elevated border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            required={isSignUp}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-11 pr-4 py-3 bg-surface-elevated border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-body-sm font-medium text-text-primary mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-4 py-3 bg-surface-elevated border border-border rounded-xl text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      required
                      minLength={8}
                    />
                  </div>
                  {isSignUp && (
                    <p className="mt-2 text-caption text-text-muted">
                      Must be at least 8 characters
                    </p>
                  )}
                </div>

                {!isSignUp && (
                  <div className="flex items-center justify-between text-body-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-border bg-surface-elevated text-accent focus:ring-2 focus:ring-accent focus:ring-offset-0"
                      />
                      <span className="text-text-secondary">Remember me</span>
                    </label>
                    <a href="#" className="text-accent hover:text-accent-hover transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}

                <Button type="submit" className="w-full" size="lg">
                  {isSignUp ? 'Create account' : 'Sign in'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              {/* Toggle Sign In/Sign Up */}
              <div className="mt-6 text-center text-body-sm text-text-secondary">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-accent hover:text-accent-hover font-medium transition-colors"
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </div>

              {/* Terms */}
              {isSignUp && (
                <p className="mt-6 text-center text-caption text-text-muted">
                  By creating an account, you agree to our{' '}
                  <Link href="/terms" className="text-accent hover:text-accent-hover">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-accent hover:text-accent-hover">
                    Privacy Policy
                  </Link>
                </p>
              )}
            </motion.div>

            {/* Security Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 flex items-center justify-center gap-2 text-caption text-text-muted"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Secured with 256-bit encryption</span>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
