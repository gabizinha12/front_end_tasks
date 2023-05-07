var urlBase = `http://localhost:8080/tasks`;

function listAllTasks() {
  $(document).ready(function () {
    $.ajax({
      url: "http://localhost:8080/tasks",
      type: "get",
      dataType: "json",
      success: function (response) {
        const listTasks = document.getElementById("listTasks");
        for (var i in response) {
          const liTitle = document.createElement("li");
          const liDescription = document.createElement("li");
          const liDeadline = document.createElement("li");
          const ul = document.createElement("ul");
          liDescription.innerHTML += `${response[i].description}`;
          liTitle.innerHTML += `${response[i].title}`;
          liDeadline.innerHTML += `${response[i].deadline}`;
          ul.id = `${response[i].id}`;


          const btnDelete = createDeleteButton();
          const btnUpdate = createUpdateButton();
          listTasks.appendChild(ul)
          listTasks.appendChild(liTitle);
          listTasks.appendChild(liDescription);
          listTasks.appendChild(liDeadline);
          listTasks.appendChild(btnDelete);
          listTasks.appendChild(btnUpdate);
          // const array = Array.from(element)
          var element = $("ul").attr("id")
          console.log(element[0])


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

function deleteTask(id) {
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

function createDeleteButton() {
  var btnDelete = document.createElement("input");
  btnDelete.value = "Delete";
  btnDelete.type = "button";
  btnDelete.title = "Delete";
  btnDelete.className = "buttonForm";
  btnDelete.onclick = deleteTask;
  return btnDelete;
}

function createUpdateButton() {
  var btnUpdate = document.createElement("input");
  btnUpdate.value = "Update";
  btnUpdate.type = "button";
  btnUpdate.className = "buttonForm";
  btnUpdate.onclick = updateTask;
  return btnUpdate;
}


function getULid() {
  let element = $("ul").attr("id")
  element.map(function(el) {
  return el.id;
  });

 }