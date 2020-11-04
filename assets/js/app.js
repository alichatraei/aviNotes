// variables
let titleValue = [],
  contentValue = [];
eventListeners();
//eventListeners
function eventListeners() {
  //select Button element
  document.querySelector("#submit").addEventListener("click", addNote);
  document.addEventListener("DOMContentLoaded", loadNotesFromLS);
}

//Functions
//addNote
function addNote(info) {
  //preventDefault
  info.preventDefault();
  //get value of the elements
  const selectTitleInput = document.querySelector("#txtTitle").value;
  const selectContentInput = document.querySelector("#contentText").value;
  //check are inputs empty or not ?
  if (selectTitleInput === "" && selectTitleInput === "")
    alert("لطفا مقادیر صحیح وارد نمایید");
  else {
    //call add Notes to LocalStorage
    addNotesToLS(selectTitleInput, selectContentInput);
    //call create elements function
    const sectionElement = document.createElement("section");
    createTitleElement(selectTitleInput, sectionElement);
    createContentElement(selectContentInput, sectionElement);
    createDateElement("تاریخ", sectionElement);
  }
}
// create title element function
function createTitleElement(Title, sectionElement) {
  const selectArticle = document.querySelector(".article");
  const addDiv = document.createElement("div");
  const addP = document.createElement("p");
  const addImg = document.createElement("img");

  selectArticle.appendChild(sectionElement);
  sectionElement.setAttribute("class", "section");
  sectionElement.appendChild(addDiv);
  addDiv.setAttribute("id", "title");
  addDiv.appendChild(addP);
  addP.appendChild(document.createTextNode(Title));
  addP.appendChild(addImg);
  addImg.setAttribute("src", "assets/Img/Remove.png");
}
//Create content element function
function createContentElement(Content, sectionElement) {
  const secondDiv = document.createElement("div");
  sectionElement.appendChild(secondDiv);
  secondDiv.setAttribute("id", "noteContents");
  const secondP = document.createElement("p");
  secondDiv.appendChild(secondP);
  secondP.appendChild(document.createTextNode(Content));
}
//create date element function
function createDateElement(Date, sectionElement) {
  const thirdDiv = document.createElement("div");
  const thirdP = document.createElement("p");
  sectionElement.appendChild(thirdDiv);
  thirdDiv.setAttribute("id", "date");
  thirdDiv.appendChild(thirdP);
  thirdP.appendChild(document.createTextNode(Date));
}
// Load Notes to LocalStorage
function loadNotesFromLS() {
  let titleNotes;
  let contentNotes;

  if (
    (localStorage.getItem("titleNotes") &&
      localStorage.getItem("contentNotes")) === null
  ) {
    titleNotes = [];
    contentNotes = [];
  } else {
    titleNotes = JSON.parse(localStorage.getItem("titleNotes"));
    contentNotes = JSON.parse(localStorage.getItem("contentNotes"));

    showNotesOnLoadedForm(titleNotes, contentNotes);
  }

  console.log(titleNotes);
  return titleNotes, contentNotes;
}
//add notes to LocalStorage
function addNotesToLS(Title, Content) {
  // push values in array
  titleValue.push(Title);
  contentValue.push(Content);
  localStorage.setItem("titleNotes", JSON.stringify(titleValue));
  localStorage.setItem("contentNotes", JSON.stringify(contentValue));
}
// show Notes from localStorage in Elements which created
function showNotesOnLoadedForm(titleNotes, contentNotes) {
  const sectionElement = document.createElement("section");
  createTitleElement(titleNotes, sectionElement);
  createContentElement(contentNotes, sectionElement);
  createDateElement("تاریخ", sectionElement);
}
