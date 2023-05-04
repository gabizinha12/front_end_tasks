var tasksDiv = document.getElementById("tasksDiv");
var urlBase = "http://localhost:8080/tasks"

function listarTarefas() {
  $.ajax({
    url: "http://localhost:8080/tasks",
    type: "get",
    dataType: "json",
    success: function (data) {
      console.log(data);
      var ul = document.createElement("ul");
      ul.id = "idList";
      for (var i in data) {
        var li = document.createElement("li");
        var pDescription = document.createElement("p");
        var pDeadline = document.createElement("p");
        li.innerHTML = JSON.stringify(data[i].title);
        li.id = data[i].id;
        pDescription.innerHTML = JSON.stringify(data[i].description);
        pDeadline.innerHTML = JSON.stringify(data[i].deadline);
        ul.appendChild(li);
        ul.appendChild(pDescription);
        ul.appendChild(pDeadline);
        tasksDiv.appendChild(ul);
        var btnDelete = criarBtnDelete();
        var btnUpdate = criarBtnUpdate();
        li.appendChild(btnUpdate);
        li.appendChild(btnDelete);
      }
      console.log(data);
    },
  });
}

function criarTarefa(){
  var form = $("#Idform").serializeArray();
  var obj = {"title": form[0].value, "description": form[1].value , "deadline": form[2].value}
  var objJson= JSON.stringify(obj);
  $.ajax({
      async: true,
      type: "POST",
      url: urlBase + "/task/create",
      contentType: "application/json",
      data: objJson,
      success: function(data)
      {
        console.log(data);
        window.location.reload();
      },
      error: function(err)
      {
        console.log(err);
      }
  });
};


function atualizarTarefa() {
  var form = $("#Idform").serializeArray();
  var obj = {"title": form[0].value, "description": form[1].value , "deadline": form[2].value}
  var objJson= JSON.stringify(obj);
  var li = $(this).parent();
  $.ajax({
      async: true,
      type: "PUT",
      url: urlBase + "/update/" + li[0].id,
      contentType: "application/json",
      data: objJson,
      success: function(data)
      {
        console.log(data);
        window.location.reload();
      },
      error: function(err)
      {
        console.log(err);
      }
  });
}

function deletarTarefa() {
  var li = $(this).parent();
  var obj = {"id":li[0].id}
  $.ajax({
    async: true,
    type: "DELETE",
    url:  urlBase + "/delete/"+ li[0].id,   
    contentType: "application/json",
    data: obj,
    success: function()
    {
      window.location.reload();
    },
    error: function(err)
    {
      console.log(err);
    }
});
}

function criarBtnDelete(){
  var btnDelete = document.createElement("input");
  btnDelete.value = "Delete";
  btnDelete.type = "button";
  btnDelete.onclick = deletarTarefa;
  return btnDelete;
}

function criarBtnUpdate() {
  var btnUpdate = document.createElement("input");
  btnUpdate.value="Update"
  btnUpdate.type = "button"
  btnUpdate.onclick = atualizarTarefa;
  return btnUpdate;
}