import { getTodos, toggleTodoComplete, type Todo } from '../../DB';

export function Show_Todos() {
    const MainElement: HTMLElement | null = document.querySelector('main');
    if (MainElement) {
        MainElement.classList.add('flex', 'justify-center', 'flex-col', 'flex-grow');
        MainElement.innerHTML = `
            <div class="max-w-4xl mx-auto p-4">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold">My Todos</h2>
                    <button id="back-btn" class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">Back to Add</button>
                </div>
                <div id="todos-container">
                    <!-- Todos will be loaded here -->
                </div>
            </div>
        `;
        
        setupEventListeners();
        loadTodos();
    }
}

function setupEventListeners() {
    const backBtn = document.getElementById('back-btn') as HTMLButtonElement;
    
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.location.href = '/';
        });
    }
}

async function loadTodos() {
    const container = document.getElementById('todos-container') as HTMLDivElement;
    const todos = await getTodos();
    
    if (todos.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <p class="text-gray-500 text-lg">No todos yet!</p>
                <p class="text-gray-400">Add your first todo to get started.</p>
            </div>
        `;
        return;
    }
    
    const todoCards = todos.map(todo => createTodoCard(todo)).join('');
    container.innerHTML = todoCards;
    
    // Add event listeners for toggle buttons
    todos.forEach(todo => {
        const toggleBtn = document.getElementById(`toggle-${todo.ID}`) as HTMLButtonElement;
        if (toggleBtn) {
            toggleBtn.addEventListener('click', async () => {
                await toggleTodoComplete(todo.ID);
                await loadTodos(); // Reload todos to update UI
            });
        }
    });
}

function createTodoCard(todo: Todo): string {
    const completedClass = todo.Completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200';
    const titleClass = todo.Completed ? 'line-through text-gray-500' : 'text-gray-800';
    const checkIcon = todo.Completed ? '✅' : '⭕';
    const buttonText = todo.Completed ? 'Mark Incomplete' : 'Mark Complete';
    const buttonClass = todo.Completed ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700';
    
    return `
        <div class="border rounded-lg p-4 mb-4 ${completedClass} transition-all duration-200">
            <div class="flex items-start justify-between">
                <div class="flex-grow">
                    <div class="flex items-center gap-2 mb-2">
                        <span class="text-xl">${checkIcon}</span>
                        <h3 class="text-lg font-semibold ${titleClass}">${todo.Title}</h3>
                        <span class="text-xs text-gray-400">#${todo.ID}</span>
                    </div>
                    ${todo.Description ? `<p class="text-gray-600 ml-7">${todo.Description}</p>` : ''}
                </div>
                <button 
                    id="toggle-${todo.ID}" 
                    class="${buttonClass} text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                >
                    ${buttonText}
                </button>
            </div>
        </div>
    `;
}