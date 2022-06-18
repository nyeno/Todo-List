//Grabbing all my html tags so I can manipulate them with javascript

const todoInput = document.querySelector('.todo-input');
const todoForm = document.querySelector('.todo-form');
const todoList= document.querySelector('.todo-list');
const image = document.querySelector('.mode')
const body = document.getElementsByTagName('body')
const header = document.getElementsByTagName('header')
const todoItem = document.getElementsByTagName('li')
const footer = document.getElementsByTagName('footer')
const tabs = document.querySelector('.tabs')


//event listeners
document.addEventListener('DOMContentLoaded', getTodos)
todoForm.addEventListener('submit', addTodo)
image.addEventListener('click', mode)
todoList.addEventListener('click', deleteCheck)
tabs.addEventListener('click', filterCompleted)


//function to add a new todo item
function addTodo(e){
    e.preventDefault()
    
    //create a div for each new todo
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    //create a span that has the checked circle
    const completed = document.createElement('button')
    completed.innerHTML = `<div class="circle"></div>`
    completed.classList.add('complete-btn')
    completed.setAttribute('aria-label', 'completed-button')
    todoDiv.appendChild(completed)
//`<i class="fa fa-circle-o"></i>`

    //create the list item for each todo
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)

    //save todo to local storage
    saveToLocal(todoInput.value)

    //create the close button <i class="fa fa-close">&close</i>
    const close= document.createElement('button')
    close.setAttribute('aria-label', 'close-button')
    close.innerHTML = `<span class="x">&#x2715</span>`
    close.classList.add('close-btn')
    todoDiv.appendChild(close)

    //append new todo to the list
    
    todoList.appendChild(todoDiv)

    todoInput.value= ''
}
//function to delete a todo
function deleteCheck(e){
    const item = e.target

    //mark a todo as completed
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement
        const checkMark = item.firstElementChild
        checkMark.classList.toggle('completed')
        checkMark.innerHTML = '<span class="fa fa-check"></span>'
        todo.classList.toggle('done')
        const listItem = todo.children[1];
        listItem.classList.toggle('strike')

    }

    //Delete a todo

    if(item.classList[0] === 'close-btn'){
        const todo = item.parentElement
        removeLocalTodos(todo)
        todo.remove()
    }
}

//function to toggle dark mode
function mode(){
        body[0].classList.toggle('light-body')
        header[0].classList.toggle('light-header')
        todoList.classList.toggle('lightul')
        footer[0].classList.toggle('light-body')
        todoInput.classList.toggle('lightul')
        tabs.classList.toggle('lightul')
        const img = image.src

    if(img.indexOf('icon-sun.svg') != -1){
        image.src = 'http://127.0.0.1:5500/todo-app-main/images/icon-moon.svg'
    }
    else{
        image.src = 'http://127.0.0.1:5500/todo-app-main/images/icon-sun.svg'
    }
}
// function to filter conpleted
function filterCompleted(e){
    const todos = todoList.childNodes;
    e.target.style.color = "white"
    todos.forEach(function(todo){
        switch(e.target.innerText) {
            case 'All':
                todo.style.display = "flex";
                e.target.style.color = "hsl(220, 98%, 61%)"
                e.target.parentElement.childNodes[1].style.color = "hsl(233, 11%, 84%)"
                e.target.parentElement.childNodes[2].style.color = "hsl(233, 11%, 84%)"
            break
            case "Completed":
                e.target.style.color = "hsl(220, 98%, 61%)"
                e.target.parentElement.childNodes[0].style.color = "hsl(233, 11%, 84%)"
                e.target.parentElement.childNodes[1].style.color = "hsl(233, 11%, 84%)"
                if(todo.classList.contains('done')){
                    todo.style.display = "flex"
                }
                else{
                    todo.style.display = "none";

                }
            break
            case "Active":
                e.target.style.color = "hsl(220, 98%, 61%)"
                e.target.parentElement.childNodes[0].style.color = "hsl(233, 11%, 84%)"
                e.target.parentElement.childNodes[2].style.color = "hsl(233, 11%, 84%)"
                if(todo.classList.contains('done')){
                    todo.style.display = "none";
                }
                else{
                    todo.style.display = "flex";
                }
            break
        }
    })
}

function saveToLocal(todo){
    let todos

    if(localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos(){
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')

        //create a span that has the checked circle
        const completed = document.createElement('button')
        completed.innerHTML = `<div class="circle"></div>`
        completed.classList.add('complete-btn')
        completed.setAttribute('aria-label', 'completed-button')
        todoDiv.appendChild(completed)
        //`<i class="fa fa-circle-o"></i>`

        //create the list item for each todo
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        //create the close button <i class="fa fa-close">&close</i>
        const close= document.createElement('button')
        close.setAttribute('aria-label', 'close-button')
        close.innerHTML = `<span class="x">&#x2715</span>`
        close.classList.add('close-btn')
        todoDiv.appendChild(close)

        //append new todo to the list

        todoList.appendChild(todoDiv)
    })
}
 function removeLocalTodos(todo){
    let todos
    if(localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex =todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
 }


 
