var listaAtividades  = document.getElementById("listaAtividades");
var urlBase = "http://localhost:8080/tasks"

function listarTarefas() {

  $(listaAtividades).ready(function(){
    $.ajax({url: "http://localhost:8080/tasks", type: "get", dataType: "json", 
    success: function(response) {
      var listaTasks = response;
        console.log(response);
        for(var i = 0; i < listaTasks.length; i++) {
          var task = listaTasks[i];
          const liId = document.createElement("li");
          const title = document.createElement("p");
          const description = document.createElement("p")
          const deadline = document.createElement("p")
          liId.id = task.id;
          console.log(task.id)
          title.innerHTML= `${task.title}`
          description.innerHTML = `${task.description}`
          deadline.innerHTML = `${task.deadline}`
          title.innerHTML = `${task.title}`
          listaAtividades.appendChild(title);
          listaAtividades.appendChild(liId);
          listaAtividades.appendChild(description);
          listaAtividades.appendChild(deadline);

        }
      }
    })
  });
};


function criarTarefa(){
  var form = $("#Idform").serializeArray();
  var obj = {"title": form[0].value, "description": form[1].value , "deadline": form[2].value}
  var objJson= JSON.stringify(obj);
  console.log(obj)
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


function atualizarTarefa(id) {
  var form = $("#Idform").serializeArray();
  var obj = {"title": form[0].value, "description": form[1].value , "deadline": form[2].value}
  var objJson= JSON.stringify(obj);
  $.ajax({
      async: true,
      type: "PUT",
      url: urlBase + "/update/" + id,
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

function deletarTarefa(id) {
 
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
