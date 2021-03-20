const StorageController = (() => {


    return {
        LSsetTodo: (nwtd) => {
            let todos;
            if (localStorage.getItem("todos") === null) {
                todos = [];
                todos.push(nwtd);
            } else {
                todos = JSON.parse(localStorage.getItem('todos'));
                todos.push(nwtd);
            }
            localStorage.setItem("todos", JSON.stringify(todos));
        },
        LSgetTodos: () => {
            let todos;
            if (localStorage.getItem("todos") === null) {
                todos = [];
            } else {
                todos = JSON.parse(localStorage.getItem('todos'));
            }
            return todos;
        },
        removeLSTodo: (id) => {
            let todos;
            todos = JSON.parse(localStorage.getItem("todos"));
            todos.forEach((td, index) => {
                if (td.id == id) {
                    todos.splice(index, 1);
                }
            });
            localStorage.setItem("todos", JSON.stringify(todos));
        }

    }

})();

const TodoController = (() => {

    const todo = function(id, todom) {
        this.id = id;
        this.todoM = todom;
    }

    const data = {
        todos: StorageController.LSgetTodos()

    }



    return {
        getdata: () => {
            return data.todos;
        },
        addNewTodo: (td) => {
            let id;
            if (data.todos.length > 0) {
                id = data.todos[data.todos.length - 1].id + 1;
            } else {
                id = 0;
            }
            const newtodo = new todo(id, td);
            data.todos.push(newtodo);
            return newtodo;
        },
        dataTodoRemove: (id) => {
            data.todos.forEach((td, index) => {
                if (td.id == id) {
                    data.todos.splice(index, 1);
                }
            });


        }
    }
})();

const UIController = (() => {

    const selectors = {
        TodoShowArea: "#todos-show-area",
        TodoInput: "#todo-input",
        AddTodoBtn: "#add-todo-btn",
        deleteI: "deleteI"
    }

    return {
        getSelectors: () => {
            return selectors;
        },
        addNewTodo: function(td) {
            let html = "";
            html = `
                  <tr>
                     <td><i class="material-icons text-teal">attach_file</i></td>
                     <td>${td.id}</td>
                     <td>${td.todoM}</td>
                     <td><i class="material-icons deleteI">clear</i></td>
                 </tr>
                         `
            document.querySelector(selectors.TodoShowArea).innerHTML += html;

            // console.log(id, tdm);
        },
        addToTheTodes: function(tds) {
            let html = "";
            tds.forEach(td => {
                html += `
                  <tr>
                     <td><i class="material-icons text-teal">attach_file</i></td>
                     <td>${td.id}</td>
                     <td>${td.todoM}</td>
                     <td><i class="material-icons deleteI">clear</i></td>
                 </tr>
                         `
            });
            document.querySelector(selectors.TodoShowArea).innerHTML = html;
        }

    }

})();

const App = ((uictrl, todoctrl, stgctrl) => {

    const selectors = uictrl.getSelectors();

    const loadevent = () => {

        document.querySelector(selectors.AddTodoBtn).addEventListener("click", (e) => {
            const x = document.querySelector('input').value;
            if (x !== '' && x !== null) {


                const newtodo = todoctrl.addNewTodo(x);
                stgctrl.LSsetTodo(newtodo);
                uictrl.addNewTodo(newtodo);
            }
            document.querySelector('input').value = null;
            e.preventDefault();

        });

        document.querySelector(selectors.TodoShowArea).addEventListener("click", (e) => {

            if (e.target.classList.contains(selectors.deleteI)) {
                const id = e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.textContent;
                todoctrl.dataTodoRemove(id);
                stgctrl.removeLSTodo(id);
                e.target.parentNode.parentNode.remove();
            }

            e.preventDefault();
        });





    }


    return {
        init: () => {
            console.log("init fuction is working ");
            loadevent();

            let todos = todoctrl.getdata();
            uictrl.addToTheTodes(todos);



        }
    }
})(UIController, TodoController, StorageController);

App.init();