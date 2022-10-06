// store some thing to call 
let btnAdd = document.querySelector('.add-data'),
    addTitle = document.querySelector('.note-title'),
    addText = document.querySelector('.note-details'),
    audio = document.querySelector('.sound'),
    deleteAll = document.querySelector('.delete-all'),
    btnUpdate = document.querySelector('.update-data');
let indexArr = 0;
var message;
let arrayObj = [];
// click button update and add
btnAdd.addEventListener('click', (e) =>{
    message = '';
    handleClick(message);
});
btnUpdate.addEventListener('click', (e) =>{
    message = "The last update: ";
    handleClick(message);
});
// when enter will be add note
document.querySelector('.input-notes').addEventListener('keydown', (e) =>{
    if(e.key === "Enter") {
        message = "";
        if(btnUpdate.classList.contains('active')) {
            handleBtnUpdate();
            message ="The last update: ";
        }
        handleClick(message);
    };
});
// handle random color title 
function handleAutoColor() {
    var colorArray = [];
    for(var i = 1; i <= 3; i++) {
        var randomNumber = Math.floor(Math.random()*255);
        colorArray.push(randomNumber + 1);
    }
    return `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
};
//

// handle event when click 
function handleClick(messageUpdate, check) {
    // check input 
    if(addTitle.value === "" || addText.value === "") {
        showError();
        audio.src = './sound/error.mp3';
        audio.play();
        return 0;
    };
    // show message when add successfully
    showSuccess();
    audio.src = './sound/success.mp3';
    audio.play();
    let randomColor = handleAutoColor();
    let getTime = new Date();
    let valueGetTime = getTime.toLocaleString();
    let myObj = {
        title: addTitle.value,
        text: addText.value,
        color: randomColor,
        time: valueGetTime,
        messageUpdate: messageUpdate,
        isDone: false, 
        index: indexArr++
    };
    arrayObj.push(myObj);
    addTitle.value = "";
    addText.value = "";
    setItem();
    showNotes();
};
// update array in local storage
function setItem() {
    arrayObj.sort((item1, item2) => {
        if(item1.index > item2.index) {
            return -1;
        };
    });
    localStorage.setItem("notes", JSON.stringify(arrayObj));
};
// check data in storage
function checkData() {
    let notes = localStorage.getItem("notes");
    if(notes === null) {
        arrayObj = [];
    } else {
        arrayObj = JSON.parse(notes);
    };
}
// show notes
function showNotes() {
    checkData();
    let renderHtml = "";
    arrayObj.forEach((ele, index) => {
        renderHtml += `
                        <li class="note ${ele.isDone? 'checked' :''}">
                            <div class="header-note" style="background: ${ele.color}">
                                <h3 class="note-counter">Note ${index + 1}</h3>
                                <input type="checkbox" id="${index}" class = "check-delete ${ele.isDone}" onclick = "check(this, this.id)" ${ele.isDone? 'checked' :''} title = "${ele.isDone? 'This note is done' :'This note is not done'}">
                            </div>  
                            <h4 class="title">${ele.title}</h4>
                            <p class="note-text">${ele.text}</p> 
                            <span class = "time">${ele.messageUpdate ? ele.messageUpdate : ''}${ele.time}</span>
                            <div class = "wrapper-btn">
                                <button class="btn-control delete" id = "${index}" onclick = "deleteNote(this.id, 1)">Delete this note</button>   
                                <button class="btn-control edit" id = "${index}" onclick = "editNote(this.id)">Edit this note</button>   
                            </div>
                        </li>
        `
    });
    if(arrayObj.length === 0) {
        document.querySelector('.list-notes').innerHTML = "Not notes yet! Using the form above to add a note."
    } else {
        document.querySelector('.list-notes').innerHTML = renderHtml;
    };
};

showNotes();
let listCheck = []
function check(ele, index) {
    let notes = localStorage.getItem("notes");
    if(notes === null) {
        arrayObj = [];
    } else {
        arrayObj = JSON.parse(notes);
    };
    if(ele.checked) {
        ele.style.check = 'checked';
        arrayObj[index].isDone = true;
    } else {
        arrayObj[index].isDone = false;
    }
    localStorage.setItem("notes", JSON.stringify(arrayObj));
    showNotes();
};

// delete note
function deleteNote(index, length) {
    var confirmDelete = confirm("Do you want to delete this note?");
    if(confirmDelete) {
        checkData();
        arrayObj.splice(index, length);
    };
    setItem();
    showNotes();
};
// delete all 
deleteAll.onclick = function () {
    let notes = localStorage.getItem("notes");
    if (notes !==  "[]") {
        deleteNote(0, notes.length);
    } else {
        alert("No notes to delete");
    };
};
// btn update
function handleBtnUpdate() {
    btnUpdate.classList.remove('active');
    btnAdd.classList.add('active');
}
btnUpdate.onclick = function () {
    handleBtnUpdate();
}
// edit note
function editNote(index) {
    if(addTitle.value !== "" || addText.value !== "") {
        return alert("Please delete value in input before edit");
    };
    let notes = localStorage.getItem("notes");
        arrayObj = JSON.parse(notes);
    // update value 
    addTitle.value = arrayObj[index].title;
    addText.value = arrayObj[index].text;
    btnUpdate.classList.add('active');
    btnAdd.classList.remove('active');
    // delete to create new note
    arrayObj.splice(index, 1);
    setItem();
    showNotes();
};


var array = [1,  2, 7 , 5, 3, 4, 5, 6];
sort(array, 1);
function sort(array, check) {
    if(check == 1) {
        for(var i = 0; i < array.length; i++) {
            for(var j = 0; j < array.length; ++j) {
                if(array[j] > array[j + 1]) {
                    var temp = array[j + 1];
                    array[j + 1] = array[j];
                    array[j] = temp;
                }
            }
        }
    } else {
        for(var i = 0; i < array.length; i++) {
            for(var j = 0; j < array.length; ++j) {
                if(array[j] < array[j + 1]) {
                    var temp = array[j + 1];
                    array[j + 1] = array[j];
                    array[j] = temp;
                }
            }
        }
    }
    return array;
}

console.log(array);