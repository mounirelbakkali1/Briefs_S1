var imgCard1 = "icons8-cloud-waiting-100.png";
var imgCard2 = "icons8-cloud-waiting-100.png";
var imgCard3 = "icons8-wait-96.png";

function addTaskNode(title, type, priority, status, dateTask, desc) {
  let ok = true;

  var card =
    `<div class="card px-2 w-100 " style="width: 18rem;">
<div class="iconProgress">
    <img class="card-image" src="./assets/${
      status == "To do" ? imgCard1 : status == "Doing" ? imgCard2 : imgCard3
    }" alt="" srcset="">
  </div>
  <div class="card-body pb-1">` +
    (ok ? "yes" : "no") +
    `
    <h5 class="card-text">${title}</h5>
    <!--Date-->
    <p>#1 assigned in ${dateTask}</p>
    <!--task details-->
    <p class="card-text">${desc}</p>
    <!--card footer-->
    <div class="card-footer bg-transparent d-flex justify-content-end border-top-0 pt-1">
      <button class="feature">${type}</button>
      <!--task priority-->
      <button class="priority">${priority}</button>
    </div>
  </div>
</div>`;
  if (status == "To do") {
    $(card).appendTo("#toDo");
  } else if (status == "Doing") {
    $(card).appendTo("#doing");
  } else if (status == "Done") {
    $(card).appendTo("#done");
  }
  $("#taskTitle").text("");
  $("#description").text("");
  $("#date").val(new Date().toDateInputValue());
  $("#addTaskPage").hide("slow");
}

$(document).ready(function () {
  $("#addTask").click(function () {
    $("#addTaskPage").toggle("slow");
  });
  $("#cancel").click(function () {
    $("#addTaskPage").hide("slow");
  });
  $("#add").click(function () {
    var title = $("#taskTitle").val();
    var type = $("#feature").is(":checked")
      ? $("#feature").val()
      : $("#bug").val();
    var priority = $("#priorityField").find(":selected").val();
    var status = $("#statusField").find(":selected").val();
    var date = new Date($("#date").val());
    var dateTask =
      date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
    var desc = $("#description").val();
    addTaskNode(title, type, priority, status, dateTask, desc);
  });
});
