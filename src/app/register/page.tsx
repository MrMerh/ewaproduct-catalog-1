"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const logoUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/svgs/logo-black-3.svg?";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && session?.user) {
      router.push("/");
    }
  }, [session, isPending, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    if (password.length < 8) {
      toast.error("Пароль должен содержать не менее 8 символов");
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
          USER_ALREADY_EXISTS: "Пользователь с таким адресом электронной почты уже зарегистрирован",
        };
        toast.error(errorMessages[error.code] || "Не удалось зарегистрироваться");
        setIsLoading(false);
        return;
      }

      toast.success("Аккаунт создан успешно!");
      router.push("/login?registered=true");
    } catch (error) {
      toast.error("Произошла ошибка. Пожалуйста, повторите попытку.");
      setIsLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A1A1A]"></div>
      </div>
    );
  }

  if (session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image src={logoUrl} alt="EWA PRODUCT" width={120} height={48} priority />
          </Link>
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Регистрация</h1>
          <p className="text-[#666666]">Создайте свою учетную запись</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#333333] mb-2">
              Имя
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent"
              placeholder="Ваше имя"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#333333] mb-2">
              Электронная почта
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#333333] mb-2">
              Пароль
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] hover:text-[#333333]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#333333] mb-2">
              Подтвердите пароль
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                autoComplete="off"
                className="w-full px-4 py-3 border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1A1A] focus:border-transparent pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9E9E9E] hover:text-[#333333]"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1A1A1A] text-white py-3 rounded-lg font-medium hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#666666]">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-[#1A1A1A] font-medium hover:underline">
              Войти
            </Link>
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-[#666666] hover:text-[#333333] text-sm">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}