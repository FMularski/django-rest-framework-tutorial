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
                    '<span class="todo-title">' + task.title + '</span>' + 
                    '<div class="buttons">' + 
                        '<button class="edit-btn btn btn-info"><i class="fas fa-pen"></i></button>' + 
                        '<button class="delete-btn btn btn-danger"><i class="fas fa-minus"></i></button>' + 
                    '</div>' + 
                '</li>';
            })
        });
    }

    const addBtn = document.querySelector('#add-btn');
    addBtn.addEventListener('click', function() {
        const todoList = document.querySelector('ul#todo-list');
        const inputField = document.querySelector('#add-input');
        const input = inputField.value;
        const token = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

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
                '<span class="todo-title">' + task.title + '</span>' + 
                '<div class="buttons">' + 
                    '<button class="edit-btn btn btn-info"><i class="fas fa-pen"></i></button>' + 
                    '<button class="delete-btn btn btn-danger"><i class="fas fa-minus"></i></button>' + 
                '</div>' + 
            '</li>' + todoList.innerHTML;
        });
    });

})();