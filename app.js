// Get elements
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let editIndex = -1; // To keep track of the note being edited
let longPressTimer; // Timer to detect long press or right-click

// Function to render notes on page (only first 30 characters visible)
function renderNotes() {
    notesContainer.innerHTML = ''; // Clear previous notes

    notes.forEach((note, index) => {
        const truncatedNote = note.length > 30 ? note.substring(0, 30) + '...' : note;

        // Create a div for each note
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        
        const noteText = document.createElement('p');
        noteText.textContent = truncatedNote;

        // Event listener for clicking on a note to edit it
        noteDiv.addEventListener('click', () => {
            editNote(index);
        });

        // Right-click functionality (using the 'contextmenu' event) to show delete button
        noteDiv.addEventListener('contextmenu', (event) => {
            event.preventDefault(); // Suppress the browser's context menu
            showDeleteButton(noteDiv, index); // Show the delete button
        });

        // Append the note text to the div
        noteDiv.appendChild(noteText);
        
        // Append the note div to the notes container
        notesContainer.appendChild(noteDiv);
    });
}

// Function to add or update a note
function addNote() {
    const note = noteInput.value.trim();
    if (note) {
        if (editIndex === -1) {
            // Add new note to the start of the array
            notes.unshift(note);
        } else {
            // Update the note at the selected index and move it to the top
            notes.splice(editIndex, 1); // Remove the original note
            notes.unshift(note); // Add updated note to the top
            editIndex = -1; // Reset edit index after updating
        }
        localStorage.setItem('notes', JSON.stringify(notes)); // Save to localStorage
        noteInput.value = ''; // Clear input
        addNoteBtn.textContent = 'Add Note'; // Reset button text
        renderNotes(); // Re-render the notes
    }
}

// Function to show the delete button on right-click or long press
function showDeleteButton(noteDiv, index) {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', () => {
        deleteNote(index);
    });
    noteDiv.appendChild(deleteBtn); // Append delete button to the note div
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

