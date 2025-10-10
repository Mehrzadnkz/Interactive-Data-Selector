import { getTodos, deleteTodo, updateTodo, toggleTodoComplete, type Todo } from '../../DB';

export function Admin_Panel() {
    const MainElement: HTMLElement | null = document.querySelector('main');
    if (MainElement) {
        MainElement.classList.add('flex', 'justify-center', 'flex-col', 'flex-grow');
        MainElement.innerHTML = `
            <div class="max-w-6xl mx-auto p-4">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-red-600">🔧 Admin Panel</h2>
                    <button id="back-btn" class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">Back to Home</button>
                </div>
                <div id="admin-container">
                    <!-- Admin content will be loaded here -->
                </div>
            </div>
            
            <!-- Edit Modal -->
            <div id="edit-modal" class="hidden fixed inset-0 backdrop-blur-sm bg-opacity-50 items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <h3 class="text-lg font-bold mb-4">Edit Todo</h3>
                    <form id="edit-form">
                        <div class="mb-4">
                            <label class="block text-sm font-medium mb-2">Title:</label>
                            <input type="text" id="edit-title" class="w-full border border-gray-300 p-2 rounded-lg focus:border-blue-500 focus:outline-none" required />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium mb-2">Description:</label>
                            <textarea id="edit-description" class="w-full border border-gray-300 p-2 rounded-lg focus:border-blue-500 focus:outline-none resize-none" rows="3"></textarea>
                        </div>
                        <div class="flex gap-3">
                            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save</button>
                            <button type="button" id="cancel-edit" class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        setupEventListeners();
        loadAdminTodos();
    }
}

let currentEditId: number | null = null;

function setupEventListeners() {
    const backBtn = document.getElementById('back-btn') as HTMLButtonElement;
    const editModal = document.getElementById('edit-modal') as HTMLDivElement;
    const editForm = document.getElementById('edit-form') as HTMLFormElement;
    const cancelBtn = document.getElementById('cancel-edit') as HTMLButtonElement;
    
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = '/';
        });
    }
    
    if (editForm) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleUpdateTodo();
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            editModal.classList.add('hidden');
            editModal.classList.remove('flex');
            currentEditId = null;
        });
    }
    
    // Close modal when clicking outside
    editModal?.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.classList.add('hidden');
            editModal.classList.remove('flex');
            currentEditId = null;
        }
    });
}

async function loadAdminTodos() {
    const container = document.getElementById('admin-container') as HTMLDivElement;
    const todos = await getTodos();
    
    if (todos.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <p class="text-gray-500 text-lg">No todos to manage!</p>
                <a href="/" class="text-blue-600 hover:underline">Go add some todos first</a>
            </div>
        `;
        return;
    }
    
    const completedTodos = todos.filter(todo => todo.Completed);
    const incompleteTodos = todos.filter(todo => !todo.Completed);
    
    container.innerHTML = `
        <div class="grid md:grid-cols-2 gap-6">
            <div>
                <h3 class="text-lg font-semibold mb-4 text-yellow-600">📋 Incomplete Todos (${incompleteTodos.length})</h3>
                <div class="space-y-3">
                    ${incompleteTodos.map(todo => createAdminTodoCard(todo)).join('')}
                </div>
            </div>
            <div>
                <h3 class="text-lg font-semibold mb-4 text-green-600">✅ Completed Todos (${completedTodos.length})</h3>
                <div class="space-y-3">
                    ${completedTodos.map(todo => createAdminTodoCard(todo)).join('')}
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for all buttons
    todos.forEach(todo => {
        const toggleBtn = document.getElementById(`admin-toggle-${todo.ID}`) as HTMLButtonElement;
        const editBtn = document.getElementById(`admin-edit-${todo.ID}`) as HTMLButtonElement;
        const deleteBtn = document.getElementById(`admin-delete-${todo.ID}`) as HTMLButtonElement;
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', async () => {
                await toggleTodoComplete(todo.ID);
                await loadAdminTodos();
            });
        }
        
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                openEditModal(todo);
            });
        }
        
        if (deleteBtn) {
            deleteBtn.addEventListener('click', async () => {
                if (confirm(`Are you sure you want to delete "${todo.Title}"?`)) {
                    await deleteTodo(todo.ID);
                    await loadAdminTodos();
                }
            });
        }
    });
}

function createAdminTodoCard(todo: Todo): string {
    const statusColor = todo.Completed ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50';
    const titleClass = todo.Completed ? 'line-through text-gray-500' : 'text-gray-800';
    
    return `
        <div class="border rounded-lg p-4 ${statusColor}">
            <div class="flex justify-between items-start mb-3">
                <div class="flex-grow">
                    <h4 class="font-semibold ${titleClass}">${todo.Title} <span class="text-xs text-gray-400">#${todo.ID}</span></h4>
                    ${todo.Description ? `<p class="text-sm text-gray-600 mt-1">${todo.Description}</p>` : '<p class="text-xs text-gray-400 italic">No description</p>'}
                </div>
            </div>
            <div class="flex gap-2">
                <button 
                    id="admin-toggle-${todo.ID}" 
                    class="${todo.Completed ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'} text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                >
                    ${todo.Completed ? 'Mark Incomplete' : 'Complete'}
                </button>
                <button 
                    id="admin-edit-${todo.ID}" 
                    class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                >
                    Edit
                </button>
                <button 
                    id="admin-delete-${todo.ID}" 
                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors duration-200"
                >
                    Delete
                </button>
            </div>
        </div>
    `;
}

function openEditModal(todo: Todo) {
    currentEditId = todo.ID;
    const modal = document.getElementById('edit-modal') as HTMLDivElement;
    const titleInput = document.getElementById('edit-title') as HTMLInputElement;
    const descriptionInput = document.getElementById('edit-description') as HTMLTextAreaElement;
    
    titleInput.value = todo.Title;
    descriptionInput.value = todo.Description;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

async function handleUpdateTodo() {
    if (currentEditId === null) return;
    
    const titleInput = document.getElementById('edit-title') as HTMLInputElement;
    const descriptionInput = document.getElementById('edit-description') as HTMLTextAreaElement;
    const modal = document.getElementById('edit-modal') as HTMLDivElement;
    
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    
    if (title) {
        await updateTodo(currentEditId, title, description);
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        currentEditId = null;
        await loadAdminTodos();
    }
}