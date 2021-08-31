const textField = document.querySelector("#text-field")
const addNote = document.querySelector(".save-btn")
const newNote = document.querySelector(".new-note")
let setListId = 0
let update = null
let getFromDelete
let containerId = 0
let dragSrcEl = null
let listArr

function arrayFromLocalStorage() {
  if (localStorage.getItem("liItems") === null) {
    listArr = []
  } else {
    listArr = JSON.parse(localStorage.getItem("liItems"))
  }
}

// saveLocalStorage()

document.addEventListener("DOMContentLoaded", getItems)
// document, addEventListener("click", removeFromLocal)

// //ADD EVENTLISTENER ON SAVE NOTE BUTTON
addNote.addEventListener("click", EditedNote)

//FUNCTION  FOR SUBMIT NOTE BUTTON
function addNewNote() {
  //CREATE A CONTAINER FOR EACH LIST ITEMS
  const noteContainer = document.createElement("div")

  //CLASSNAME FOR EACH LIST CONTAINER
  noteContainer.className = "list-item-group"

  noteContainer.id = "eachListContainer"
  noteContainer.setAttribute("id", "eachListContainer-" + containerId)

  //CREATE LIST ITEM
  const newLi = document.createElement("LI")
  //CREATE ID FOR EACH LIST ITEM
  newLi.setAttribute("id", "listNote-" + setListId)
  newLi.className = "list-item"
  //SET DRAGGABLE ELEMENT TO TRUE
  noteContainer.draggable = "true"

  noteContainer.addEventListener("dragstart", onDragStart, false)
  noteContainer.addEventListener("dragover", onDragOver, false)
  noteContainer.addEventListener("dragenter", onDragEnter, false)
  noteContainer.addEventListener("dragleave", onDragLeave, false)
  noteContainer.addEventListener("dragend", onDragEnd, false)
  noteContainer.addEventListener("drop", onDrop, false)

  //  SAVE TEXT INPUT IN ADDCONTENT
  let addContent = document.createTextNode(textField.value)

  //SAVE ADDCONTENT FOR EACH LIST ITEM
  newLi.appendChild(addContent)
  //SAVE EACH LIST ITEM INTO A CONTAINER
  noteContainer.appendChild(newLi)
  saveLocalStorage(textField.value)
  // EMPTY TEXT AREA
  textField.value = ""
  //  CREATE CONTAINER FOR BUTTONS
  const btnDiv = document.createElement("div")
  //CLASSNAME FOR EDIT AND DELE
  btnDiv.className = "btn"
  //CREATE AN EDIT BUTTON
  const editBtn = document.createElement("button")
  editBtn.className = "editNote"
  editBtn.setAttribute("id", "editNote-" + setListId)
  editBtn.innerHTML = "EDIT"
  //APPEND EDIT BUTTON IN BUTTON CONTAINER
  btnDiv.appendChild(editBtn)

  //CREATE DELETE BUTTON FOR CREATED NOTE
  const deleteBtn = document.createElement("button")
  deleteBtn.className = "delete"
  //UNIQUE ID FOR DELETE BUTTON
  deleteBtn.setAttribute("id", "deleteNote-" + setListId)
  deleteBtn.innerHTML = "DELETE"
  //APENDING DELETING BUTTON IN THE BUTTON CONTAINER
  btnDiv.appendChild(deleteBtn)
  //APPENDING THE BUTTON CONTAINER IN THE NOTE-CONTAINER
  noteContainer.appendChild(btnDiv)
  //APPENDING THE NOTE-CONTAINER INSIDE OF THE ORDERED-LIST
  newNote.appendChild(noteContainer)
  setListId++
  containerId++
}

//ADD EVENTLISTENER ON DELETEITEM

newNote.addEventListener("click", deleteItem)

//FUNCTION OF OF DELETEITEM
function deleteItem(event) {
  if (event.target.classList.contains("delete")) {
    if (confirm("Are you sure you want to delete")) {
      //TARGET DELETE BUTTON PARENT CONTAINER
      const btnContainer = event.target.parentElement
      //TARGET NOTE CONTAINER OF DELETE CHOICE
      const noteContainer = btnContainer.parentElement
      getFromDelete = noteContainer
      const noteId = event.target.id.split("-")[1]
      removeFromLocal(noteId)
      newNote.removeChild(noteContainer)
    }
  }
}

//ADD EVENTLISTENER ON EDITITEMS

newNote.addEventListener("click", EditItem)

// FUNCTION OF EDITITEM

function EditItem(event) {
  if (event.target.classList.contains("editNote")) {
    update = event.target.attributes.id.value

    let splitArr = update.split("-")

    addNote.innerHTML = "UPDATE"

    const getLi = document.getElementById("listNote-" + splitArr[1]).innerHTML

    textField.value = getLi
  }
}

//FUNCTION OF EDITNOTE

function EditedNote() {
  if (textField.value === "") {
    alert("Note cannot be empty")
  } else if (!textField.value.replace(/\s/g, "").length) {
    alert("Empty note can't be added")
  } else if (update) {
    itemChange()
  } else {
    addNewNote()
  }
}

//FUNCTION OF UPDATE ITEM

