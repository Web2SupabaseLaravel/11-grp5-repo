// src/pages/SignInPage.tsx
import React, { useState, FocusEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookOpen, Eye, EyeOff, Sparkles, GraduationCap, Users, Award } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface FloatingIconProps {
  icon: React.ComponentType<any>;
  className: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon: Icon, className }) => (
  <div className={`absolute ${className} animate-pulse`}>
    <Icon className="w-6 h-6 text-blue-300/30" />
  </div>
);

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const navigate = useNavigate();
  const { signin } = useAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      await signin(email, password);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        'Login failed. Please check your email or password.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => setFocusedField(e.target.id);
  const handleBlur = () => setFocusedField('');

  return (
    <div className="min-h-screen relative overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(2deg); }
          66% { transform: translateY(5px) rotate(-1deg); }
        }
      `}</style>

      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950" />
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/5 to-transparent" />

      {/* Floating icons */}
      <FloatingIcon icon={BookOpen} className="top-20 left-20" />
      <FloatingIcon icon={GraduationCap} className="top-40 right-32" />
      <FloatingIcon icon={Users} className="bottom-40 left-16" />
      <FloatingIcon icon={Award} className="bottom-20 right-20" />
      <FloatingIcon icon={Sparkles} className="top-60 left-1/3" />

      <div className="relative z-10 min-h-screen flex">
        {/* Left: Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="flex items-center justify-center mb-12">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-1000" />
                <div className="relative flex items-center space-x-3 bg-slate-900/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-slate-700/50">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Learning Courses
                  </span>
                </div>
              </div>
            </div>

            {/* Card */}
            <Card className="border-0 bg-white/10 backdrop-blur-xl shadow-2xl border-white/20 rounded-lg max-w-md w-full p-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl font-bold text-white mb-2">Welcome back</CardTitle>
                <CardDescription className="text-blue-200/80 text-lg">
                  Sign in to continue your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {errorMessage && (
                    <div className="text-sm text-red-400 bg-red-500/10 p-3 rounded-md border border-red-400/20">
                      {errorMessage}
                    </div>
                  )}

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-blue-100">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      placeholder="Enter your email"
                      className={`h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 backdrop-blur-sm transition-all duration-300 ${
                        focusedField === 'email'
                          ? 'border-blue-400 bg-white/20 shadow-lg shadow-blue-500/25'
                          : 'hover:bg-white/15'
                      }`}
                      required
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-blue-100">Password</Label>
                    <div className="relative group">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder="Enter your password"
                        className={`h-12 bg-white/10 border-white/20 text-white placeholder:text-blue-200/50 pr-12 backdrop-blur-sm transition-all duration-300 ${
                          focusedField === 'password'
                            ? 'border-blue-400 bg-white/20 shadow-lg shadow-blue-500/25'
                            : 'hover:bg-white/15'
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200/70 hover:text-white transition-colors duration-200 p-1 rounded-md hover:bg-white/10"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me & forgot */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input id="remember" type="checkbox" className="h-4 w-4 text-blue-500 bg-white/10 border-white/30 rounded" />
                      <label htmlFor="remember" className="ml-2 text-sm text-blue-200/80">Remember me</label>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/forgot-password')}
                      className="text-sm text-blue-300 hover:text-blue-200 transition-colors duration-200 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Sign In button */}
                  <Button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      'Sign in'
                    )}
                  </Button>
                </div>

                {/* Register prompt */}
                <div className="mt-8 text-center">
                  <p className="text-blue-200/80">
                    Don't have an account?{' '}
                    <button
                      onClick={() => navigate('/register')}
                      className="text-blue-300 hover:text-white font-medium transition-colors duration-200 hover:underline"
                    >
                      Create one now
                    </button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right side - animated icons */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative">
          <div className="max-w-lg text-center relative">
            <div className="relative mb-12">
              <div className="w-80 h-80 mx-auto relative">
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-pulse" />
                <div className="absolute inset-4 rounded-full border-2 border-purple-400/20 animate-pulse" />
                <div className="absolute inset-8 rounded-full border-2 border-pink-400/10 animate-pulse" />
                <div className="absolute inset-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <BookOpen className="h-24 w-24 text-blue-300" />
                </div>

                {/* Floating icons around */}
                <div className="absolute top-8 left-8 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 animate-bounce">
                  <GraduationCap className="w-6 h-6 text-blue-300" />
                </div>
                <div className="absolute top-16 right-8 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 animate-bounce">
                  <Award className="w-6 h-6 text-purple-300" />
                </div>
                <div className="absolute bottom-16 left-12 w-12 h-12 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 animate-bounce">
                  <Users className="w-6 h-6 text-pink-300" />
                </div>
                <div className="absolute bottom-8 right-16 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10 animate-bounce">
                  <Sparkles className="w-6 h-6 text-blue-300" />
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-12">
                <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-sm text-blue-200/70">Students</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-bold text-white">1,200+</div>
                  <div className="text-sm text-blue-200/70">Courses</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-sm text-blue-200/70">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
