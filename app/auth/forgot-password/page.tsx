'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@/lib/auth';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await resetPassword(email);

      if (error) {
        toast.error(error.message);
      } else {
        setSubmitted(true);
        toast.success('Password reset email sent!');
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Check your email
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We've sent a password reset link to <strong>{email}</strong>
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={() => setSubmitted(false)}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                try again
              </button>
            </p>
            <div className="mt-6">
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            SNT CRM
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Real Estate Customer Relationship Management
          </p>
          <h3 className="mt-4 text-center text-2xl font-bold text-gray-900">
            Reset your password
          </h3>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{' '}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
