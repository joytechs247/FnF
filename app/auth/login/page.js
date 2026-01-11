'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from 'react-icons/fi'
import { FcGoogle } from 'react-icons/fc'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  
  const { login, googleSignIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      await login(email, password)
      setSuccess('Login successful! Redirecting...')
      setTimeout(() => {
        router.push('/')
      }, 1500)
    } catch (err) {
      console.error('Login error:', err)
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No account found with this email.')
          break
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.')
          break
        case 'auth/invalid-email':
          setError('Please enter a valid email address.')
          break
        case 'auth/too-many-requests':
          setError('Too many attempts. Please try again later.')
          break
        default:
          setError('Failed to login. Please check your credentials.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
      router.push('/')
    } catch (err) {
      console.error('Google sign in error:', err)
      setError('Failed to sign in with Google.')
    }
  }

  const handleDemoLogin = (role) => {
    if (role === 'customer') {
      setEmail('demo@fibresnfools.com')
      setPassword('demopassword123')
    } else if (role === 'admin') {
      setEmail('admin@fibresnfools.com')
      setPassword('adminpassword123')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50">
      <div className="max-w-md w-full space-y-8">
        {/* Brand Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full"></div>
            <span className="text-3xl font-bold text-gray-900">FibresNFools</span>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome back! 👋
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue shopping
          </p>
        </div>

        {/* Demo Accounts */}
        {/* <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-3 font-medium">Try demo accounts:</p>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleDemoLogin('customer')}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-[var(--primary)] to-pink-500 text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
            >
              Customer Demo
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              className="flex-1 px-3 py-2 bg-gradient-to-r from-[var(--secondary)] to-blue-500 text-white text-sm rounded-lg hover:opacity-90 transition-opacity"
            >
              Admin Demo
            </button>
          </div>
        </div> */}

        <div className="card p-8">
          {/* Error/Success Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <FiAlertCircle className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
              <FiCheckCircle className="text-green-500 text-xl flex-shrink-0 mt-0.5" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field pl-12"
                  placeholder="you@example.com"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-field pl-12 pr-12"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/auth/signup"
                className="font-medium text-[var(--primary)] hover:underline"
              >
                Sign up for free
              </Link>
            </p>
            <p className="text-center text-sm text-gray-600 mt-2">
              By continuing, you agree to our{' '}
              <Link href="/policies/terms" className="text-[var(--primary)] hover:underline">
                Terms
              </Link>{' '}
              and{' '}
              <Link href="/policies/privacy" className="text-[var(--primary)] hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="mt-8">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}