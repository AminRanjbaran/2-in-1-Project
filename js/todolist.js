let $ = document
let inputElem = $.querySelector('#todoInput')
let addBtn = $.querySelector('#addButton')
let clearBtn = $.querySelector('#clearButton')
let todoListElem = $.querySelector('.todoList')
let bgChooser = $.querySelector('#bgChoose')
let h3color = $.querySelector('.colorp')

let todosArray = []

bgChooser.addEventListener('change', (e)=>{
    let color = e.target.value
    inputElem.style.backgroundColor = color
    h3color.style.color = color
})

function addNewTodo() {
    let todoTitle = inputElem.value

    let todoObject = {
        id: todosArray.length + 1,
        title: todoTitle,
        complete: false,
        backgroundColor: inputElem.style.backgroundColor
    }

    if(todoObject.title){
    todosArray.push(todoObject)
    setLocalStorage(todosArray)
    newTodoElem(todosArray)
    }

    else{
        alert('Please enter todo task!!!')
    }

    inputElem.value = ''
    inputElem.focus()
}

function setLocalStorage(todoList) {
    localStorage.setItem('todos', JSON.stringify(todoList))
}

function newTodoElem(todosList) {
    todoListElem.innerHTML = ''

    todosList.forEach((todo)=> {
        let newTodoLi = $.createElement('li')
        newTodoLi.className = 'mt-5 rounded-lg p-5 text-2xl'
        newTodoLi.style.backgroundColor = todo.backgroundColor
        
        let newTodoP = $.createElement('p')
        newTodoP.innerHTML = todo.title
        
        let newTodoCompleteBtn = $.createElement('button')
        newTodoCompleteBtn.className = 'mt-5 rounded-lg p-5 text-xl comp hover:text-white'
        newTodoCompleteBtn.innerHTML = 'Complete'
        newTodoCompleteBtn.addEventListener('click', ()=>{
            completeFunc(todo.id)
        })

        let newTodoDeleteBtn = $.createElement('button')
        newTodoDeleteBtn.className = 'mt-5 ml-5 rounded-lg p-5 text-xl del hover:text-white'
        newTodoDeleteBtn.innerHTML = 'Delete'
        newTodoDeleteBtn.addEventListener('click',()=>{
            deleteTodo(todo.id)
        })

        if(todo.complete) {
            newTodoLi.className = 'uncompleted mt-5 rounded-lg p-5 text-2xl'
            newTodoCompleteBtn.innerHTML = 'Uncomplete'
        }

        newTodoLi.append(newTodoP, newTodoCompleteBtn, newTodoDeleteBtn)
        todoListElem.append(newTodoLi)
    })
}

function completeFunc(todoId) {
    let getLocalStorage = JSON.parse(localStorage.getItem('todos'))

    todosArray = getLocalStorage

    todosArray.forEach((todo)=> {
        console.log(todo);
        if(todo.id === todoId){
        todo.complete = !todo.complete
        }
    })

    setLocalStorage(todosArray)
    newTodoElem(todosArray)
}

function deleteTodo(todoId) {
    let getLocalStorage = JSON.parse(localStorage.getItem('todos'))

    todosArray = getLocalStorage

    let todoIndex = todosArray.findIndex((todo)=> todo.id === todoId)
    todosArray.splice(todoIndex, 1)
    setLocalStorage(todosArray)
    newTodoElem(todosArray)
}

function loadLocalStorage() {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    if(localStorageTodos){
        todosArray = localStorageTodos
    }
    else{
        todosArray = []
    }

    newTodoElem(todosArray)
}

function clearTodos() {
    todosArray = []
    newTodoElem(todosArray)
    localStorage.removeItem('todos')
}

window.addEventListener('load', loadLocalStorage)
addBtn.addEventListener('click', addNewTodo)
clearBtn.addEventListener('click', clearTodos)
inputElem.addEventListener('keydown', (e)=> {
    if(e.keyCode === 13 ) {
        addNewTodo()
    }
})