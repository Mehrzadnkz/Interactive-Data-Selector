import React from 'react';
import type { User } from '../../api/api';

// کامپوننت ProfileBox اصلی (تصادفی)
export const ProfileBox = () => {
  const Colors = [
    "red", "orange", "amber", "yellow", "lime", "green", 
    "emerald", "teal", "cyan", "sky", "blue", "indigo", 
    "violet", "purple", "fuchsia", "pink", "rose"
  ] as const;
  
  const Names = ["Alice", "Bob", "Charlie", "Diana", "Eve", "Frank", "Grace", "Henry"];
  const Emails = ["alice@example.com", "bob@company.com", "charlie@dev.io", "diana@design.co"];
  
  const randomColor = Colors[Math.floor(Math.random() * Colors.length)];
  const randomName = Names[Math.floor(Math.random() * Names.length)];
  const randomEmail = Emails[Math.floor(Math.random() * Emails.length)];
  const randomInitial = randomName.charAt(0).toUpperCase();

  // رنگ‌های پیش‌تعریف شده برای اینکه Tailwind بتونه تشخیصشون بده
  const borderColorClasses: Record<typeof Colors[number], string> = {
    red: "border-red-300 dark:border-red-700",
    orange: "border-orange-300 dark:border-orange-700",
    amber: "border-amber-300 dark:border-amber-700",
    yellow: "border-yellow-300 dark:border-yellow-700",
    lime: "border-lime-300 dark:border-lime-700",
    green: "border-green-300 dark:border-green-700",
    emerald: "border-emerald-300 dark:border-emerald-700",
    teal: "border-teal-300 dark:border-teal-700",
    cyan: "border-cyan-300 dark:border-cyan-700",
    sky: "border-sky-300 dark:border-sky-700",
    blue: "border-blue-300 dark:border-blue-700",
    indigo: "border-indigo-300 dark:border-indigo-700",
    violet: "border-violet-300 dark:border-violet-700",
    purple: "border-purple-300 dark:border-purple-700",
    fuchsia: "border-fuchsia-300 dark:border-fuchsia-700",
    pink: "border-pink-300 dark:border-pink-700",
    rose: "border-rose-300 dark:border-rose-700"
  };

  const avatarColorClasses: Record<typeof Colors[number], string> = {
    red: "bg-red-100 dark:bg-red-900 border-red-300 dark:border-red-600",
    orange: "bg-orange-100 dark:bg-orange-900 border-orange-300 dark:border-orange-600",
    amber: "bg-amber-100 dark:bg-amber-900 border-amber-300 dark:border-amber-600",
    yellow: "bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-600",
    lime: "bg-lime-100 dark:bg-lime-900 border-lime-300 dark:border-lime-600",
    green: "bg-green-100 dark:bg-green-900 border-green-300 dark:border-green-600",
    emerald: "bg-emerald-100 dark:bg-emerald-900 border-emerald-300 dark:border-emerald-600",
    teal: "bg-teal-100 dark:bg-teal-900 border-teal-300 dark:border-teal-600",
    cyan: "bg-cyan-100 dark:bg-cyan-900 border-cyan-300 dark:border-cyan-600",
    sky: "bg-sky-100 dark:bg-sky-900 border-sky-300 dark:border-sky-600",
    blue: "bg-blue-100 dark:bg-blue-900 border-blue-300 dark:border-blue-600",
    indigo: "bg-indigo-100 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-600",
    violet: "bg-violet-100 dark:bg-violet-900 border-violet-300 dark:border-violet-600",
    purple: "bg-purple-100 dark:bg-purple-900 border-purple-300 dark:border-purple-600",
    fuchsia: "bg-fuchsia-100 dark:bg-fuchsia-900 border-fuchsia-300 dark:border-fuchsia-600",
    pink: "bg-pink-100 dark:bg-pink-900 border-pink-300 dark:border-pink-600",
    rose: "bg-rose-100 dark:bg-rose-900 border-rose-300 dark:border-rose-600"
  };

  return (
    <div className={`border-2 border-solid p-6 ${borderColorClasses[randomColor]} rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-full ${avatarColorClasses[randomColor]} border-2 flex items-center justify-center mr-4 text-lg font-bold text-gray-700 dark:text-white`}>
          {randomInitial}
        </div>
        <div className="ml-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{randomName}</h3>
          <p className="text-gray-600 dark:text-gray-400">{randomEmail}</p>
        </div>
      </div>
    </div>
  );
};

