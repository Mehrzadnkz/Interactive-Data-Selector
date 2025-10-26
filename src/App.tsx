import { useState, useEffect, useCallback } from 'react';
import Header from '../public/components/header/header';
import Footer from '../public/components/footer/footer';
import { userAPI, type User } from '../public/api/api';
import { UserCard, UserDetailModal } from '../public/components/functions/functions';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userLimit, setUserLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selection states
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isCtrlPressed, setIsCtrlPressed] = useState<boolean>(false);
  const [showSelectedOnly, setShowSelectedOnly] = useState<boolean>(false);
  const [selectedUserForDetail, setSelectedUserForDetail] = useState<User | null>(null);
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  // Initial loading timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Keyboard event listeners for Ctrl key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Control') {
        setIsCtrlPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Control') {
        setIsCtrlPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Fetch users function
  const fetchUsers = useCallback(async (limit: number, query?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      if (query && query.trim()) {
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
  }, []);

  // Handle UserCard click
  const handleUserClick = useCallback((user: User) => {
    if (isCtrlPressed) {
      // Selection mode - toggle user selection
      const isAlreadySelected = selectedUsers.includes(user.id);
      if (isAlreadySelected) {
        setSelectedUsers(prev => prev.filter(id => id !== user.id));
      } else {
        setSelectedUsers(prev => [...prev, user.id]);
      }
    } else {
      // Detail mode - show user details modal
      setSelectedUserForDetail(user);
    }
  }, [isCtrlPressed, selectedUsers]);

  // Close detail modal
  const closeDetailModal = () => {
    setSelectedUserForDetail(null);
  };

  // Toggle show selected users
  const toggleShowSelected = () => {
    setShowSelectedOnly(!showSelectedOnly);
  };

  // Clear all selections
  const clearSelections = () => {
    setSelectedUsers([]);
    setShowSelectedOnly(false);
  };

  // Load data on mount or when dependencies change
  useEffect(() => {
    if (!initialLoading) {
      fetchUsers(userLimit);
    }
  }, [userLimit, fetchUsers, initialLoading]);

  // Search function
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    // Update URL
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

  // Refresh function
  const refreshUsers = async () => {
    await fetchUsers(userLimit, searchQuery);
  };

  // Handle limit change
  const handleLimitChange = (newLimit: number) => {
    setUserLimit(newLimit);
    
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('limit', newLimit.toString());
    if (searchQuery.trim()) {
      url.searchParams.set('search', searchQuery);
    }
    window.history.pushState({}, '', url.toString());
  };

  // Load from URL on initial load
  useEffect(() => {
    const url = new URL(window.location.href);
    const urlSearch = url.searchParams.get('search') || '';
    const urlLimit = parseInt(url.searchParams.get('limit') || '10');
    
    setSearchQuery(urlSearch);
    setUserLimit(urlLimit);
  }, []);

  // Filter displayed users
  const displayedUsers = showSelectedOnly 
    ? users.filter(user => selectedUsers.includes(user.id))
    : users;

  // Initial loading screen
  if (initialLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Interactive Data Selector
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            در حال بارگذاری...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-x-hidden">
      {/* Header */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={(q: string) => setSearchQuery(q)}
        onSearch={handleSearch}
        userCount={users.length}
        userLimit={userLimit}
        setUserLimit={handleLimitChange}
      />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Ctrl+Click Info */}
        <div className={`mb-6 p-4 rounded-lg border-2 transition-all ${
          isCtrlPressed 
            ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-600' 
            : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        }`}>
          <p className="text-center text-sm font-medium">
            <span className={`transition-colors ${
              isCtrlPressed ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'
            }`}>
              {isCtrlPressed ? '🎯 حالت انتخاب فعال - روی کاربران کلیک کنید' : '💡 Ctrl را نگه دارید و روی کاربران کلیک کنید'}
            </span>
          </p>
        </div>

        {/* Selection Actions */}
        {selectedUsers.length > 0 && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-green-700 dark:text-green-300 font-medium">
                  ✅ {selectedUsers.length} کاربر انتخاب شده
                </span>
                <button
                  onClick={toggleShowSelected}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  {showSelectedOnly ? 'نمایش همه' : 'نمایش انتخاب شده‌ها'}
                </button>
              </div>
              <button
                onClick={clearSelections}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                پاک کردن انتخاب‌ها
              </button>
            </div>
          </div>
        )}

        {/* Refresh Button */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={refreshUsers}
              disabled={loading}
              className="px-6 py-3 bg-linear-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg 
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
            {displayedUsers.map((user) => (
              <UserCard 
                key={user.id} 
                user={user}
                isSelected={selectedUsers.includes(user.id)}
                isCtrlPressed={isCtrlPressed}
                onUserClick={handleUserClick}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && displayedUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {showSelectedOnly ? 'هیچ کاربری انتخاب نشده' : 'کاربری یافت نشد'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {showSelectedOnly 
                ? 'کاربری را با Ctrl+کلیک انتخاب کنید' 
                : 'جستجوی دیگری امتحان کنید یا فیلترها را تغییر دهید'
              }
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* User Detail Modal */}
      {selectedUserForDetail && (
        <UserDetailModal
          user={selectedUserForDetail}
          onClose={closeDetailModal}
        />
      )}
    </div>
  );
}

export default App;
