const toDoForm = document.querySelector("#toDoForm");
const toDoInput = document.querySelector("#toDoInput");
const toDoText = document.querySelector(".toDoText");
let uniqueId = 0;
let toDos = JSON.parse(localStorage.getItem("todos")) || [];

function saveToDos() {
    localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo(id) {
    toDos = toDos.filter(toDo => toDo.id !== id);
    saveToDos();
    renderToDos();
}

function toggleComplete(id) {
    alert("Görev Başarıyla Tamamlandı!")
    const toDo = toDos.find(toDo => toDo.id === id);
    toDo.completed = !toDo.completed;
    saveToDos();
    renderToDos();
}

function editToDo(id) {
    const toDo = toDos.find(toDo => toDo.id === id);
    const newToDoText = prompt("Görevi düzenle:", toDo.text);
    if (newToDoText !== null) {
        toDo.text = newToDoText;
        saveToDos();
        renderToDos();
    }
}

function renderToDos() {
    toDoText.innerHTML = "";
    toDos.forEach(toDo => {
        const itemHTML = `
            <div class="toDoList" data-comment="${toDo.id}">
                <h3 data-comment="${toDo.id}" class="${toDo.completed ? 'completed' : ''}">${toDo.id} - ${toDo.text}</h3>
                <div class="buttons">
                    <button onclick="deleteToDo(${toDo.id})" class="toDoDeleteBtn">Sil</button>
                    <button onclick="editToDo(${toDo.id})" class="toDoDesignBtn">Düzenle</button>
                    <button onclick="toggleComplete(${toDo.id})" class="toDoOkBtn">${toDo.completed ? 'Geri Al' : 'Tamamlandı'}</button>
                </div>
            </div>
        `;
        toDoText.innerHTML += itemHTML;
    });
}

function submitForm() {
    toDoForm.addEventListener("submit", function (e) {
        e.preventDefault();
        uniqueId++;
        const toDoValue = toDoInput.value;
        toDos.push({ id: uniqueId, text: toDoValue, completed: false });
        saveToDos();
        renderToDos();
        toDoForm.reset();
    });
}

function init() {
    renderToDos();
    submitForm();
}

init();
