const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

//note add by button
addBtn.addEventListener("click", function () {
  addNote();
});

// savenote function call
const saveNotes = () => {
  const notes = document.querySelectorAll(".note textarea");
  //console.log(notes);
  const data = [];
  notes.forEach((note) => {
    data.push(note.value);
  });
  // console.log(data)
  if (data.length === 0) {
    localStorage.removeItem("notes");
  } else {
    localStorage.setItem("notes", JSON.stringify(data));
  }
};

//  <div class="note">
// <div class="tool">
//     <i class="fas fa-save"></i>
//     <i class="fas fa-trash"></i>
// </div>
// <textarea></textarea>
// </div>

//add note by dynamic
const addNote = (text = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div class="tool">
         <i class="save fas fa-save"></i>
         <i class="trash fas fa-trash"></i> 
    </div>
    <textarea>${text}</textarea>
    `;
  //click trash note delete
  note.querySelector(".trash").addEventListener("click", function () {
    note.remove();
    saveNotes();
  });
  // click save note saved and call function savenotes()
  note.querySelector(".save").addEventListener("click", function () {
    saveNotes();
  });

  // Automated saved note
  note.querySelector("textarea").addEventListener("focusout", function () {
    saveNotes();
  });
  main.appendChild(note);
  saveNotes();
};

//self call function
(function () {
  const lsNotes = JSON.parse(localStorage.getItem("notes"));
  if (lsNotes === null) {
    addNote();
  } else {
    lsNotes.forEach((lsNote) => {
      addNote(lsNote);
    });
  }
})();
