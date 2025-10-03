"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const logoUrl = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0b3871a9-339e-42e0-ba54-51f5ac1974b3-ewaproduct-com/assets/svgs/logo-black-3.svg?";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && session?.user) {
      router.push("/");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      toast.success("Аккаунт создан! Пожалуйста, войдите в систему.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
        callbackURL: "/",
      });

      if (error?.code) {
        toast.error("Неверный адрес электронной почты или пароль. Пожалуйста, убедитесь, что вы уже зарегистрировали учетную запись и повторите попытку.");
        setIsLoading(false);
        return;
      }

      toast.success("Успешный вход!");
      router.push("/");
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image src={logoUrl} alt="EWA PRODUCT" width={120} height={48} priority />
          </Link>
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-2">Войти</h1>
          <p className="text-[#666666]">Добро пожаловать! Пожалуйста, войдите в свою учетную запись</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-[#1A1A1A] border-[#E0E0E0] rounded focus:ring-[#1A1A1A]"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-[#666666]">
              Запомнить меня
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1A1A1A] text-white py-3 rounded-lg font-medium hover:bg-[#333333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Вход..." : "Войти"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#666666]">
            Нет учетной записи?{" "}
            <Link href="/register" className="text-[#1A1A1A] font-medium hover:underline">
              Зарегистрироваться
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