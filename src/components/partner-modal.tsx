"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

interface PartnerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'RU' | 'EN';
}

export function PartnerModal({ open, onOpenChange, language }: PartnerModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Integrate with admin panel API
    setTimeout(() => {
      toast.success(language === 'RU' 
        ? "Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время."
        : "Your application has been successfully submitted! We will contact you soon.");
      setIsLoading(false);
      setFormData({ name: "", email: "", phone: "", city: "", message: "" });
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 bg-white rounded-2xl overflow-hidden border-0 shadow-2xl max-h-[90vh] overflow-y-auto">
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
              <div className="inline-block p-4 bg-gradient-to-br from-[#E91E63] to-[#C2185B] rounded-xl mb-4">
                <h2 className="text-3xl font-black text-white">EWA</h2>
                <p className="text-sm font-light text-white tracking-widest">PRODUCT</p>
              </div>
              <h3 className="text-2xl font-bold text-[#1A1A1A] mt-4">
                {language === 'RU' ? 'Стать партнером' : 'Become a Partner'}
              </h3>
              <p className="text-gray-600 mt-2">
                {language === 'RU' 
                  ? 'Присоединяйтесь к команде успешных предпринимателей' 
                  : 'Join our team of successful entrepreneurs'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="partner-name" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  {language === 'RU' ? 'Полное имя' : 'Full Name'} <span className="text-[#E91E63]">*</span>
                </label>
                <input
                  id="partner-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent transition-all"
                  placeholder={language === 'RU' ? 'Иван Иванов' : 'John Smith'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="partner-email" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    {language === 'RU' ? 'Электронная почта' : 'Email'} <span className="text-[#E91E63]">*</span>
                  </label>
                  <input
                    id="partner-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="partner-phone" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                    {language === 'RU' ? 'Номер телефона' : 'Phone Number'} <span className="text-[#E91E63]">*</span>
                  </label>
                  <input
                    id="partner-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent transition-all"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="partner-city" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  {language === 'RU' ? 'Город' : 'City'} <span className="text-[#E91E63]">*</span>
                </label>
                <input
                  id="partner-city"
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent transition-all"
                  placeholder={language === 'RU' ? 'Москва' : 'Moscow'}
                />
              </div>

              <div>
                <label htmlFor="partner-message" className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  {language === 'RU' ? 'Сообщение' : 'Message'}
                </label>
                <textarea
                  id="partner-message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E91E63] focus:border-transparent transition-all resize-none"
                  placeholder={language === 'RU' ? 'Расскажите о себе и своем опыте...' : 'Tell us about yourself and your experience...'}
                />
              </div>

              <div className="bg-gradient-to-r from-[#E91E63]/10 to-[#C2185B]/10 rounded-xl p-5 border border-[#E91E63]/20">
                <h4 className="font-semibold text-[#1A1A1A] mb-2">
                  {language === 'RU' ? 'Преимущества партнерства:' : 'Partnership Benefits:'}
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E91E63] font-bold">•</span>
                    <span>{language === 'RU' ? 'Высокий доход и прозрачная система вознаграждений' : 'High income and transparent reward system'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E91E63] font-bold">•</span>
                    <span>{language === 'RU' ? 'Обучение и поддержка от профессионалов' : 'Training and support from professionals'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E91E63] font-bold">•</span>
                    <span>{language === 'RU' ? 'Качественная продукция международного уровня' : 'High-quality international products'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E91E63] font-bold">•</span>
                    <span>{language === 'RU' ? 'Гибкий график работы' : 'Flexible work schedule'}</span>
                  </li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#E91E63] to-[#C2185B] text-white py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading 
                  ? (language === 'RU' ? 'Отправка...' : 'Submitting...') 
                  : (language === 'RU' ? 'Отправить заявку' : 'Submit Application')}
              </button>
            </form>

            <p className="text-center text-xs text-gray-500 mt-6">
              {language === 'RU' 
                ? 'Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности' 
                : 'By clicking the button, you agree to the privacy policy'}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}