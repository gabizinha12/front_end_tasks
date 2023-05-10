let urlBase = `http://localhost:8080/tasks`;
let listIds = [];

function listAllTasks() {
  $(document).ready(function () {
    listIds = [];
    $.ajax({
      url: "http://localhost:8080/tasks",
      type: "get",
      dataType: "json",
      success: function (response) {
        const $listTasks = document.getElementById("listTasks");
        for (let i in response) {
          let id = response[i].id;
          listIds.push[id];
        
          const $data = `<div id={${response[i].id}}><ul><li>${response[i].title}</li><li>${response[i].description}</li> <li>${response[i].deadline}</li></ul><button onclick="deleteTask(${id})" class="buttonForm">Apagar</button></div>`;
          $listTasks.insertAdjacentHTML("afterbegin", $data);
        }

      },
      error: function (err) {
        console.log(err);
      },
    });
  });
}

function createTask() {
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

function updateTask(id) {
  // todo: Ver como sobrescrever a tarefa já existente impressa no DOM
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
      // window.location.reload();
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function deleteTask(id) {
  console.log(id)
  $.ajax({
    async: true,
    type: "DELETE",
    crossDomain: true,
    url: urlBase + "/delete/" + id,
    contentType: "application/json",
    success: function () {
      console.log("Tarefa deletada com sucesso");
      listAllTasks();
     window.location.reload();
    },
    error: function (err) {
      console.log(err);
    },
  });
}

// function createDeleteButton() {
//   var btnDelete = document.createElement("input");
//   btnDelete.value = "Delete";
//   btnDelete.type = "button";
//   btnDelete.title = "Delete";
//   btnDelete.className = "buttonForm";
//   btnDelete.onclick = deleteTask;
//   return btnDelete;
// }

function createUpdateButton() {
  var btnUpdate = document.createElement("input");
  btnUpdate.value = "Update";
  btnUpdate.type = "button";
  btnUpdate.className = "buttonForm";
  btnUpdate.onclick = updateTask;
  return btnUpdate;
}

function getULid() {
  $("ul li").each(function () {
    var id = $(this).attr("id");
    return id;
  });
}
