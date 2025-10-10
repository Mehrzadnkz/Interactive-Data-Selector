const fs = require('fs');
const path = require('path');

// Todo interface definition (for reference - JavaScript doesn't use interfaces)
// interface Todo {
//     ID: number;
//     Title: string;
//     Description: string;
//     Completed: boolean;
// }

const TODOS_FILE_PATH = path.join(__dirname, 'public', 'DB', 'Todos.json');

// Create directory if it doesn't exist
function ensureDirectoryExists() {
    const dir = path.dirname(TODOS_FILE_PATH);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log('Directory created successfully ✔');
    }
}

// Initialize todos file if it doesn't exist
function initializeTodos() {
    ensureDirectoryExists();
    
    if (!fs.existsSync(TODOS_FILE_PATH)) {
        const initialContent = [
            { ID: 1, Title: "Welcome Todo", Description: "Your first todo from file!", Completed: false }
        ];
        fs.writeFileSync(TODOS_FILE_PATH, JSON.stringify(initialContent, null, 2), 'utf8');
        console.log("Todos file created successfully ✔");
    } else {
        console.log("Todos file already exists ✔");
    }
}

// Read todos from file
function getTodos() {
    try {
        if (!fs.existsSync(TODOS_FILE_PATH)) {
            return [];
        }
        
        const data = fs.readFileSync(TODOS_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading todos:', error);
        return [];
    }
}

// Save todos to file
function saveTodos(todos) {
    try {
        ensureDirectoryExists();
        fs.writeFileSync(TODOS_FILE_PATH, JSON.stringify(todos, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error saving todos:', error);
        return false;
    }
}

// Get next available ID
function getNextId() {
    const todos = getTodos();
    
    if (todos.length === 0) {
        return 1;
    }
    
    // Find the highest ID and add 1
    const maxId = Math.max(...todos.map(todo => todo.ID));
    return maxId + 1;
}

// Add new todo
function addTodo(title, description = "") {
    try {
        const todos = getTodos();
        
        const newTodo = {
            ID: getNextId(),
            Title: title,
            Description: description,
            Completed: false
        };
        
        todos.push(newTodo);
        const success = saveTodos(todos);
        
        if (success) {
            console.log(`New todo "${title}" added successfully ✔`);
            return newTodo;
        }
        return null;
    } catch (error) {
        console.error('Error adding todo:', error);
        return null;
    }
}

// Delete todo by ID
function deleteTodo(id) {
    try {
        const todos = getTodos();
        const filteredTodos = todos.filter(todo => todo.ID !== id);
        
        if (filteredTodos.length < todos.length) {
            const success = saveTodos(filteredTodos);
            if (success) {
                console.log(`Todo with ID ${id} deleted successfully ✔`);
                return true;
            }
        }
        return false;
    } catch (error) {
        console.error('Error deleting todo:', error);
        return false;
    }
}

// Update todo
function updateTodo(id, title, description) {
    try {
        const todos = getTodos();
        const todoIndex = todos.findIndex(todo => todo.ID === id);
        
        if (todoIndex !== -1) {
            todos[todoIndex].Title = title;
            todos[todoIndex].Description = description;
            const success = saveTodos(todos);
            
            if (success) {
                console.log(`Todo with ID ${id} updated successfully ✔`);
                return todos[todoIndex];
            }
        }
        return null;
    } catch (error) {
        console.error('Error updating todo:', error);
        return null;
    }
}

// Toggle todo completion status
function toggleTodoComplete(id) {
    try {
        const todos = getTodos();
        const todoIndex = todos.findIndex(todo => todo.ID === id);
        
        if (todoIndex !== -1) {
            todos[todoIndex].Completed = !todos[todoIndex].Completed;
            const success = saveTodos(todos);
            
            if (success) {
                const status = todos[todoIndex].Completed ? 'completed' : 'incomplete';
                console.log(`Todo with ID ${id} toggled to ${status} ✔`);
                return todos[todoIndex];
            }
        }
        return null;
    } catch (error) {
        console.error('Error toggling todo:', error);
        return null;
    }
}

// Export functions
module.exports = {
    initializeTodos,
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodoComplete,
    saveTodos
};

// Initialize when required
initializeTodos();

// Test functions (comment out in production)
console.log('=== Testing File Operations ===');
addTodo("Learn Node.js File System");
addTodo("Build Todo with File Storage", "Implement CRUD operations with fs module");

const allTodos = getTodos();
console.log('All Todos:', JSON.stringify(allTodos, null, 2));