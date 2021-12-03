
const getData = () => JSON.parse (localStorage.getItem ('todoList')) ?? [];
const setData = (data) => localStorage.setItem ('todoList', JSON.stringify(data));

// Criação de atividades
const createItem = (task, check, index) => {
    const item  = document.createElement('tr');
    item.innerHTML = ` 
        <th scope="row"><input type="checkbox" ${check} data-index=${index}></th>
        <td id="${index}">${task}</td>
        <td><span id="edit" data-index=${index}>Editar</span> - <span id="exclude" data-index=${index}>Excluir</span> - <span id="finished" data-index=${index}>Finalizar</span></td>
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
        data.push ({'activities': text, 'status': '', 'done': ''});
        setData(data);
        render();
        event.target.value = '';
    } 
}

const registerInsert = () => {
    const element = document.getElementById("register");
    const input = element.value;
    const data = getData();
    data.push ({'activities': input, 'status': '', 'done': ''});
    setData(data);
    render();
    element.value = '';
}

document.getElementById('register').addEventListener('keypress', enterInsert);
document.getElementById('button').addEventListener('click', registerInsert);

const clearItem = (index) => {
    const data = getData();
    data.splice (index, 1);
    setData(data);
    render();
} 

const finishItem = (index) => {
    const data = getData();
    data[index].done = data[index].done === '' ? 'finished': '';
    const finished = document.getElementById(index);
    finished.classList.toggle('finish');
    setData(data);
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
        clearItem(index);
    }else if (element.id === 'finished') {
        finishItem (index);
    }else if (element.type === 'checkbox'){
        refreshItem (index);
    }
} 

document.getElementById('todoList').addEventListener('click', clickItem);

const selectChecking = (item) => {
    if (item.status === '') {
        item.status = 'checked';
    } else if (item.status === 'checked') {
        item.status = item.status;
    }
}

const allSelected = () => {
    const data = getData();
    data.forEach( item => selectChecking(item));
    setData(data);
    render();
}

const clearCheck = () => {
    const data = getData();
    for (var i = 0; i < data.length; i++) {
        const status = data[i].status;
        if (status === 'checked') {
            data.splice (i, 1);
            setData(data);
        }
    }
}

const allRemoved = () => {
    const data = getData();
    data.forEach( data => clearCheck(data.status));
    render();
}

document.getElementById('selectAll').addEventListener('click', allSelected);
document.getElementById('finishSelected').addEventListener('click', allFinished);
document.getElementById('removeSelected').addEventListener('click', allRemoved);

render();