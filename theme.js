const theme = document.getElementById('theme');
const newItemInput = document.getElementById('addItem');
const todolist = document.querySelector('.content ul');
const itemLeft = document.querySelector('.item-left span');



theme.addEventListener('click', () => {
    document.querySelector('body').classList = [theme.checked ? 'theme-light' : 'theme-dark'];

});

newItemInput.addEventListener('keypress', (e) => {
    if (e.charCode === 13 && newItemInput.value.length > 0){
        createNewTodoItem(newItemInput.value);
        newItemInput.value = '';
    }
});

    function createNewTodoItem(text) {
    const elem = document.createElement('li');
        elem.classList.add('item');
        
    elem.innerHTML = `
    <label class="list-item" >
          <input type="checkbox" name="todoItem">
          <span class="checkmark"></span>
          <span class="text">${text}</span>
        </label>
        <span class="remove"></span>
        `;

        if (document.querySelector('.filter input[type="radio"]:checked').id == 'completed') {
            elem.classList.add('hidden');
        }
    todolist.append(elem);
    updateItemCount(1);
}

function updateItemCount(number){
    itemLeft.innerText = +itemLeft.innerText + number;
};

// remove item
function removeTodoitem (elem){
    elem.remove();
    updateItemCount(-1)
};


    todolist.addEventListener('click', (event) =>{
        if ( event.target.classList.contains('remove')) {
            removeTodoitem(event.target.parentElement);
        }
    });

    //clear complete

    document.querySelector('.clear').addEventListener('click', () => {
            document.querySelectorAll('.list-item input[type="checkbox"]:checked').forEach(item =>{
                removeTodoitem(item.closest('li'));
            });
    });

    //filter
    document.querySelectorAll('.filter input').forEach(radio => {
        radio.addEventListener('change', (e) => {
            filterTodoItems(e.target.id);
        });
    });
    
    function filterTodoItems(id) {
        const allItems = todolist.querySelectorAll('li');
    
        switch(id) {
            case 'all':
                allItems.forEach(item => {
                    item.classList.remove('hidden');
                });
                break;
            case 'active':
                allItems.forEach(item => {
                    item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
                });
                break;
            default: 
                allItems.forEach(item => {
                    !item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
                });
                break;
        }
    }
    a