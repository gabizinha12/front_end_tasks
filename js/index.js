var tasksDiv = document.getElementById("tasksDiv");

function listarTarefas() {
  $.ajax({
    url: "http://localhost:8080/tasks",
    type: "get",
    dataType: "json",
    success: function (data) {
      console.log(data);
      var ul = document.createElement("ul");
      for (var i in data) {
        var li = document.createElement("li");
        var pDescription = document.createElement("p");
        var pDeadline = document.createElement("p");
        li.innerHTML = JSON.stringify(data[i].title);
        pDescription.innerHTML = JSON.stringify(data[i].description);
        pDeadline.innerHTML = JSON.stringify(data[i].deadline);
        ul.appendChild(li);
        ul.appendChild(pDescription);
        ul.appendChild(pDeadline);
        tasksDiv.appendChild(ul);
      }
      console.log(data);
    },
  });
}

function criarTarefa() {
  console.log("Criar tarefa");
}