// کامپوننت UserCard جدید برای نمایش داده‌های API
interface UserCardProps {
  user: User;
  isSelected?: boolean;
  isCtrlPressed?: boolean;
  onUserClick?: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ 
  user, 
  isSelected = false, 
  isCtrlPressed = false, 
  onUserClick 
}) => {
  const Colors = [
    "blue", "green", "purple", "pink", "indigo", "teal", "orange", "red"
  ] as const;
  
  // انتخاب رنگ بر اساس ID کاربر (ثابت برای هر کاربر)
  const colorIndex = user.id % Colors.length;
  const userColor = Colors[colorIndex];

  const borderColorClasses: Record<typeof Colors[number], string> = {
    blue: "border-blue-300 dark:border-blue-700",
    green: "border-green-300 dark:border-green-700",
    purple: "border-purple-300 dark:border-purple-700",
    pink: "border-pink-300 dark:border-pink-700",
    indigo: "border-indigo-300 dark:border-indigo-700",
    teal: "border-teal-300 dark:border-teal-700",
    orange: "border-orange-300 dark:border-orange-700",
    red: "border-red-300 dark:border-red-700"
  };

  const bgColorClasses: Record<typeof Colors[number], string> = {
    blue: "bg-blue-100 dark:bg-blue-900",
    green: "bg-green-100 dark:bg-green-900",
    purple: "bg-purple-100 dark:bg-purple-900",
    pink: "bg-pink-100 dark:bg-pink-900",
    indigo: "bg-indigo-100 dark:bg-indigo-900",
    teal: "bg-teal-100 dark:bg-teal-900",
    orange: "bg-orange-100 dark:bg-orange-900",
    red: "bg-red-100 dark:bg-red-900"
  };

  const textColorClasses: Record<typeof Colors[number], string> = {
    blue: "text-blue-800 dark:text-blue-200",
    green: "text-green-800 dark:text-green-200",
    purple: "text-purple-800 dark:text-purple-200",
    pink: "text-pink-800 dark:text-pink-200",
    indigo: "text-indigo-800 dark:text-indigo-200",
    teal: "text-teal-800 dark:text-teal-200",
    orange: "text-orange-800 dark:text-orange-200",
    red: "text-red-800 dark:text-red-200"
  };

  return (
    <div 
      className={`border-2 border-solid p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer
        ${isSelected 
          ? 'bg-blue-100 dark:bg-blue-900/50 border-blue-500 dark:border-blue-400' 
          : `${borderColorClasses[userColor]} bg-white dark:bg-gray-800`
        }
        ${isCtrlPressed ? 'hover:bg-blue-50 dark:hover:bg-blue-900/30' : ''}
      `}
      onClick={() => onUserClick?.(user)}
    >
      <div className="flex items-start space-x-4 rtl:space-x-reverse">
        {/* تصویر کاربر */}
        <div className="shrink-0">
          {user.image ? (
            <img 
              src={user.image} 
              alt={`${user.firstName} ${user.lastName}`}
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
            />
          ) : (
            <div className={`w-16 h-16 rounded-full ${bgColorClasses[userColor]} flex items-center justify-center border-2 ${borderColorClasses[userColor]}`}>
              <span className={`text-2xl font-bold ${textColorClasses[userColor]}`}>
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* اطلاعات کاربر */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
              {user.firstName} {user.lastName}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${bgColorClasses[userColor]} ${textColorClasses[userColor]} shrink-0 ml-2`}>
              ID: {user.id}
            </span>
          </div>
          
          <div className="space-y-1 text-sm">
            <p className="text-gray-600 dark:text-gray-400 flex items-center">
              <span className="mr-2 shrink-0">📧</span>
              <span className="truncate">{user.email}</span>
            </p>
            
            <p className="text-gray-600 dark:text-gray-400 flex items-center">
              <span className="mr-2 shrink-0">📱</span>
              <span className="truncate">{user.phone}</span>
            </p>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse text-gray-500 dark:text-gray-500 flex-wrap">
              <span className="flex items-center shrink-0">
                <span className="mr-1">🎂</span>
                <span>{user.age} سال</span>
              </span>
              <span className="flex items-center shrink-0">
                <span className="mr-1">{user.gender === 'male' ? '👨' : '👩'}</span>
                <span>{user.gender === 'male' ? 'مرد' : 'زن'}</span>
              </span>
            </div>

            {user.company && (
              <p className="text-gray-600 dark:text-gray-400 flex items-center mt-2">
                <span className="mr-2 shrink-0">🏢</span>
                <span className="truncate">{user.company.title} در {user.company.name}</span>
              </p>
            )}

            {user.address && (
              <p className="text-gray-600 dark:text-gray-400 flex items-center">
                <span className="mr-2 shrink-0">📍</span>
                <span className="truncate">{user.address.city}, {user.address.state}</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// کامپوننت UserDetail Modal
interface UserDetailModalProps {
  user: User | null;
  onClose: () => void;
}

export const UserDetailModal: React.FC<UserDetailModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            جزئیات کاربر
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* تصویر */}
            <div className="shrink-0 text-center">
              {user.image ? (
                <img 
                  src={user.image} 
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600 mx-auto"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center border-4 border-blue-300 dark:border-blue-600 mx-auto">
                  <span className="text-4xl font-bold text-blue-800 dark:text-blue-200">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* اطلاعات */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">ID: {user.id}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📧 اطلاعات تماس</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <strong>ایمیل:</strong> {user.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>تلفن:</strong> {user.phone}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">👤 اطلاعات شخصی</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <strong>سن:</strong> {user.age} سال
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>جنسیت:</strong> {user.gender === 'male' ? 'مرد' : 'زن'}
                  </p>
                </div>

                {user.company && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">🏢 اطلاعات شغلی</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <strong>شرکت:</strong> {user.company.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <strong>سمت:</strong> {user.company.title}
                    </p>
                  </div>
                )}

                {user.address && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📍 آدرس</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      <strong>شهر:</strong> {user.address.city}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>ایالت:</strong> {user.address.state}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};