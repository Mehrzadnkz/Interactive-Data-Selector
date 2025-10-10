const express = require('express');
const cors = require('cors');
const path = require('path');
const {
    initializeTodos,
    getTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodoComplete
} = require('./file-manager.cjs');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// API Routes

// GET /api/todos - Get all todos from file
app.get('/api/todos', (req, res) => {
    try {
        const todos = getTodos();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos from file' });
    }
});

// POST /api/todos - Add new todo to file
app.post('/api/todos', (req, res) => {
    try {
        const { title, description = "" } = req.body;
        
        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const newTodo = addTodo(title, description);
        
        if (newTodo) {
            res.status(201).json(newTodo);
        } else {
            res.status(500).json({ error: 'Failed to add todo to file' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to add todo' });
    }
});

// PUT /api/todos/:id - Update todo in file
app.put('/api/todos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const updatedTodo = updateTodo(id, title, description);

        if (updatedTodo) {
            res.json(updatedTodo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

// PATCH /api/todos/:id/toggle - Toggle todo completion in file
app.patch('/api/todos/:id/toggle', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedTodo = toggleTodoComplete(id);

        if (updatedTodo) {
            res.json(updatedTodo);
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to toggle todo' });
    }
});

// DELETE /api/todos/:id - Delete todo from file
app.delete('/api/todos/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const success = deleteTodo(id);

        if (success) {
            res.json({ message: 'Todo deleted successfully from file' });
        } else {
            res.status(404).json({ error: 'Todo not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 File-based Todo API running on http://localhost:${PORT}`);
    console.log(`📁 Todos file: ${path.join(__dirname, 'public', 'DB', 'Todos.json')}`);
    console.log('📋 API endpoints:');
    console.log('  GET    /api/todos          - Get all todos');
    console.log('  POST   /api/todos          - Add new todo');
    console.log('  PUT    /api/todos/:id      - Update todo');
    console.log('  PATCH  /api/todos/:id/toggle - Toggle completion');
    console.log('  DELETE /api/todos/:id      - Delete todo');
});