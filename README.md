# 🧑‍🤝‍🧑 Interactive Data Selector

یک سیستم مدیریت کاربران پیشرفته و تعاملی با React، TypeScript و Vite

## ✨ ویژگی‌های اصلی

### 🎯 **انتخاب چندگانه هوشمند**
- **Ctrl+Click**: انتخاب چندین کاربر همزمان
- **نمایش بصری**: کاربران انتخاب شده با رنگ آبی مشخص می‌شوند
- **نمایش شمارنده**: تعداد کاربران انتخاب شده نمایش داده می‌شود

### 🔍 **جستجوی پیشرفته**
- جستجو در نام، ایمیل و اطلاعات کاربران
- به‌روزرسانی خودکار URL برای اشتراک‌گذاری
- جستجوی لحظه‌ای با Enter

### 👤 **نمایش جزئیات کامل**
- **Modal جزئیات**: کلیک ساده روی کاربر
- نمایش کامل اطلاعات شخصی، شغلی و آدرس
- طراحی responsive و زیبا

### 🎨 **رابط کاربری مدرن**
- **حالت تاریک/روشن**: تغییر تم با یک کلیک
- **Loading Screen**: انیمیشن بارگذاری اولیه
- **Responsive Design**: سازگار با تمام دستگاه‌ها
- **TailwindCSS v4**: استایل‌دهی مدرن

### ⚙️ **کنترل‌های قدرتمند**
- انتخاب تعداد نمایش: 10, 20, 30, 50, همه
- نمایش فقط کاربران انتخاب شده
- پاک کردن انتخاب‌ها با یک کلیک
- جستجوی مجدد و به‌روزرسانی

## 🚀 نحوه استفاده

### نصب و اجرا
```bash
# کلون کردن پروژه
git clone https://github.com/Mehrzadnkz/Interactive-Data-Selector.git

# ورود به پوشه پروژه
cd Interactive-Data-Selector

# نصب dependencies
bun install

# اجرای سرور توسعه
bun dev
```

پروژه روی `http://localhost:1387` اجرا خواهد شد.

### راهنمای استفاده

#### 🎯 انتخاب چندگانه
1. کلید `Ctrl` را نگه دارید
2. روی کاربران مورد نظر کلیک کنید
3. کاربران انتخاب شده با رنگ آبی مشخص می‌شوند

#### 👁️ مشاهده جزئیات
- بدون نگه داشتن `Ctrl` روی کاربر کلیک کنید
- Modal جزئیات باز خواهد شد

#### 📋 مدیریت انتخاب‌ها
- **نمایش انتخاب‌شده‌ها**: فقط کاربران انتخاب شده نمایش داده می‌شوند
- **پاک کردن**: تمام انتخاب‌ها پاک می‌شوند

## 🛠️ تکنولوژی‌های استفاده شده

- **React 19.2.0** - کتابخانه رابط کاربری
- **TypeScript** - برای Type Safety
- **Vite 7.1.12** - ابزار Build سریع
- **TailwindCSS v4** - Framework CSS مدرن
- **Bun** - Package Manager و Runtime سریع
- **Axios** - HTTP Client
- **DummyJSON API** - منبع داده‌های آزمایشی

## 🌟 ویژگی‌های تکنیکی

### State Management
- `useState` برای مدیریت state های مختلف
- `useEffect` برای lifecycle management
- `useCallback` برای بهینه‌سازی عملکرد

### Performance Optimization
- Lazy loading برای بهبود سرعت
- Debounced search برای کاهش درخواست‌های API
- Memoization برای جلوگیری از re-renders غیرضروری

### Responsive Design
- Grid system انعطاف‌پذیر
- Mobile-first approach
- Support برای تمام سایزهای صفحه

## 📂 ساختار پروژه

```
src/
├── App.tsx                 # کامپوننت اصلی
├── main.tsx               # نقطه ورود
├── index.css              # استایل‌های گلوبال
public/
├── components/
│   ├── header/
│   │   └── header.tsx     # هدر و جستجو
│   ├── footer/
│   │   └── footer.tsx     # فوتر
│   └── functions/
│       └── functions.tsx  # UserCard و Modal
└── api/
    └── api.tsx           # سرویس‌های API
```

## 🔧 تنظیمات

### Environment Variables
فایل `.env` را ایجاد کنید:
```env
VITE_API_URL=https://dummyjson.com
```

### Port Configuration
پورت پیش‌فرض: `1387` (در `vite.config.ts`)

## 🤝 مشارکت

1. Fork کنید
2. Branch جدید ایجاد کنید: `git checkout -b feature/amazing-feature`
3. تغییرات را commit کنید: `git commit -m 'Add amazing feature'`
4. Push کنید: `git push origin feature/amazing-feature`
5. Pull Request ایجاد کنید

## 📝 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

## 👨‍💻 سازنده

**Mehrzad** - [GitHub](https://github.com/Mehrzadnkz)

---

⭐ اگر این پروژه برایتان مفید بود، حتماً ستاره بدهید!