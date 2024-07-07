document.addEventListener('DOMContentLoaded', function() {
    const addTaskForm = document.querySelector('.add-task-form');
    const cancelTaskBtn = document.getElementById('cancel-task-btn');

    addTaskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(event);
    });

    cancelTaskBtn.addEventListener('click', function() {
        togglePopup('add-task-popup');
    });

    function addTask(event) {
        event.preventDefault();
        const taskName = document.getElementById('tname').value.trim();
        const taskDesc = document.getElementById('tdesc').value.trim();
        const taskPriority = document.getElementById('tpriority').value.trim();
        const taskCategory = document.getElementById('tcategory').value.trim();
        const taskAssignee = document.getElementById('tasignee').value.trim();

        if (taskName && taskDesc && taskPriority && taskCategory && taskAssignee) {
            const taskContainer = document.createElement('div');
            taskContainer.classList.add('task');
            taskContainer.innerHTML = `
                <h4>${taskName}</h4>
                <p>${taskDesc}</p>
                <p>Priority: ${taskPriority}</p>
                <p>Category: ${taskCategory}</p>
                <p>Assignee: ${taskAssignee}</p>
            `;

            document.getElementById('task-todo').appendChild(taskContainer);

            addTaskForm.reset();
            togglePopup('add-task-popup');
        }
    }

    function togglePopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup.style.display === 'flex') {
            popup.style.display = 'none';
        } else {
            popup.style.display = 'flex';
            popup.style.justifyContent = 'center';
            popup.style.alignItems = 'center';
        }
    }

    // Attach togglePopup function to global scope to be accessible from HTML
    window.togglePopup = togglePopup;
});
