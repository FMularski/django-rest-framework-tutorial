(function(){
    buildList();

    function buildList(){
        const todoList = document.querySelector('ul#todo-list');

        fetch('/api/task-list/')
        .then(res => res.json())
        .then(resJson => {
            resJson.forEach(task => {
                todoList.innerHTML += 
                '<li class="todo-element">' + 
                    '<span class="todo-title ' + (task.completed ? 'stroke' : '') + '" task-id="' + task.pk + '">' + task.title + '</span>' + 
                    '<div class="buttons">' + 
                        '<button class="edit-btn btn btn-info" task-id="' + task.pk + '"><i class="fas fa-pen"></i></button>' + 
                        '<button class="delete-btn btn btn-danger" task-id="' + task.pk + '"><i class="fas fa-minus"></i></button>' + 
                    '</div>' + 
                '</li>';
            })
        })
        .then(() => {
            prepareEdit();
            prepareDelete();
            prepareStrike();
        });
    }

    const addBtn = document.querySelector('#add-btn');
    addBtn.addEventListener('click', function() {
        const todoList = document.querySelector('ul#todo-list');
        const inputField = document.querySelector('#add-input');
        const input = inputField.value;
        const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

        if(!input) return;

        fetch('/api/task-create/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'title': input})
        })
        .then(res => res.json())
        .then(task => {
            inputField.value = '';
            todoList.innerHTML = 
            '<li class="todo-element">' + 
                '<span class="todo-title ' + (task.completed ? 'stroke' : '') + '" task-id="' + task.pk + '">' + task.title + '</span>' + 
                '<div class="buttons">' + 
                    '<button class="edit-btn btn btn-info" task-id="' + task.pk + '"><i class="fas fa-pen"></i></button>' + 
                    '<button class="delete-btn btn btn-danger" task-id="' + task.pk + '"><i class="fas fa-minus"></i></button>' + 
                '</div>' + 
            '</li>' + todoList.innerHTML;
        })
        .then(() => {
            prepareEdit();
            prepareDelete();
            prepareStrike();
        });
    });

    function prepareEdit() {
        const editBtns = document.querySelectorAll('.edit-btn');

        editBtns.forEach(btn => {
            const id = btn.getAttribute('task-id');
            const title = btn.parentNode.parentNode.children[0];
            btn.addEventListener('click', () => {
                edit(id, title);
            })
        })
    }

    function edit(id, title) {
        const inputField = document.querySelector('#add-input');
        const input = inputField.value;
        const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

        if (!input) return;

        fetch('/api/task-update/' + id + '/', {
            method: 'PUT', 
            headers: {
                'X-CSRFToken': token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({'title': input})
        })
        .then(res => res.json())
        .then(task => {
            inputField.value = '';
            title.innerText = task.title;
        })
        .catch(err => {
            console.log(err);
        })
    }

    function prepareDelete() {
        const delBtns = document.querySelectorAll('.delete-btn');

        delBtns.forEach(btn => {
            const id = btn.getAttribute('task-id');
            const taskElement = btn.parentNode.parentNode;
            btn.addEventListener('click', () => {
                del(id, taskElement);
            })
        })
    }

    function del(id, taskElement) {
        const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

        fetch('/api/task-delete/' + id + '/', {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': token
            }
        })
        .then(() => {
            taskElement.remove();
        })
    }

    function prepareStrike() {
        const titles = document.querySelectorAll('.todo-title');
        titles.forEach(title => {
            title.addEventListener('click', () => {
                const id = title.getAttribute('task-id');
                title.classList.toggle('stroke');
                strike(id, title);
            })
        })
    }

    function strike(id, title) {
        const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

        fetch('/api/task-update/' + id + '/', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': token
            },
            body: JSON.stringify({
                'title': title.innerText, 
                'completed': title.classList.contains('stroke')
            })
        })
    }

})();