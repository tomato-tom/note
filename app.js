// Get elements
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editIndex = -1; // To keep track of the note being edited

// Function to render notes on page
function renderNotes() {
    notesContainer.innerHTML = ''; // Clear previous notes

    notes.forEach((note, index) => {
        // Create a div for each note
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        
        const noteText = document.createElement('p');
        noteText.textContent = note;

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('editBtn');
        editBtn.addEventListener('click', () => {
            editNote(index);
        });

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', () => {
            deleteNote(index);
        });

        // Append note, edit, and delete button to div
        noteDiv.appendChild(noteText);
        noteDiv.appendChild(editBtn);
        noteDiv.appendChild(deleteBtn);
        
        // Append the note div to the notes container
        notesContainer.appendChild(noteDiv);
    });
}

// Function to add or update a note
function addNote() {
    const note = noteInput.value.trim();
    if (note) {
        if (editIndex === -1) {
            // Add new note
            notes.push(note);
        } else {
            // Update the note being edited
            notes[editIndex] = note;
            editIndex = -1; // Reset edit index after updating
        }
        localStorage.setItem('notes', JSON.stringify(notes)); // Save to localStorage
        noteInput.value = ''; // Clear input
        addNoteBtn.textContent = 'Add Note'; // Reset button text
        renderNotes(); // Re-render the notes
    }
}

// Function to delete a note
function deleteNote(index) {
    notes.splice(index, 1); // Remove from array
    localStorage.setItem('notes', JSON.stringify(notes)); // Update localStorage
    renderNotes(); // Re-render the notes
}

// Function to edit a note
function editNote(index) {
    noteInput.value = notes[index]; // Set the input value to the note content
    editIndex = index; // Store the index of the note being edited
    addNoteBtn.textContent = 'Update Note'; // Change button text to indicate edit mode
}

// Event listener for adding/updating a note
addNoteBtn.addEventListener('click', addNote);

// Initial render on page load
renderNotes();

