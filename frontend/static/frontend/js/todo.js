(function(){
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

    buildList();
})();