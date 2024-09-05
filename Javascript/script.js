document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const newTaskButton = document.getElementById('newTask');
    const taskList = document.querySelector('.task-list');
    const totalTasks = document.getElementById('total-tasks');
    const numbers = document.getElementById('numbers');
    const progressLine = document.getElementById('long-bar');

    let tasks = [];

    function updateTaskCount() {
        const completedTasks = tasks.filter(task => task.completed).length;
        totalTasks.textContent = tasks.length;
        numbers.textContent = `${completedTasks} / ${tasks.length}`;
        const progress = tasks.length === 0 ? 0 : (completedTasks / tasks.length) * 100;
        progressLine.style.width = `${progress}%`;
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('task-item');
            if (task.completed) {
                li.classList.add('completed');
            }
            li.innerHTML = `
                <input type="checkbox" class="complete-checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-text">${task.text}</span>
                <button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="delete-btn"><i class="fa-sharp fa-solid fa-trash"></i></button>
            `;

            // Toggle task completion
            li.querySelector('.complete-checkbox').addEventListener('change', () => {
                task.completed = !task.completed;
                renderTasks();
                updateTaskCount();
            });

            // Edit task
            li.querySelector('.edit-btn').addEventListener('click', () => {
                const newText = prompt("Edit your task:", task.text);
                if (newText !== null) {
                    task.text = newText.trim();
                    renderTasks();
                }
            });

            // Delete task
            li.querySelector('.delete-btn').addEventListener('click', () => {
                tasks.splice(index, 1);
                renderTasks();
                updateTaskCount();
            });

            taskList.appendChild(li);
        });
    }

    newTaskButton.addEventListener('click', (e) => {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText) {
            const newTask = { text: taskText, completed: false };
            tasks.push(newTask);
            renderTasks();
            updateTaskCount();
            taskInput.value = '';
        }
    });

    // Initial rendering to ensure any pre-existing tasks are displayed
    renderTasks();
});
