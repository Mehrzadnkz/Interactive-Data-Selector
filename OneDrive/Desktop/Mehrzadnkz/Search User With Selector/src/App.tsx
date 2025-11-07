import { useState } from 'react';
import { getList } from "./assets/auth/api/getlist";

interface User {
  id: number;
  username: string;
  email: string;
  ip: string;
}

function App() {
  // States
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [showSelected, setShowSelected] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayLimit, setDisplayLimit] = useState<number | null>(10);

  // Load all users from API
  if (users.length === 0) {
    getList(0).then(data => {
      setUsers(data);
      setFilteredUsers(data);
    });
  }

  // Search function
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (value.trim() === "") {
      setFilteredUsers(showSelected ? users.filter(u => selectedIds.includes(u.id)) : users);
    } else {
      const filtered = users.filter(user => 
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.ip.toLowerCase().includes(value.toLowerCase()) ||
        user.id.toString().includes(value)
      );
      setFilteredUsers(filtered);
    }
  };

  // Select/Deselect user
  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const showSelectedUsers = () => {
    setShowSelected(true);
    setFilteredUsers(users.filter(u => selectedIds.includes(u.id)));
  };

  const showAllUsers = () => {
    setShowSelected(false);
    setFilteredUsers(searchTerm ? users.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.ip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toString().includes(searchTerm)
    ) : users);
  };

  // Reset everything
  const resetAll = () => {
    setSelectedIds([]);
    setSearchTerm("");
    setShowSelected(false);
    setFilteredUsers(users);
    const searchInput = document.getElementById('search-input') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = "";
    }
  };

  // Connect search input via window event
  const windowWithSearch = window as typeof window & { searchListenerAttached?: boolean };
  if (!windowWithSearch.searchListenerAttached) {
    windowWithSearch.searchListenerAttached = true;
    window.addEventListener('userSearch', ((e: CustomEvent) => {
      handleSearch(e.detail);
    }) as EventListener);
  }

  // Limit displayed users
  const displayedUsers = displayLimit ? filteredUsers.slice(0, displayLimit) : filteredUsers;
  
  return (
    <div className="w-full min-h-full flex flex-col items-center gap-5 py-5 px-3">
      
      {/* Buttons */}
      <div className="w-full flex justify-center items-center gap-3 flex-wrap">
        
        {selectedIds.length > 0 && !showSelected && (
          <button 
            className="border-2 px-4 py-2 rounded-lg font-semibold bg-blue-600 text-white"
            onClick={showSelectedUsers}
          >
            نمایش انتخاب شده ({selectedIds.length})
          </button>
        )}
        
        {showSelected && (
          <button 
            className="border-2 px-4 py-2 rounded-lg font-semibold bg-green-600 text-white"
            onClick={showAllUsers}
          >
            نمایش همه
          </button>
        )}
        
        <div className="flex items-center gap-2 border-2 px-3 py-2 rounded-lg">
          <label className="font-semibold">تعداد:</label>
          <select 
            className="px-2 py-1 rounded cursor-pointer"
            value={displayLimit || 'all'}
            onChange={(e) => setDisplayLimit(e.target.value === 'all' ? null : Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="all">همه ({users.length})</option>
          </select>
        </div>
        
        <button 
          className="border-2 px-4 py-2 rounded-lg font-semibold bg-red-600 text-white"
          onClick={resetAll}
        >
          ریست
        </button>
      </div>
      
      {/* Info */}
      <div className="text-center border-2 px-4 py-2 rounded-lg" style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}>
        <p className="font-bold" style={{ color: 'var(--text-color)' }}>
          نمایش {displayedUsers.length} از {filteredUsers.length}
          {searchTerm && ` - جستجو: ${searchTerm}`}
        </p>
      </div>
      
      {/* Users Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {displayedUsers.map((user) => {
          const isSelected = selectedIds.includes(user.id);
          
          return (
            <div 
              key={user.id}
              className="p-3 border-2 rounded-lg cursor-pointer"
              style={{
                backgroundColor: isSelected ? '#3b82f6' : 'var(--card-bg)',
                color: isSelected ? '#ffffff' : 'var(--text-color)',
                borderColor: isSelected ? '#3b82f6' : 'var(--card-border)'
              }}
              onClick={() => toggleSelect(user.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold">ID: {user.id}</span>
                {isSelected && <span>✓</span>}
              </div>
              <div className="text-sm space-y-1">
                <p className="font-semibold">{user.username}</p>
                <p className="text-xs break-all">{user.email}</p>
                <p className="text-xs">{user.ip}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
