
// 🛍️ STORE Footer Component
import React, { useEffect } from "react";
const Footer: React.FC = () => {
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
    html.style.colorScheme = theme;
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <footer className="border-t border-gray-200 dark:border-white/10 bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 text-gray-800 dark:text-gray-100 py-12 w-full mt-auto transition-all duration-300 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-md border border-gray-300 dark:border-white/10" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">DarkStore</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-100 text-base font-medium">خرید سریع، مطمئن و لذت‌بخش ✨</p>
        </div>
        <div>
          <h3 className="text-gray-00 dark:text-white font-bold mb-4 text-lg">لینک‌ها</h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-100 text-base font-semibold">
            <li><a href="/products" className="hover:text-blue-700 dark:hover:text-blue-300 transition-colors">محصولات</a></li>
            <li><a href="/offers" className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors">تخفیف‌ها</a></li>
            <li><a href="/faq" className="hover:text-pink-700 dark:hover:text-pink-300 transition-colors">سؤالات متداول</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-00 dark:text-white font-bold mb-4 text-lg">پشتیبانی</h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-100 text-base font-semibold">
            <li><a href="/about" className="hover:text-blue-700 dark:hover:text-blue-300 transition-colors">درباره ما</a></li>
            <li><a href="/contact" className="hover:text-purple-700 dark:hover:text-purple-300 transition-colors">تماس با ما</a></li>
            <li><a href="/support" className="hover:text-pink-700 dark:hover:text-pink-300 transition-colors">خدمات پس از فروش</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold mb-4 text-lg">دنبال کنید</h3>
          <div className="flex gap-5 text-gray-700 dark:text-gray-100 text-2xl font-semibold">
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">📘</a>
            <a href="#" className="hover:text-blue-500 dark:hover:text-blue-300 transition-colors">🐦</a>
            <a href="#" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors">📷</a>
          </div>
          <button onClick={scrollToTop} className="mt-8 px-6 py-3 border border-gray-300 dark:border-white/15 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10 transition-all font-semibold text-base">
            ⬆️ بازگشت به بالا
          </button>
        </div>
      </div>
      <div className="text-center text-gray-600 dark:text-gray-500 text-base font-bold border-t border-gray-200 dark:border-white/10 mt-10 pt-6">
        © {new Date().getFullYear()} DarkStore - تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
};
export default Footer;
