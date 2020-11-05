//-----> Variables
let article = document.querySelector(".article");
//for load Data from LocalStorage
let addTitle = [],
  addContent = [];
// get form values
let titleLS,
  contentLS = [];
//for push Data to LocalStorage

const titleInput = document.querySelector("#txtTitle").value;
const contentInput = document.querySelector("#contentText").value;
//-----> eventListeners
eventListeners();
function eventListeners() {
  document.querySelector("#submit").addEventListener("click", addNote);
  document.querySelector(".article").addEventListener("click", removeNote);
  document.addEventListener("DOMContentLoaded", getNoteFromLS);
}
//-----> functions

//add Note function
function addNote(e) {
  //preventDefault - No action
  e.preventDefault();
  const titleInput = document.querySelector("#txtTitle").value;
  const contentInput = document.querySelector("#contentText").value;
  //condition for doesn't empty the values - Validation
  if ((titleInput && contentInput) == "") {
    alert("لطفا مقادیر را وارد نمایید");
  } else {
    //create Elements with Functions
    const section = document.createElement("section");
    section.setAttribute("class", "section");
    article.appendChild(section);
    createTitleElement(section, titleInput);
    createContentElement(section, contentInput);
    createDateElement(section, "تاریخ");
    addNoteToLS(titleInput, contentInput);
  }
}
//create Title Element - Function
function createTitleElement(section, titleInput) {
  //create elements
  const div = document.createElement("div");
  section.appendChild(div);
  div.setAttribute("id", "title");
  const p = document.createElement("p");
  div.appendChild(p);
  p.appendChild(document.createTextNode(titleInput));
  const img = document.createElement("img");
  img.setAttribute("src", "assets/img/remove.png");
  img.setAttribute("id", "removeBtn");
  p.appendChild(img);
}
//create Content Element - function
function createContentElement(section, contentInput) {
  const div = document.createElement("div");
  section.appendChild(div);
  div.setAttribute("id", "noteContents");
  const p = document.createElement("p");
  div.appendChild(p);
  p.appendChild(document.createTextNode(contentInput));
}
//create Date Element - Function
function createDateElement(section, date) {
  const div = document.createElement("div");
  section.appendChild(div);
  div.setAttribute("id", "date");
  const p = document.createElement("p");
  div.appendChild(p);
  p.appendChild(document.createTextNode(date));
}
//remove notes function
function removeNote(e) {
  //remove section which created
  if (e.target.id === "removeBtn") {
    e.target.parentElement.parentElement.parentElement.remove();
  }

  removeNoteFromLS(e.target.parentElement.textContent);
}
//get Notes from LocalStorage
function getNoteFromLS() {
  //insert LS Title & Content Note Value in variables
  const titleValue = JSON.parse(localStorage.getItem("titleNotes"));
  const contentValue = JSON.parse(localStorage.getItem("contentNotes"));
  if ((titleValue && contentValue) === null) {
    (titleValue = []), (contentValue = []);
  } else getNotesFromLSWhenOnLoaded();
}
//add Notes to LocalStorage
function addNoteToLS(title, content) {
  //create variables for push parameters in LocalStorage

  addTitle.push(title);
  addContent.push(content);
  //insert values
  localStorage.setItem("titleNotes", JSON.stringify(addTitle));
  localStorage.setItem("contentNotes", JSON.stringify(addContent));
  console.log("object");
}
//get Notes and Show them in Created Elements
function getNotesFromLSWhenOnLoaded() {
  //Validate

  const titleValue = JSON.parse(localStorage.getItem("titleNotes"));
  const contentValue = JSON.parse(localStorage.getItem("contentNotes"));
  if ((titleValue && contentValue) !== null) {
    for (let index = 0; index < titleValue.length; index++) {
      const section = document.createElement("section");
      section.setAttribute("class", "section");
      article.appendChild(section);
      createTitleElement(section, titleValue[index]);
      createContentElement(section, contentValue[index]);
      createDateElement(section, "تاریخ");
    }
  }
}
//remove notes form LocalStorage when remove button clicked
function removeNoteFromLS(txtTitle) {
  //load data from LocalStorage
  const titleNote = JSON.parse(localStorage.getItem("titleNotes"));
  const contentNote = JSON.parse(localStorage.getItem("contentNotes"));
  //process in titleNote array 
  for (let index = 0; index < titleNote.length; index++) {
    if (txtTitle == titleNote[index]) {
      titleNote.splice(index, 1);
      contentNote.splice(index, 1);
    }
  }
  //set new Items to localStorage
  localStorage.setItem("titleNotes", JSON.stringify(titleNote));
  localStorage.setItem("contentNotes", JSON.stringify(contentNote));
}
