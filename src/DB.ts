// Todo interface for type safety
interface Todo {
    ID: number;
    Title: string;
    Description: string;
    Completed: boolean;
}

const API_BASE_URL = 'http://localhost:3001/api';

async function initializeTodos(): Promise<void> {
    // Server handles file initialization automatically
    console.log("Using file-based storage via API ✔");
}

async function getTodos(): Promise<Todo[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/todos`);
        if (!response.ok) {
            throw new Error('Failed to fetch todos from file');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching todos from file:', error);
        return [];
    }
}

async function addTodo(title: string, description: string = ""): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to add todo to file');
        }
        
        await response.json(); // Get the response but don't store it
        console.log(`New todo "${title}" added to file successfully ✔`);
        return true;
    } catch (error) {
        console.error('Error adding todo to file:', error);
        return false;
    }
}

async function deleteTodo(id: number): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete todo from file');
        }
        
        console.log(`Todo with ID ${id} deleted from file successfully ✔`);
        return true;
    } catch (error) {
        console.error('Error deleting todo from file:', error);
        return false;
    }
}

async function updateTodo(id: number, title: string, description: string): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to update todo in file');
        }
        
        console.log(`Todo with ID ${id} updated in file successfully ✔`);
        return true;
    } catch (error) {
        console.error('Error updating todo in file:', error);
        return false;
    }
}

async function toggleTodoComplete(id: number): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/todos/${id}/toggle`, {
            method: 'PATCH',
        });
        
        if (!response.ok) {
            throw new Error('Failed to toggle todo in file');
        }
        
        const updatedTodo = await response.json();
        console.log(`Todo with ID ${id} toggled to ${updatedTodo.Completed ? 'completed' : 'incomplete'} in file ✔`);
        return true;
    } catch (error) {
        console.error('Error toggling todo in file:', error);
        return false;
    }
}

// Export functions for use in other files
export type { Todo };
export { addTodo, getTodos, initializeTodos, deleteTodo, updateTodo, toggleTodoComplete };

// Initialize on load
initializeTodos();

// استفاده از فانکشن جدید - فقط title می‌دهیم

const allTodos = getTodos();
console.log("All Todos:", allTodos);