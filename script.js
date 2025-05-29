document.addEventListener('DOMContentLoaded', () => {
    // Get references to our HTML elements using their IDs
    const newTaskInput = document.getElementById('newTask');
    const addTaskButton = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Helper function to get the current time formatted nicely
    function getCurrentFormattedTime() {
        const now = new Date(); // Get the current date and time
        const hours = String(now.getHours()).padStart(2, '0'); // Get hours (e.g., 5 -> "05")
        const minutes = String(now.getMinutes()).padStart(2, '0'); // Get minutes (e.g., 7 -> "07")
        return `${hours}:${minutes}`; // Returns something like "08:45"
    }

    // Function to add a new task to the list
    function addTask() {
        const taskText = newTaskInput.value.trim(); // Get text from input, remove leading/trailing spaces

        // Only add a task if the input is not empty
        if (taskText !== '') {
            // Create a new list item (<li>) for the task
            const listItem = document.createElement('li');

            // Create a container div for the task text and time
            const taskContentDiv = document.createElement('div');
            taskContentDiv.classList.add('task-content');

            // Create a span for the actual task description
            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;
            taskSpan.classList.add('task-text');

            // Create a span for the time the task was added
            const timeSpan = document.createElement('span');
            timeSpan.classList.add('task-time');
            timeSpan.textContent = `(${getCurrentFormattedTime()})`;

            // Assemble the text and time parts
            taskContentDiv.appendChild(taskSpan);
            taskContentDiv.appendChild(timeSpan);

            // Create the delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete'; // Text on the button
            deleteButton.classList.add('delete-btn'); // Add a class for styling

            // Append all parts to the listItem
            listItem.appendChild(taskContentDiv); // Add the task text and time container
            listItem.appendChild(deleteButton); // Add the delete button

            // Add the new list item to our main task list (the <ul>)
            taskList.appendChild(listItem);

            // Clear the input field for the next task
            newTaskInput.value = '';
        }
    }

    // --- Event Listeners ---

    // 1. When the "Add" button is clicked, add the task
    addTaskButton.addEventListener('click', addTask);

    // 2. When the user presses a key in the input field
    newTaskInput.addEventListener('keypress', (event) => {
        // If the pressed key is "Enter", also add the task
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // 3. Delegation: Handle clicks on both tasks (for 'completed') and delete buttons
    taskList.addEventListener('click', (event) => {
        // Check if the clicked element (or its parent) is a delete button
        if (event.target.classList.contains('delete-btn')) {
            // If it's a delete button, remove its parent <li> (the whole task item)
            event.target.closest('li').remove();
        } else {
            // If it's not a delete button, assume it's a click on the task itself
            // Find the closest 'li' (list item) parent of the clicked element
            const clickedListItem = event.target.closest('li');

            // If an 'li' was found (meaning a task was clicked)
            if (clickedListItem) {
                // Toggle the 'completed' class on that list item.
                clickedListItem.classList.toggle('completed');
            }
        }
    });
});
