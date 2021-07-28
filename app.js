const tasks = [
    {
        _id: '5d2ca9e2e03d40b326596aa7',
        completed: true,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095c1288e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
    {
        _id: '5d2ca9e2e03d40b3232496aa7',
        completed: true,
        body:
            'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
        title: 'Eu ea incididunt sunt consectetur fugiat non.',
    },
    {
        _id: '5d2ca9e29c8a94095564788e0',
        completed: false,
        body:
            'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
        title:
            'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
    },
];

(function (arrOfTasks) {
    const objOfTasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});


    // Elements UI
    const ul = document.querySelector('.list-group');
    const form = document.forms['addTask'];
    const inputTitle = form.title;
    const inputBody = form.body;

    // App logic + events
    renderAllTasks(objOfTasks);
    form.addEventListener('submit', onFormSubmitHandler);
    ul.addEventListener('click', onDeleteHandler);

    function renderAllTasks(taskList) {
        if (!taskList) {
            console.error('Please, enter taskList!');
            return;
        }

        const fragment = document.createDocumentFragment();
        Object.values(taskList).forEach(task => {
            const li = listItemTemplate(task);
            fragment.appendChild(li);
        })

        ul.appendChild(fragment);

    }

    function listItemTemplate({_id, title, body} = {}) {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'flex-wrap', 'mt-2');
        li.setAttribute('data-task-id', _id);

        const taskTitle = document.createElement('span');
        taskTitle.textContent = title;
        taskTitle.style.fontWeight = '700';

        const deleteTaskButton = document.createElement('button');
        deleteTaskButton.textContent = 'delete task';
        deleteTaskButton.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

        const taskDescription = document.createElement('p');
        taskDescription.textContent = body;
        taskDescription.classList.add('mt-2', 'w-100');

        li.appendChild(taskTitle);
        li.appendChild(deleteTaskButton);
        li.appendChild(taskDescription);

        return li;
    }

    function onFormSubmitHandler(e) {
        e.preventDefault();
        const titleValue = inputTitle.value;
        const bodyValue = inputBody.value;

        const task = createNewTask(titleValue, bodyValue);
        const listItem = listItemTemplate(task);
        ul.insertAdjacentElement('afterbegin', listItem);
        form.reset();
    }

    function createNewTask(title, body) {
        const newTask = {
            title,
            body,
            completed: false,
            _id: `task-${Math.random()}`,
        };

        objOfTasks[newTask._id] = newTask;

        return {...newTask};
    }

    function deleteTask(id) {
        const {title} = objOfTasks[id];
        const isConfirm = confirm(`Are you sure you want delete task: ${title}`);
        if (!isConfirm) return isConfirm;
        delete objOfTasks[id];
        return isConfirm;

    }

    function deleteTaskFromHTML(confirmed, element) {
        if (!confirmed) return;
        element.remove();
    }

    function onDeleteHandler({target}) {
        if (target.classList.contains('delete-btn')) {
            const parent = target.closest('[data-task-id]');
            const id = parent.dataset.taskId;
            const confirmed = deleteTask(id);
            deleteTaskFromHTML(confirmed, parent);
        }
    }
})(tasks);