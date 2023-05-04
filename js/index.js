var tasksDiv = document.getElementById("tasksDiv");
var urlBase = "http://localhost:8080/tasks"

function listarTarefas() {
  $.ajax({
    url: "http://localhost:8080/tasks",
    type: "get",
    dataType: "json",
    success: function (data) {
      console.log(data);
      let i = 0;
      for (i in data) {
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        var pDescription = document.createElement("p");
        var pDeadline = document.createElement("p");
        ul.id = data.id;
        li.innerHTML = JSON.stringify(data.title);
        pDescription.innerHTML = JSON.stringify(data.description);
        pDeadline.innerHTML = JSON.stringify(data.deadline);        
        ul.appendChild(li);
        ul.appendChild(pDescription);
        ul.appendChild(pDeadline);
        tasksDiv.appendChild(ul);
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
  $.ajax({
      async: true,
      type: "PUT",
      url: urlBase + "/update/",
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
 
  $.ajax({
    async: true,
    type: "DELETE",
    url:  urlBase + "/delete/"+ id,   
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