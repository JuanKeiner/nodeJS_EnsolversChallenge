const notesColumn = document.getElementById("notesCol")

const createNoteButton = document.getElementById("createNoteButton")

const noteTemplate = document.getElementById("noteTemplate").content
const createNoteModal = document.getElementById("createNoteModal")

const screenTitle = document.getElementById("screenTitle")
const archivedActiveNotesButton = document.getElementById("archivedActiveNotesButton")

// let activeNoteEdition = null;

let notesList;
let archivedSection = false;

document.addEventListener("DOMContentLoaded", e => {
    fetchNotes().then(paintNotes);
    addButtonsEventListeners();
})

let fetchNotes = async () => {
    let dir = archivedSection ? "http://localhost:4000/notes/archived" : "http://localhost:4000/notes/active";

    if (archivedSection) {
        screenTitle.textContent = "Archived notes";
        archivedActiveNotesButton.textContent = "Active notes";
    } else {
        screenTitle.textContent = "My notes";
        archivedActiveNotesButton.textContent = "Archived notes";
    }

    try {
        let respuesta = await fetch(dir);
        notesList = await respuesta.json();

    } catch (error) {
        console.log(error);
    }
}

let addButtonsEventListeners = () => {
    try {
        archivedActiveNotesButton.addEventListener("click", e => {

            archivedSection = !archivedSection;
            let str = archivedSection ? "archived" : "active";

            const body = document.getElementById("body");

            changeColors();
            disableCreateButton();

            fetchNotes().then(paintNotes);
            e.stopPropagation();
        })

        createNoteButton.addEventListener("click", e => {

            document.getElementById("newNoteTitle").value = "";
            document.getElementById("newNoteText").value = "";
            createNoteModal.querySelector(".modal-content").id = "null";

            e.stopPropagation();
        })

        document.getElementById("createNoteButtonModal").addEventListener("click", e => {
            console.log("Buenas");
            let title = document.getElementById("newNoteTitle").value;
            let text = document.getElementById("newNoteText").value;
            let id = createNoteModal.querySelector(".modal-content").id;

            if (id != "null") {
                let note = {
                    id: id,
                    title: title,
                    text: text,
                    archived: false
                }
                updateNote(note);
            } else {
                let note = {
                    title: title,
                    text: text,
                    archived: false
                }
                createNote(note);
            }

            e.stopPropagation();
        })


    } catch (error) {
        console.log(error);
    }
}

const paintNotes = () => {
    const fragmento = document.createDocumentFragment();

    notesList.sort((x1, x2) => {
        if (x1.updatedAt > x2.updatedAt) return -1;
        if (x1.updatedAt < x2.updatedAt) return 1;
        return 0;
    });

    for (let i = 0; i < notesList.length; i++) {
        noteTemplate.querySelector(".card-title").textContent = notesList[i].title
        noteTemplate.querySelector(".card-text").textContent = notesList[i].text

        let noteTemplate2 = noteTemplate.cloneNode(true);

        noteTemplate2.getElementById("deleteButton").addEventListener("click", e => {
            deleteNote(notesList[i].id);
            e.stopPropagation()
        })
        noteTemplate2.getElementById("editButton").addEventListener("click", e => {
            document.getElementById("newNoteTitle").value = notesList[i].title;
            document.getElementById("newNoteText").value = notesList[i].text;
            createNoteModal.querySelector(".modal-content").id = notesList[i].id;
            e.stopPropagation()
        })
        noteTemplate2.getElementById("archiveActiveButton").addEventListener("click", e => {
            notesList[i].archived = !archivedSection;
            updateNote(notesList[i]);
            e.stopPropagation()
        })
        fragmento.appendChild(noteTemplate2)
    }

    notesColumn.innerHTML = "";
    notesColumn.appendChild(fragmento)

}


let deleteNote = async (id) => {

    let str = "http://localhost:4000/notes/" + id;
    try {
        let respuesta = await fetch(str, {
            method: 'DELETE'
        });

        for (let i = 0; i < notesList.length; i++) {
            if (notesList[i].id == id) {
                notesList.splice(i, 1);;
                break;
            }

        }

        paintNotes();

    } catch (error) {
        console.log(error);
    }
}

let updateNote = async (note) => {

    let str = "http://localhost:4000/notes/" + note.id;
    try {
        let respuesta = await fetch(str, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: note.title, text: note.text, archived: note.archived })
        });


        if (note.archived != archivedSection) {
            for (let i = 0; i < notesList.length; i++) {
                if (notesList[i].id == note.id) {
                    notesList.splice(i, 1);
                    break;
                }
            }
        } else {
            for (let i = 0; i < notesList.length; i++) {
                if (notesList[i].id == note.id) {
                    notesList[i].title = note.title;
                    notesList[i].text = note.text;
                    break;
                }
            }
        }

        paintNotes();

    } catch (error) {
        console.log(error);
    }
}

let createNote = async (note) => {
    let str = "http://localhost:4000/notes/";
    try {
        let respuesta = await fetch(str, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: note.title, text: note.text, archived: note.archived })
        });
        
        fetchNotes().then(paintNotes);
    } catch (error) {
        console.log(error);
    }
}

let changeColors = () => {

    //changeColors
    if (archivedSection) {
        body.classList.add('bg-tertiary');
        body.classList.remove('bg-secondary');
        noteTemplate.getElementById("noteCard").classList.add('bg-darkGrey1');
        noteTemplate.getElementById("noteCard").classList.remove('bg-beige');
        noteTemplate.getElementById("archiveActiveButtonImg").setAttribute("src", "./assets/activate.png");
    } else {
        body.classList.add('bg-secondary');
        body.classList.remove('bg-tertiary');
        noteTemplate.getElementById("noteCard").classList.add('bg-beige');
        noteTemplate.getElementById("noteCard").classList.remove('bg-darkGrey1');
        noteTemplate.getElementById("archiveActiveButtonImg").setAttribute("src", "./assets/archive.png");
    }
}

let disableCreateButton = () => {

    //changeColors
    if (archivedSection) {
        createNoteButton.style.display = "none"
    } else {
        createNoteButton.style.display = "block"
    }
}
