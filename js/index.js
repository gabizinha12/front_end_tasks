const tasksDiv = document.getElementById('tasksDiv');

function fetchTasks() {
    return fetch('http://localhost:8080/tasks')
        .then(response => {
                console.log(response); // Logs the response
                return response.body;
                }
              );
   }
   console.log(fetchTasks()); // Returns Promise