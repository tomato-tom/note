// Get elements
const noteInput = document.getElementById('noteInput');
const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

// Initialize notes array
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to render notes on page
function renderNotes() {
    notesContainer.innerHTML = ''; // Clear previous notes

    notes.forEach((note, index) => {
        // Create a div for each note
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        
        const noteText = document.createElement('p');
        noteText.textContent = note;

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', () => {
            deleteNote(index);
        });

        // Append note and button to div
        noteDiv.appendChild(noteText);
        noteDiv.appendChild(deleteBtn);
        
        // Append the note div to the notes container
        notesContainer.appendChild(noteDiv);
    });
}

// Function to add a new note
function addNote() {
    const note = noteInput.value.trim();
    if (note) {
        notes.push(note); // Add to array
        localStorage.setItem('notes', JSON.stringify(notes)); // Save to localStorage
        noteInput.value = ''; // Clear input
        renderNotes(); // Re-render the notes
    }
}

// Function to delete a note
function deleteNote(index) {
    notes.splice(index, 1); // Remove from array
    localStorage.setItem('notes', JSON.stringify(notes)); // Update localStorage
    renderNotes(); // Re-render the notes
}

// Event listener for adding a note
addNoteBtn.addEventListener('click', addNote);

// Initial render on page load
renderNotes();

