let urlBase = `tasks-api-production-84ef.up.railway.app/tasks`;
let listIds = [];

function listAllTasks() {
  $(document).ready(function () {
    listIds = [];
    $.ajax({
      url: urlBase,
      type: "get",
      dataType: "json",
      success: function (response) {
        const $listTasks = document.getElementById("listTasks");
        for (let i in response) {
          let id = response[i].id;
          listIds.push[id];
          const $data = `<div id={${response[i].id}}><ul><li>${response[i].title}</li><li>${response[i].description}</li> <li>${response[i].deadline}</li></ul><button onclick="deleteTask(${id})" class="buttonForm">Apagar</button><button onclick="updateTask(${id})" class="buttonForm">Atualizar</button></div>`;
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
  formatDate(obj.deadline);
  console.log(obj);
  $.ajax({
    async: true,
    type: "POST",
    url: urlBase + "/task/create",
    contentType: "application/json",
    data: objJson,
    success: function (data) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tarefa criada com sucesso',
        showConfirmButton: false,
        timer: 1500
      })
      
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
  var obj = {title: form[0].value,
  description: form[1].value,
  deadline: form[2].value
  };
  var objJson = JSON.stringify(obj);
  formatDate(obj.deadline);

  $.ajax({
    async: true,
    type: "PUT",
    crossDomain: true,
    url: urlBase + "/update/" + id,
    contentType: "application/json",
    data: objJson,
    success: function (data) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tarefa atualizada com sucesso',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();
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
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Tarefa deletada com sucesso',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload();

    },
    error: function (err) {
      console.log(err);
    },
  });
}

function formatDate(str) {
return  moment().format(str);
} 