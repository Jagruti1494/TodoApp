const apiUrl = 'http://localhost:3000/todos';

document.addEventListener('DOMContentLoaded', () => {
    fetchTodos();
});

function fetchTodos() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(todos => {
            const todosContainer = document.getElementById('todos-container');
            todosContainer.innerHTML = '';
            todos.forEach(todo => {
                const todoItem = document.createElement('div');
                todoItem.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                todoItem.innerHTML = `
                    <span>${todo.title}</span>
                    <div class="todo-buttons">
                        <button onclick="toggleComplete('${todo._id}', ${todo.completed})">
                            ${todo.completed ? 'Uncomplete' : 'Complete'}
                        </button>
                        <button onclick="deleteTodo('${todo._id}')">Delete</button>
                    </div>
                `;
                todosContainer.appendChild(todoItem);
            });
        })
        .catch(error => console.error('Error fetching todos:', error));
}

function addTodo() {
    const newTodoInput = document.getElementById('new-todo');
    const title = newTodoInput.value.trim();

    if (title) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        })
            .then(response => response.json())
            .then(todo => {
                fetchTodos();
                newTodoInput.value = '';
            })
            .catch(error => console.error('Error adding todo:', error));
    }
}

function toggleComplete(id, currentStatus) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !currentStatus }),
    })
        .then(response => response.json())
        .then(() => {
            fetchTodos();
        })
        .catch(error => console.error('Error toggling todo status:', error));
}

function deleteTodo(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(() => {
            fetchTodos();
        })
        .catch(error => console.error('Error deleting todo:', error));
}
