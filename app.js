
const getData = () => JSON.parse (localStorage.getItem ('todoList')) ?? [];
const setData = (data) => localStorage.setItem ('todoList', JSON.stringify(data));

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
    const data = getData();
    data.forEach ( (item, index) => createItem (item.activities, item.status, index));
}

const enterInsert = (event) => {
    const keys = event.key;
    const text = event.target.value;
    if (keys === 'Enter') {
        const data = getData();
        data.push ({'activities': text, 'status': ''});
        setData(data);
        render();
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
    const data = getData();
    data.splice (index, 1);
    setData(data);
    render();
} 

const finishItem = (index) => {
    const finished = document.getElementById(index);
    finished.style.textDecoration = "line-through";
}

const refreshItem = (index) => {
    const data = getData();
    data[index].status = data[index].status === '' ? 'checked': '';
    setData(data);
    render();
}

const clickItem = (event) => {
    const element = event.target;
    const index = element.dataset.index;
    if (element.id === 'exclude') {
        clearItem (index);
    }else if (element.id === 'finish') {
        finishItem (index);
    }else if (element.type === 'checkbox'){
        refreshItem (index);
    }
} 

document.getElementById('todoList').addEventListener('click', clickItem);

const checking = (item) => {
    if (item.status === '') {
        item.status = 'checked';
    } else if (item.status === 'checked') {
        item.status = item.status;
    }
}

const allSelected = () => {
    const data = getData();
    data.forEach( item => checking(item))
    setData(data);
    render();
}

document.getElementById('selectAll').addEventListener('click', allSelected)

render();