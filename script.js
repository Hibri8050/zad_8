const themeBtn = document.getElementById('themeButton');
const toggleBtn = document.getElementById('toggleBtn');
const projectsSection = document.getElementById('projects-section');

themeBtn.addEventListener('click', () => {
    if (!document.body.classList.contains('green-theme') && !document.body.classList.contains('red-theme')) {
        document.body.classList.add('green-theme');
    } else if (document.body.classList.contains('green-theme')) {
        document.body.classList.remove('green-theme');
        document.body.classList.add('red-theme');
    } else {
        document.body.classList.remove('red-theme');
    }
});

toggleBtn.addEventListener('click', () => {
    projectsSection.classList.toggle('hidden');
});

const contactForm = document.getElementById('contactForm');
const validationMessage = document.getElementById('validationMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('userName').value;
    const surname = document.getElementById('userSurname').value;
    const email = document.getElementById('userEmail').value;
    const hasDigits = /\d/;

    if (hasDigits.test(name) || hasDigits.test(surname)) {
        validationMessage.innerText = "Błąd: Imię i nazwisko nie mogą zawierać cyfr!";
        validationMessage.style.color = "red";
        return;
    }

    if (!email.includes('@')) {
        validationMessage.innerText = "Błąd: Wprowadź poprawny adres e-mail!";
        validationMessage.style.color = "red";
        return;
    }

    validationMessage.innerText = "Formularz został wysłany pomyślnie!";
    validationMessage.style.color = "green";
    contactForm.reset();
});

async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        const skillsList = document.getElementById('skills-list');
        const projectsList = document.getElementById('projects-list');

        if (skillsList) {
            skillsList.innerHTML = "";
            data.skills.forEach(s => {
                const li = document.createElement('li');
                li.textContent = s;
                skillsList.appendChild(li);
            });
        }

        if (projectsList) {
            projectsList.innerHTML = "";
            data.projects.forEach(p => {
                const li = document.createElement('li');
                li.textContent = p;
                projectsList.appendChild(li);
            });
        }
    } catch (err) {
        console.log("Status: Oczekiwanie na plik JSON (Uruchom przez Live Server)");
    }
}

loadData();
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
    notesList.innerHTML = "";

    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note + " ";

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Usuń";

        deleteBtn.addEventListener('click', () => {
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        });

        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

addNoteBtn.addEventListener('click', () => {
    const newNote = noteInput.value.trim();

    if (newNote !== "") {
        notes.push(newNote);
        saveNotes();
        renderNotes();
        noteInput.value = "";
    }
});

renderNotes();
