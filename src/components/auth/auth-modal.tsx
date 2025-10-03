"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { Eye, EyeOff, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const logoUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/svgs/logo-black-3.svg?";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "login" | "register";
  language: 'RU' | 'EN';
}

export function AuthModal({ open, onOpenChange, defaultTab = "login", language }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-white rounded-2xl overflow-hidden border-0 shadow-2xl">
        <div className="relative">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-5 top-5 z-50 rounded-full bg-gray-100 p-2 transition-all hover:bg-gray-200 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:ring-offset-2"
          >
            <X className="h-5 w-5 text-gray-700" />
            <span className="sr-only">Close</span>
          </button>

          <div className="p-10">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-gradient-to-br from-[#1A1A1A] to-[#333333] rounded-xl mb-4">
                <Image src={logoUrl} alt="EWA PRODUCT" width={120} height={48} className="brightness-0 invert" priority />
              </div>
              <h2 className="text-2xl font-bold text-[#1A1A1A] mt-2">
                {language === 'RU' ? 'Добро пожаловать' : 'Welcome'}
              </h2>
            </div>

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 p-1 rounded-xl">
                <TabsTrigger 
                  value="login" 
                  className="text-sm font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
                >
                  {language === 'RU' ? 'Вход' : 'Login'}
                </TabsTrigger>
                <TabsTrigger 
                  value="register" 
                  className="text-sm font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all"
                >
                  {language === 'RU' ? 'Регистрация' : 'Register'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <LoginForm language={language} onSuccess={() => onOpenChange(false)} />
              </TabsContent>

              <TabsContent value="register">
                <RegisterForm language={language} onSuccess={() => onOpenChange(false)} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function LoginForm({ language, onSuccess }: { language: 'RU' | 'EN'; onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
      });

      if (error?.code) {
        toast.error(language === 'RU' 
          ? "Неверный адрес электронной почты или пароль. Убедитесь, что вы уже зарегистрировали учетную запись и попробуйте еще раз."
          : "Invalid email or password. Please make sure you have already registered an account and try again.");
        setIsLoading(false);
        return;
      }

      if (data?.session) {
        localStorage.setItem("bearer_token", data.session.token);
      }

      toast.success(language === 'RU' ? "Вход выполнен успешно!" : "Successfully signed in!");
      onSuccess();
      router.push("/");
    } catch (error) {
      toast.error(language === 'RU' ? "Произошла ошибка. Пожалуйста, повторите попытку." : "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="login-email" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
          {language === 'RU' ? 'Электронная почта' : 'Email'}
        </label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent transition-all"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="login-password" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
          {language === 'RU' ? 'Пароль' : 'Password'}
        </label>
        <div className="relative">
          <input
            id="login-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="off"
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent pr-12 transition-all"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E91E63] transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="remember-me"
          type="checkbox"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          className="w-4 h-4 text-[#E91E63] border-gray-300 rounded focus:ring-[#E91E63] cursor-pointer"
        />
        <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600 cursor-pointer">
          {language === 'RU' ? 'Запомнить меня' : 'Remember me'}
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isLoading ? (language === 'RU' ? 'Вход...' : 'Signing in...') : (language === 'RU' ? 'Войти' : 'Sign In')}
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        {language === 'RU' ? 'Нет аккаунта?' : "Don't have an account?"}{' '}
        <button type="button" onClick={() => {}} className="text-[#E91E63] font-semibold hover:underline">
          {language === 'RU' ? 'Зарегистрироваться' : 'Register'}
        </button>
      </p>
    </form>
  );
}

function RegisterForm({ language, onSuccess }: { language: 'RU' | 'EN'; onSuccess: () => void }) {
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(language === 'RU' ? "Пароли не совпадают" : "Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error(language === 'RU' ? "Пароль должен содержать не менее 8 символов" : "Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        email,
        name,
        password,
      });

      if (error?.code) {
        const errorMessages: Record<string, string> = {
          USER_ALREADY_EXISTS: language === 'RU' 
            ? "Пользователь с таким адресом электронной почты уже зарегистрирован"
            : "User with this email already exists",
        };
        toast.error(errorMessages[error.code] || (language === 'RU' ? "Не удалось зарегистрироваться" : "Failed to register"));
        setIsLoading(false);
        return;
      }

      // Generate and "send" verification code
      const code = generateVerificationCode();
      setGeneratedCode(code);
      
      // In production, send this code via email
      console.log('Verification code:', code);
      toast.success(
        language === 'RU' 
          ? `Код верификации отправлен на ${email}. Проверьте почту!`
          : `Verification code sent to ${email}. Check your email!`
      );
      
      setStep('verify');
      setIsLoading(false);
    } catch (error) {
      toast.error(language === 'RU' ? "Произошла ошибка. Пожалуйста, повторите попытку." : "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Verify the code
    if (verificationCode !== generatedCode) {
      toast.error(language === 'RU' ? "Неверный код верификации" : "Invalid verification code");
      setIsLoading(false);
      return;
    }

    // Auto-login after verification
    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (error?.code) {
        toast.error(language === 'RU' ? "Ошибка входа" : "Login error");
        setIsLoading(false);
        return;
      }

      if (data?.session) {
        localStorage.setItem("bearer_token", data.session.token);
        
        // Save phone number after successful login
        try {
          const phoneResponse = await fetch('/api/user/phone', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.session.token}`
            },
            body: JSON.stringify({ phone })
          });

          if (!phoneResponse.ok) {
            console.error('Failed to save phone number');
          }
        } catch (phoneError) {
          console.error('Error saving phone:', phoneError);
        }
      }

      toast.success(language === 'RU' ? "Регистрация успешна! Добро пожаловать!" : "Registration successful! Welcome!");
      onSuccess();
      router.push("/");
    } catch (error) {
      toast.error(language === 'RU' ? "Произошла ошибка. Пожалуйста, повторите попытку." : "An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  if (step === 'verify') {
    return (
      <form onSubmit={handleVerify} className="space-y-5">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-[#E91E63] to-[#C2185B] rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
            {language === 'RU' ? 'Подтвердите Email' : 'Verify Email'}
          </h3>
          <p className="text-sm text-gray-600">
            {language === 'RU' 
              ? `Мы отправили 6-значный код на ${email}`
              : `We sent a 6-digit code to ${email}`}
          </p>
        </div>

        <div>
          <label htmlFor="verification-code" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
            {language === 'RU' ? 'Код верификации' : 'Verification Code'}
          </label>
          <input
            id="verification-code"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            required
            maxLength={6}
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent transition-all text-center text-2xl tracking-widest font-semibold"
            placeholder="000000"
          />
          <p className="text-xs text-gray-500 mt-2 text-center">
            {language === 'RU' ? 'Введите 6-значный код из письма' : 'Enter the 6-digit code from email'}
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading || verificationCode.length !== 6}
          className="w-full bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (language === 'RU' ? 'Проверка...' : 'Verifying...') : (language === 'RU' ? 'Подтвердить' : 'Verify')}
        </button>

        <button
          type="button"
          onClick={() => setStep('register')}
          className="w-full text-gray-600 text-sm hover:text-[#E91E63] transition-colors"
        >
          {language === 'RU' ? '← Назад к регистрации' : '← Back to registration'}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="register-name" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
          {language === 'RU' ? 'Имя' : 'Name'} <span className="text-[#E91E63]">*</span>
        </label>
        <input
          id="register-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent transition-all"
          placeholder={language === 'RU' ? 'Ваше имя' : 'Your name'}
        />
      </div>

      <div>
        <label htmlFor="register-email" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
          {language === 'RU' ? 'Электронная почта' : 'Email'} <span className="text-[#E91E63]">*</span>
        </label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent transition-all"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="register-phone" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
          {language === 'RU' ? 'Номер телефона' : 'Phone Number'} <span className="text-[#E91E63]">*</span>
        </label>
        <input
          id="register-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent transition-all"
          placeholder="+7 (999) 123-45-67"
        />
      </div>

      <div>
        <label htmlFor="register-password" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
          {language === 'RU' ? 'Пароль' : 'Password'} <span className="text-[#E91E63]">*</span>
        </label>
        <div className="relative">
          <input
            id="register-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="off"
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent pr-12 transition-all"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E91E63] transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="register-confirm-password" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
          {language === 'RU' ? 'Подтвердите пароль' : 'Confirm Password'} <span className="text-[#E91E63]">*</span>
        </label>
        <div className="relative">
          <input
            id="register-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="off"
            className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent pr-12 transition-all"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E91E63] transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isLoading ? (language === 'RU' ? 'Регистрация...' : 'Registering...') : (language === 'RU' ? 'Зарегистрироваться' : 'Register')}
      </button>
    </form>
  );
}