var listaAtividades = document.getElementById("listaAtividades");
var urlBase = "http://localhost:8080/tasks";

function listarTarefas() {
  $(listaAtividades).ready(function () {
    $.ajax({
      url: "http://localhost:8080/tasks",
      type: "get",
      dataType: "json",
      success: function (response) {
        var listaTasks = response;
        console.log(response);
        for (var i = 0; i < listaTasks.length; i++) {
          var task = listaTasks[i];
          const ulId = document.createElement("ul");
          const title = document.createElement("p");
          const description = document.createElement("p");
          const deadline = document.createElement("p");
          title.innerHTML = `${task.title}`;
          description.innerHTML = `${task.description}`;
          deadline.innerHTML = `${task.deadline}`;
          title.innerHTML = `${task.title}`;
          ulId.id = task.id;
          const botaoDelete = criaBotaoDelete();
          const botaoUpdate = criaBotaoUpdate();
          criaBotaoUpdate();          
          pegaIdTarefa();
          listaAtividades.appendChild(title);
          listaAtividades.appendChild(ulId);
          listaAtividades.appendChild(description);
          listaAtividades.appendChild(deadline);
          listaAtividades.appendChild(botaoDelete);
          listaAtividades.appendChild(botaoUpdate);
        }
      },
    });
  });
}
function pegaIdTarefa() {
  $.ajax({
    url: "http://localhost:8080/tasks",
    type: "get",
    dataType: "json",
    success: function (response) {
      var listaTasks = response;
      console.log(response);
      for (var i = 0; i < listaTasks.length; i++) {
        var task = listaTasks[i];
        const taskId = task.id;
        console.log(taskId);      
      }
      atualizarTarefa(response.id)
    },
  });
}


function criarTarefa() {
  var form = $("#Idform").serializeArray();
  var obj = {
    title: form[0].value,
    description: form[1].value,
    deadline: form[2].value,
  };
  var objJson = JSON.stringify(obj);
  console.log(obj);
  $.ajax({
    async: true,
    type: "POST",
    url: urlBase + "/task/create",
    contentType: "application/json",
    data: objJson,
    success: function (data) {
      console.log(data);
      window.location.reload();
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function atualizarTarefa(id) {
  var form = $("#Idform").serializeArray();
  var obj = {
    title: form[0].value,
    description: form[1].value,
    deadline: form[2].value,
  };
  var objJson = JSON.stringify(obj);
  $.ajax({
    async: true,
    type: "PUT",
    crossDomain: true,
    url: urlBase + "/update/" + id,
    contentType: "application/json",
    data: objJson,
    success: function (data) {
      console.log(data);
      window.location.reload();
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function deletarTarefa(id) {
  $.ajax({
    async: true,
    type: "DELETE",
    crossDomain: true,
    url: urlBase + "/delete/" + id,
    contentType: "application/json",
    success: function () {
      window.location.reload();
    },
    error: function (err) {
      console.log(err);
    },
  });
}


function criaBotaoDelete() {
  const deleteButton = document.createElement("input");
  deleteButton.value = "Deletar tarefa";
  deleteButton.type = "button";
  deleteButton.onclick = deletarTarefa;
  return deleteButton;
}

function criaBotaoUpdate() {
  const updateButton = document.createElement("input");
  updateButton.value = "Atualizar tarefa";
  updateButton.type = "button";
  updateButton.onclick = atualizarTarefa;
  return updateButton;
}
