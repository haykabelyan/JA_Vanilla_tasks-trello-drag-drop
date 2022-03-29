//SELECTORS
const todos = document.querySelectorAll('.todo');
const all_status = document.querySelectorAll('.status');
const open_modal = document.querySelector('#add_btn');
const modal = document.querySelector('.modal');
const close_modal = document.querySelector('.modal .close');
const crate_todo = document.querySelector('.modal .crateTodoBtn');
const close_btns = document.querySelectorAll('.todo-container .close');

//eventlisteners
document.addEventListener('DOMContentLoaded', getTodos);
open_modal.addEventListener('click', openModal);
close_modal.addEventListener('click', closeModal);
crate_todo.addEventListener('click', createTodo);


close_btns.forEach((close_btn)=>{
    close_btn.addEventListener('click', removeTodo);
});

todos.forEach((todo) =>{
    todo.addEventListener('dragstart', dragStart);
    todo.addEventListener('dragend', dragEnd);
}); 

all_status.forEach((status) =>{
    status.addEventListener('dragover', dragOver);
    status.addEventListener('dragenter', dragEnter);
    status.addEventListener('dragleave', dragLeave);
    status.addEventListener('drop', dragDrop);
    status.addEventListener('click', removeTodo);
});


//Variables
let dragable_todo = null;


//Todo Functions
function dragStart(e){
    dragable_todo = this;
    setTimeout(()=>{
        this.style.display = 'none';
    }, 0);

    removeInLocalStorage(this.parentElement.children[0].innerText, this.children[0].innerText); 
}


function dragEnd(){
    dragable_todo = null;
    setTimeout(()=>{
        this.style.display = 'block';
    }, 0);
}

//Status Block Functions

function dragOver(e){
    e.preventDefault();
}

function dragEnter(){
    this.style.border = '1px dashed #ccc';
}

function dragLeave(){
    this.style.border = 'none';
}

function dragDrop(){
    this.style.border = 'none';
    this.appendChild(dragable_todo);
    saveInLocalStorage(this.children[0].innerText, dragable_todo.children[0].innerText);
}

//Modal Block Functions

function openModal(){
    modal.classList.add('active');
    document.querySelector('.modal input').focus();
}

function closeModal(){
    modal.classList.remove('active');
}


//Create Todo Functions

function createTodo(e){
    e.preventDefault(); //refresh off
    if(!document.querySelector('.modal input').value.trim()) return;
    const div = document.createElement('div');
    div.classList.add('todo');
    div.setAttribute('draggable', 'true');
    const span2 = document.createElement('span');
    span2.innerText = document.querySelector('.modal input').value;
    div.appendChild(span2);
    const span = document.createElement('span');
    span.classList.add('close');
    span.innerText = '\u00D7';
    div.appendChild(span);
    all_status[0].appendChild(div);

    div.addEventListener('dragstart', dragStart);
    div.addEventListener('dragend', dragEnd);
    saveInLocalStorage('No Status', document.querySelector('.modal input').value);

    document.querySelector('.modal input').value = '';
    modal.classList.remove('active');
}


function removeTodo(e){
    if(e.target.classList[0] == 'close'){
        e.target.parentElement.classList.add('fall');
        e.target.parentElement.addEventListener('transitionend', ()=> {
            removeInLocalStorage(e.target.parentElement.parentElement.children[0].innerText,e.target.parentElement.children[0].innerText)
            e.target.parentElement.remove();
        });
        
    }
}


function saveInLocalStorage(key, text){
    let todos;
    if(localStorage.getItem(key) == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem(key));
    }

    todos.push(text);
    localStorage.setItem(key, JSON.stringify(todos));
}


function removeInLocalStorage(key, text){
    let todos;
    if(localStorage.getItem(key) == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem(key));
    }

    const index = todos.indexOf(text);
    todos.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(todos));
}



function getTodos(){
    const nostatus = JSON.parse(localStorage.getItem('No Status'));
    const notstarted = JSON.parse(localStorage.getItem('Not Started'));
    const inprocess = JSON.parse(localStorage.getItem('In Process'));
    const complated = JSON.parse(localStorage.getItem('Complated'));

    console.log(nostatus);
    console.log(notstarted);
    console.log(inprocess);
    console.log(complated);

    nostatus.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('todo');
        div.setAttribute('draggable', 'true');
        const span2 = document.createElement('span');
        span2.innerText = element;
        div.appendChild(span2);
        const span = document.createElement('span');
        span.classList.add('close');
        span.innerText = '\u00D7';
        div.appendChild(span);
        all_status[0].appendChild(div);

        div.addEventListener('dragstart', dragStart);
        div.addEventListener('dragend', dragEnd);
    });
    
    notstarted.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('todo');
        div.setAttribute('draggable', 'true');
        const span2 = document.createElement('span');
        span2.innerText = element;
        div.appendChild(span2);
        const span = document.createElement('span');
        span.classList.add('close');
        span.innerText = '\u00D7';
        div.appendChild(span);
        all_status[1].appendChild(div);

        div.addEventListener('dragstart', dragStart);
        div.addEventListener('dragend', dragEnd);
    });

    inprocess.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('todo');
        div.setAttribute('draggable', 'true');
        const span2 = document.createElement('span');
        span2.innerText = element;
        div.appendChild(span2);
        const span = document.createElement('span');
        span.classList.add('close');
        span.innerText = '\u00D7';
        div.appendChild(span);
        all_status[2].appendChild(div);

        div.addEventListener('dragstart', dragStart);
        div.addEventListener('dragend', dragEnd);
    });

    complated.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('todo');
        div.setAttribute('draggable', 'true');
        const span2 = document.createElement('span');
        span2.innerText = element;
        div.appendChild(span2);
        const span = document.createElement('span');
        span.classList.add('close');
        span.innerText = '\u00D7';
        div.appendChild(span);
        all_status[3].appendChild(div);

        div.addEventListener('dragstart', dragStart);
        div.addEventListener('dragend', dragEnd);
    });
}