function itemChange() {
  if (!textField.value.replace(/\s/g, "").length) {
    alert("Empty note can't be added")
  } else {
    let splitArrUpdate = update.split("-")
    let editedNote = document.getElementById("listNote-" + splitArrUpdate[1])

    const getFromLocalStorageForUpdate = JSON.parse(
      localStorage.getItem("liItems")
    )
    const getIndex = getFromLocalStorageForUpdate.indexOf(editedNote.innerHTML)

    getFromLocalStorageForUpdate.splice(getIndex, 1, textField.value)
    editedNote.innerHTML = textField.value

    textField.value = ""
    addNote.innerHTML = "Save Note"
    localStorage.setItem(
      "liItems",
      JSON.stringify(getFromLocalStorageForUpdate)
    )
    update = null
  }
}

function saveLocalStorage(liItems) {
  arrayFromLocalStorage()
  listArr.push(liItems)
  console.log(liItems)
  localStorage.setItem("liItems", JSON.stringify(listArr))
}

function getItems() {
  arrayFromLocalStorage()

  for (let i = 0; i < listArr.length; i++) {
    const noteContainer = document.createElement("div")

    const newLi = document.createElement("LI")
    newLi.setAttribute("id", "listNote-" + setListId)
    newLi.className = "list-item"

    let addContent = document.createTextNode(listArr[i])

    newLi.appendChild(addContent)
    noteContainer.appendChild(newLi)
    noteContainer.id = "eachListContainer"
    noteContainer.setAttribute("id", "eachListContainer-" + containerId)

    noteContainer.draggable = true

    //create edit button
    const btnDiv = document.createElement("div")
    btnDiv.className = "btn"
    const editBtn = document.createElement("button")
    editBtn.className = "editNote"
    editBtn.setAttribute("id", "editNote-" + setListId)
    editBtn.innerHTML = "EDIT"

    btnDiv.appendChild(editBtn)

    //create delete button
    const deleteBtn = document.createElement("button")
    deleteBtn.className = "delete"
    deleteBtn.setAttribute("id", "deleteNote-" + setListId)
    deleteBtn.innerHTML = "DELETE"

    btnDiv.appendChild(deleteBtn)

    //create general div

    noteContainer.className = "list-item-group"
    noteContainer.addEventListener("dragstart", onDragStart, false)
    noteContainer.addEventListener("dragover", onDragOver, false)
    noteContainer.addEventListener("dragenter", onDragEnter, false)
    noteContainer.addEventListener("dragleave", onDragLeave, false)
    noteContainer.addEventListener("dragend", onDragEnd, false)
    noteContainer.addEventListener("drop", onDrop, false)

    // singleDiv.appendChild(noteDiv)
    noteContainer.appendChild(btnDiv)
    newNote.appendChild(noteContainer)

    setListId++
    containerId++
  }
}

function removeFromLocal(noteIndex) {
  arrayFromLocalStorage()
  const listIndex = newNote.children[0].children[0].innerText

  getFromDelete = getFromDelete.children[0].innerHTML

  listArr.splice(listArr.indexOf(getFromDelete), 1)

  localStorage.setItem("liItems", JSON.stringify(listArr))
}

function onDragStart(event) {
  this.style.opacity = "0.4"
  dragSrcEl = this
  console.log(this)
  event.dataTransfer.effectAllowed = "move"
  event.dataTransfer.setData("text", this.innerHTML)
  targetStart = event.target.firstChild.innerHTML
  // console.log(targetStart)
  //const firstElementid = e.target.id.split("-")[1];
}
function onDragEnter(event) {
  this.classList.add("over")
}
function onDragLeave(event) {
  event.preventDefault()
  this.classList.remove("over")
}
function onDragOver(event) {
  event.preventDefault()
  event.dataTransfer.dropEffect = "move"
  return false
}

function onDrop(event) {
  arrayFromLocalStorage()
  //CHECK IF DRAGGED !== DROPED
  if (dragSrcEl != this) {
    dragSrcEl = this.innerHTML
    console.log(dragSrcEl)
    //SAVE EXISTING NOTE ON WHERE DRAGGED IS TO BE DROPPED
    const dropText = event.target.innerHTML
    console.log(dropText)
    //SAVE DRAGGED NOTE IN A VARIABLE
    const draggedText = targetStart
    console.log(draggedText)
    console.log(listArr)
    //GET INDEXOF NOTE TO BE DRAGGED FROM LOCALSTORAGE
    const getIndexOfDragged = listArr.indexOf(draggedText)

    //GET INDEXOF WHERE DRAGGED NOTE IS TO BE DROPPED
    const getIndexOfDropped = listArr.indexOf(dropText)

    //SWAPING NOTE IN LISTARR USING THEIR INDEX
    let swapNote = listArr[getIndexOfDragged]
    listArr[getIndexOfDragged] = listArr[getIndexOfDropped]
    listArr[getIndexOfDropped] = swapNote

    localStorage.setItem("liItems", JSON.stringify(listArr))
    this.innerHTML = event.dataTransfer.getData("text")
    // console.
  }
  return false
}
function onDragEnd(event) {
  event.target.classList.remove("over")
  console.log(this)
  console.log(dragSrcEl)

  if (dragSrcEl != this) {
    console.log(this)
    console.log(dragSrcEl)
    this.innerHTML = dragSrcEl
  }
  this.style.opacity = "1"
}
