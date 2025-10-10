import { addTodo } from '../../DB';

export function Add_Todo() {
    const MainElement: HTMLElement | null = document.querySelector('main');
    if (MainElement) {
        MainElement.classList.add('flex', 'justify-center', 'flex-col', 'flex-grow');
        MainElement.innerHTML = `
            <div class="max-w-4xl mx-auto p-4">
                <h2 class="text-2xl font-bold mb-4">Add Todo</h2>
                <form id="add-todo-form" class="space-y-4">
                    <div>
                        <input type="text" id="todo-title" class="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none" placeholder="Enter todo title *" required />
                    </div>
                    <div>
                        <textarea id="todo-description" class="w-full border border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none resize-none" rows="3" placeholder="Enter description (optional)"></textarea>
                    </div>
                    <div class="flex gap-3">
                        <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">Add Todo</button>
                        <button type="button" id="show-todos-btn" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200">Show Todos</button>
                    </div>
                </form>
                <div id="success-message" class="hidden mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"></div>
            </div>
        `;
        
        // Add event listeners
        setupEventListeners();
    }
}

function setupEventListeners() {
    const form = document.getElementById('add-todo-form') as HTMLFormElement;
    const showTodosBtn = document.getElementById('show-todos-btn') as HTMLButtonElement;
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleAddTodo();
        });
    }
    
    if (showTodosBtn) {
        showTodosBtn.addEventListener('click', () => {
            window.location.href = '/todos';
        });
    }
}

async function handleAddTodo() {
    const titleInput = document.getElementById('todo-title') as HTMLInputElement;
    const descriptionInput = document.getElementById('todo-description') as HTMLTextAreaElement;
    const successMessage = document.getElementById('success-message') as HTMLDivElement;
    
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    
    if (title) {
        const success = await addTodo(title, description);
        
        if (success) {
            // Show success message
            successMessage.textContent = `Todo "${title}" added to file successfully!`;
            successMessage.className = 'mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg';
            successMessage.classList.remove('hidden');
            
            // Clear form
            titleInput.value = '';
            descriptionInput.value = '';
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 3000);
        } else {
            successMessage.textContent = `Failed to add todo to file. Please try again.`;
            successMessage.className = 'mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg';
            successMessage.classList.remove('hidden');
        }
    }
}