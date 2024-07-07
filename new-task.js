const togglePopup = function(popupId) {
    const popup = document.getElementById(popupId);
    if (popup.style.display === 'flex') {
        popup.style.display = 'none';
    } else {
        popup.style.display = 'flex';
        popup.style.justifyContent = 'center';
        popup.style.alignItems = 'center';
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const addTaskForm = document.querySelector('.add-task-form');
    const cancelTaskBtn = document.getElementById('cancel-task-btn');

    addTaskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addTask();
    });

    cancelTaskBtn.addEventListener('click', function() {
        togglePopup('add-task-popup');
    });

    function addTask() {
        const taskName = document.getElementById('tname').value;
        const taskDesc = document.getElementById('tdesc').value;
        const taskPriority = document.getElementById('tpriority').value;
        const taskCategory = document.getElementById('tcategory').value;
        const taskAssignee = document.getElementById('tasignee').value;

        if (!(taskName.length && taskDesc.length 
            && taskPriority.length && taskCategory.length
             && taskAssignee.length)) return;

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

    window.togglePopup = togglePopup;
});
