// src/pages/ResetPasswordPage.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import {
  BookOpen,
  Lock,
  ArrowLeft,
  GraduationCap,
  Users,
  Award,
  Sparkles,
} from 'lucide-react';

const FloatingIcon = ({
  icon: Icon,
  className,
}: {
  icon: React.ComponentType<any>;
  className: string;
}) => (
  <div className={`absolute ${className} animate-float`}>
    <Icon className="w-6 h-6 text-white/10" />
  </div>
);

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const token = params.get('token') || '';
  const emailFromUrl = params.get('email') || '';

  const [email, setEmail] = useState(emailFromUrl);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token.');
    }
  }, [token]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/reset-password',
        { token, email, password, password_confirmation: confirmPassword },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setSuccess(res.data.message || 'Password reset successfully. Redirecting...');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          'Failed to reset password. Try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 overflow-hidden">
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      {/* Floating icons */}
      <FloatingIcon icon={BookOpen} className="top-24 left-16" />
      <FloatingIcon icon={GraduationCap} className="top-40 right-20" />
      <FloatingIcon icon={Users} className="bottom-32 left-20" />
      <FloatingIcon icon={Award} className="bottom-16 right-16" />
      <FloatingIcon icon={Sparkles} className="top-1/2 left-1/3" />

      {/* Glow circles */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

      {/* Form */}
      <div className="flex items-center justify-center min-h-screen p-6 relative z-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-center mb-10">
            <div className="relative flex items-center space-x-3 bg-slate-900/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-slate-700/50">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">Reset Password</span>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-xl shadow-2xl border-white/20 overflow-hidden border-0">
            <div className="p-6">
              <div className="text-center space-y-2 mb-6">
                <h2 className="text-blue-200/80">
                  Enter your new password below.
                </h2>
              </div>

              <form onSubmit={handleReset} className="space-y-6">
                <div className="space-y-2 text-blue-100">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className={`h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 backdrop-blur-sm transition-all duration-300 ${
                      focusedField === 'password'
                        ? 'border-blue-400 bg-white/20 shadow-lg shadow-blue-500/25'
                        : 'hover:bg-white/15'
                    }`}
                  />
                </div>

                <div className="space-y-2 text-blue-100">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedField('confirmPassword')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className={`h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 backdrop-blur-sm transition-all duration-300 ${
                      focusedField === 'confirmPassword'
                        ? 'border-blue-400 bg-white/20 shadow-lg shadow-blue-500/25'
                        : 'hover:bg-white/15'
                    }`}
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && <p className="text-sm text-green-600">{success}</p>}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>

                <div className="text-center pt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200 hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to Login
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
