import { useState, useEffect, useCallback } from 'react';
import { UserCard } from "./../public/components/functions/functions";
import { userAPI, type User } from "./../public/api/api";
import Header from "./../public/components/header/header";
import Footer from "./../public/components/footer/footer";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userLimit, setUserLimit] = useState(10);

  // دریافت کاربران از API
  const fetchUsers = useCallback(async (limit: number = userLimit, query: string = '') => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (query.trim()) {
        response = await userAPI.searchUsers(query);
      } else {
        response = await userAPI.getUsers(limit);
      }
      
      setUsers(response.users);
    } catch (err) {
      setError('خطا در دریافت اطلاعات کاربران');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  }, [userLimit]);

  // بارگذاری اولیه
  useEffect(() => {
    fetchUsers(userLimit);
  }, [fetchUsers, userLimit]);

  // تغییر تعداد کاربران
  useEffect(() => {
    if (!searchQuery.trim()) {
      fetchUsers(userLimit);
    }
  }, [userLimit, searchQuery, fetchUsers]);

  // جستجوی کاربران
  const handleSearch = async (query: string) => {
    // به‌روزرسانی URL
    const url = new URL(window.location.href);
    if (query.trim()) {
      url.searchParams.set('search', query);
    } else {
      url.searchParams.delete('search');
    }
    url.searchParams.set('limit', userLimit.toString());
    window.history.pushState({}, '', url.toString());
    
    await fetchUsers(userLimit, query);
  };

  // تابع refresh
  const refreshUsers = async () => {
    setSearchQuery('');
    
    // پاک کردن URL parameters
    const url = new URL(window.location.href);
    url.searchParams.delete('search');
    url.searchParams.set('limit', userLimit.toString());
    window.history.pushState({}, '', url.toString());
    
    await fetchUsers(userLimit);
  };

  // تابع تغییر limit
  const handleLimitChange = (newLimit: number) => {
    setUserLimit(newLimit);
    
    // به‌روزرسانی URL
    const url = new URL(window.location.href);
    url.searchParams.set('limit', newLimit.toString());
    if (searchQuery.trim()) {
      url.searchParams.set('search', searchQuery);
    }
    window.history.pushState({}, '', url.toString());
  };

  // بارگذاری از URL در ابتدا
  useEffect(() => {
    const url = new URL(window.location.href);
    const urlSearch = url.searchParams.get('search') || '';
    const urlLimit = parseInt(url.searchParams.get('limit') || '10');
    
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
    if (urlLimit && urlLimit !== 10) {
      setUserLimit(urlLimit);
    }
  }, []); // فقط یک بار در ابتدا اجرا بشه

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 dark:bg-linear-to-br dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 overflow-x-hidden">
      {/* Header */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        userCount={users.length}
        userLimit={userLimit}
        setUserLimit={handleLimitChange}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">`
      <div className="w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={refreshUsers}
              disabled={loading}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg 
                       hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '� در حال به‌روزرسانی...' : '� تازه‌سازی'}
            </button>
            
            <button
              onClick={() => handleSearch(searchQuery)}
              disabled={loading}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg 
                       hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '⚡ در حال جستجو...' : '⚡ جستجوی مجدد'}
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
            <p className="text-red-700 dark:text-red-400 text-center font-medium">
              ❌ {error}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                در حال بارگذاری کاربران...
              </p>
            </div>
          </div>
        )}

        {/* Users Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && users.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              کاربری یافت نشد
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              لطفاً عبارت جستجوی دیگری امتحان کنید
            </p>
          </div>
        )}

        {/* Footer Stats */}
        {!loading && users.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-lg">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                📊 مجموع: {users.length} کاربر
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                🔍 جستجو: "{searchQuery || 'همه کاربران'}"
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ⚙️ حداکثر: {userLimit}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
