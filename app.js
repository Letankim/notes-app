let btnAdd = document.querySelector('.btn-add'),
    addTitle = document.querySelector('.note-title'),
    addText = document.querySelector('.note-details');
let arrayObj = [];

btnAdd.addEventListener('click', (e) =>{
    handleClick();
});
document.querySelector('.input-notes').addEventListener('keydown', (e) =>{
    if(e.key === "Enter") {
        handleClick();
    }
});
// handle color 
function handleAutoColor() {
    var colorArray = [];
    for(var i = 1; i <= 3; i++) {
        var randomNumber = Math.floor(Math.random()*255);
        colorArray.push(randomNumber + 1);
    }
    return `rgb(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]})`;
};

// handle
function handleClick() {
    // check input 
    if(addTitle.value === "" || addText.value === "") {
        return alert('Please enter note title, text and color');
    }; 
    let randomColor = handleAutoColor();
    let getTime = new Date();
    let valueGetTime = getTime.toLocaleString();
    let myObj = {
        title: addTitle.value,
        text: addText.value,
        color: randomColor,
        time: valueGetTime
    };
    arrayObj.push(myObj);
    addTitle.value = ""
    addText.value = ""
    setItem();
    showNotes();
};
// update array in local storage
function setItem() {
    localStorage.setItem("notes", JSON.stringify(arrayObj));
};
// show notes
function showNotes() {
    let notes = localStorage.getItem("notes");
    if(notes === null) {
        arrayObj = [];
    } else {
        arrayObj = JSON.parse(notes);
    }
    
    let renderHtml = "";
    arrayObj.forEach((ele, index) => {
        renderHtml += `
                        <li class="note">
                            <h3 class="note-counter" style="background: ${ele.color}">Note ${index + 1}</h3>
                            <h4 class="title">${ele.title}</h4>
                            <p class="note-text">${ele.text}</p> 
                            <span class = "time">${ele.time}</span>
                            <div class = "wrapper-btn">
                                <button class="btn-control delete" id = "${index}" onclick = "deleteNote(this.id)">Delete this note</button>   
                                <button class="btn-control edit" id = "${index}" onclick = "editNote(this.id)">Edit this note</button>   
                            </div>
                        </li>
        `
    });
    if(arrayObj.length === 0) {
        document.querySelector('.list-notes').innerHTML = "Not notes yet! Using the form above to add a note."
    } else {
        document.querySelector('.list-notes').innerHTML = renderHtml;
    }
};

showNotes();

// delete note
function deleteNote(index) {
    var confirmDelete = confirm("Do you want to delete this note?");
    if(confirmDelete) {
        let notes = localStorage.getItem("notes");
        if(notes === null) {
            arrayObj = [];
        } else {
            arrayObj = JSON.parse(notes);
        }
        arrayObj.splice(index, 1);
    }
    setItem();
    showNotes();
};
// edit note
function editNote(index) {
    if(addTitle.value !== "" || addText.value !== "") {
        return alert("Please delete value in input before edit");
    }
    let notes = localStorage.getItem("notes");
        arrayObj = JSON.parse(notes);
    // update value 
    addTitle.value = arrayObj[index].title;
    addText.value = arrayObj[index].text;
    // delete to create new note
    arrayObj.splice(index, 1);
    setItem();
    showNotes();
}
