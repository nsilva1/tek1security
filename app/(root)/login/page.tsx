'use client'

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Loader } from 'lucide-react';
import { Role } from '@/interface/user_interface';
import { useRouter } from 'next/navigation';

export const metadata = {
  title: 'Log In - TEK1SECURITY',
  description: 'Access your TEK1SECURITY dashboard to manage your security operations effortlessly.',
};

const LoginPage = () => {
  const { login, loading, userInfo } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (input: string, value: any) => {
    setFormData({
      ...formData,
      [input]: value,
    });
  };

  const handleSubmit =async  (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(formData.email, formData.password);
    const role = userInfo?.role
    
          if(role === Role.ADMIN) {
            router.push('/admin/dashboard');
          } else if(role === Role.CLIENT) {
            router.push('/client/dashboard');
          } else if(role === Role.GUARD) {
            router.push('/guard/dashboard');
          } else if(role === Role.SUPERVISOR) {
            router.push('/supervisor/dashboard');
          } else if(role === Role.TEK1ADMIN) {
            router.push('/tek1/dashboard');
          }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      {/* Section 1: Hero Section */}
      <section className="flex w-full flex-col items-center gap-6 bg-secondary py-16 px-10 md:px-20 lg:px-40">
        <h1 className="text-white font-bold text-3xl md:text-5xl max-w-4xl lg:leading-tight text-center">
          Welcome Back
        </h1>
        <p className="text-white font-medium text-lg text-center max-w-2xl">
          Log in to your TEK1SECURITY dashboard to manage your security operations effortlessly.
        </p>
      </section>

      {/* Section 2: Form Section */}
      <section className="flex-1 flex w-full justify-center items-center py-16 px-6 md:px-20 bg-muted/20">
        <Card className="w-full max-w-md shadow-lg border-border/50">
          <CardContent className="p-8 md:p-10 flex flex-col gap-8">
            <div className="space-y-2 text-center">
              <h2 className="font-bold text-2xl lg:text-3xl">
                Log in to your account
              </h2>
              <p className="text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                  href="/sign-up"
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <fieldset disabled={loading}>
                <div className="space-y-2">
                <Label htmlFor="workEmail">Work Email</Label>
                <Input
                  id="workEmail"
                  type="email"
                  placeholder="john@company.com"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full mt-4" size="lg">
                {loading ? <Loader className="animate-spin" /> : 'Log In'}
              </Button>
              </fieldset>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default LoginPage;
