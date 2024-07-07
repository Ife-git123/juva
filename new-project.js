document.addEventListener('DOMContentLoaded', function() {
    const addProjectForm = document.querySelector('.add-project-form');
    const projectList = document.getElementById('project-list');
    const projectTitle = document.getElementById('project-title');
    const dashboardTitle = document.getElementById('dashboard-title');
    const tasksData = {};  // Object to store tasks for each project

    addProjectForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const projectName = document.getElementById('pname').value.trim();
        const projectDesc = document.getElementById('pdesc').value.trim();

        if (projectName) {
            // Add the project to the project list
            const newProjectLink = document.createElement('a');
            newProjectLink.href = '#';
            newProjectLink.className = 'project-link';
            newProjectLink.dataset.project = projectName;
            newProjectLink.textContent = projectName;
            newProjectLink.addEventListener('click', function() {
                loadProject(projectName);
            });

            const newProjectListItem = document.createElement('li');
            newProjectListItem.appendChild(newProjectLink);
            projectList.insertBefore(newProjectListItem, projectList.children[projectList.children.length - 1]);

            // Initialize tasks for the new project
            tasksData[projectName] = { todo: [], inprogress: [], completed: [] };

            // Reset form and close popup
            addProjectForm.reset();
            togglePopup('add-project-popup');
        }
    });

    function loadProject(projectName) {
        projectTitle.textContent = projectName;
        dashboardTitle.textContent = `${projectName} Dashboard`;
        // Load specific tasks for the selected project
        renderTasks(projectName);
    }

    function renderTasks(projectName) {
        const taskColumns = {
            'todo': document.getElementById('task-todo'),
            'inprogress': document.getElementById('task-inprogress'),
            'completed': document.getElementById('task-completed')
        };

        // Clear existing tasks
        for (const column in taskColumns) {
            taskColumns[column].innerHTML = '';
        }

        // Render tasks for the current project
        const tasks = tasksData[projectName];
        for (const status in tasks) {
            tasks[status].forEach(task => {
                const taskElement = createTaskElement(task);
                taskColumns[status].appendChild(taskElement);
            });
        }
    }

    function createTaskElement(task) {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';
        taskElement.innerHTML = `
            <h4>${task.name}</h4>
            <p>${task.desc}</p>
            <p>Priority: ${task.priority}</p>
            <p>Category: ${task.category}</p>
            <p>Assignee: ${task.assignee}</p>
        `;
        return taskElement;
    }

    function togglePopup(popupId) {
        const popup = document.getElementById(popupId);
        popup.classList.toggle('active');
    }

    // Attach togglePopup function to global scope to be accessible from HTML
    window.togglePopup = togglePopup;

    // Add function to add tasks to the current project
    window.addTask = function(event) {
        event.preventDefault();
        const taskName = document.getElementById('tname').value.trim();
        const taskDesc = document.getElementById('tdesc').value.trim();
        const taskPriority = document.getElementById('tpriority').value.trim();
        const taskCategory = document.getElementById('tcategory').value.trim();
        const taskAssignee = document.getElementById('tasignee').value.trim();

        const currentProject = projectTitle.textContent;

        if (taskName && currentProject) {
            const newTask = { name: taskName, desc: taskDesc, priority: taskPriority, category: taskCategory, assignee: taskAssignee };
            tasksData[currentProject].todo.push(newTask); // Add to 'To Do' column by default
            renderTasks(currentProject);

            // Reset form and close popup
            document.querySelector('.add-task-form').reset();
            togglePopup('add-task-popup');
        }
    }
});
