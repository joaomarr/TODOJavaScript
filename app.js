
let data = [{'activities': 'Sua primeira tarefa', 'status': ' '}];

// Criação de atividades
const createItem = (task, check, index) => {
    const item  = document.createElement('tr');
    item.innerHTML = ` 
        <th scope="row"><input type="checkbox" ${check} data-index=${index}></th>
        <td id="${index}">${task}</td>
        <td><span id="edit" data-index=${index}>Editar</span> - <span id="exclude" data-index=${index}>Excluir</span> - <span id="finish" data-index=${index}>Finalizar</span></td>
    `;
    document.getElementById('todoList').appendChild(item);
}

const cleanTasks = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const render = () => {
    cleanTasks();
    data.forEach ( (item, index) => createItem (item.activities, item.status, index));
}

const enterInsert = (event) => {
    const keys = event.key;
    const text = event.target.value;
    if (keys === 'Enter') {
        data.push ({'activities': text, 'status': ''});
        render()
        event.target.value = '';
    } 
}
//  --PROBLEMA NO CÓDIGO (RESOLVER)--
// const registerInsert = (event) => {
//     console.log(event);
//     data.push ({'activities': text, 'status': ''});
//     render()
//     event.target.value = '';
// }
//  --PROBLEMA NO CÓDIGO (RESOLVER)--

document.getElementById('register').addEventListener('keypress', enterInsert);
// document.getElementById('button').addEventListener('click', registerInsert);

const clearItem = (index) => {
    data.splice (index, 1);
    render();
} 

const finishItem = (index) => {
    document.getElementById(index).style.textDecoration = "line-through";
}

const refreshItem = (index) => {
    data[index].status = data[index].status === '' ? 'checked': '';
    render();
}


const clickItem = (event) => {
    const element = event.target;
    if (element.id === 'exclude') {
        const index = element.dataset.index;
        clearItem (index);
    }else if (element.id === 'finish') {
        const index = element.dataset.index;
        finishItem (index);
    }else if (element.type === 'checkbox') {
        const index = element.dataset.index;
        refreshItem (index);
    }
}

document.getElementById('todoList').addEventListener('click', clickItem);

render();
