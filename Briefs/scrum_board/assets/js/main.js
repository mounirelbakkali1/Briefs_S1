var statusImg = [
  "icons8-cloud-waiting-100.png",
  "icons8-wait-96.png",
  "icons8-checkmark-96.png",
];
var arrOfTask = [];
const res = localStorage.getItem("arrOfTasks");
if (res == undefined) {
  localStorage.setItem("arrOfTasks", JSON.stringify(arrOfTasks));
  setTimeout(() => {
    window.location.reload();
  }, 1000);
} else {
  arrOfTask = JSON.parse(localStorage.getItem("arrOfTasks") || "[]");
  arrOfTask.forEach((task) => {
    addTaskNode(
      task.title,
      task.type,
      task.priority,
      task.status,
      task.date,
      task.description,
      task.ettiquette,
      task.id
    );
  });
}
function getInputs() {
  var titleUpdated = $("#taskTitle").val();
  var typeUpdated = $("#feature").is(":checked")
    ? $("#feature").val()
    : $("#bug").val();
  var priorityUpdated = $("#priorityField").find(":selected").val();
  var bgUpdated = $("#bgField").find(":selected").val();
  var statusUpdated = $("#statusField").find(":selected").val();
  var dateUpdated = $("#date").val();
  var descriptionUpdated = $("#description").val();
  return {
    title: titleUpdated,
    type: typeUpdated,
    priority: priorityUpdated,
    bg: bgUpdated,
    status: statusUpdated,
    date: dateUpdated,
    description: descriptionUpdated,
  };
}
function checkStatus(status) {
  return status == "To Do"
    ? statusImg[0]
    : status == "In Progress"
    ? statusImg[1]
    : statusImg[2];
}
function addTaskNode(
  title,
  type,
  priority,
  status,
  dateTask,
  description,
  bg,
  id
) {
  var card = `
  <div class="card px-2 w-100 task" style="width: 18rem;background-color:${bg}!important;" id="task_${id}">
<div class="iconProgress">
    <img class="card-image" src="./assets/img/${checkStatus(
      status
    )}" alt="" srcset="">
  </div>
  <div class="card-body pb-1">
  <button class="updateTask"><img src="./assets/img/icons8-edit-64.png" alt="" style="width: 13px; opacity: 0.6;"></button>
  <button class="delTask"><img src="./assets/img/icons8-delete-64.png" alt="" style="width: 13px;" ></button>
    <h5 class="card-text">${title}</h5>
    <!--Date-->
    <p>#1 assigned in ${dateTask}</p>
    <!--task details-->
    <p class="card-text">${description}</p>
    <!--card footer-->
    <div class="card-footer bg-transparent d-flex justify-content-end border-top-0 pt-1">
      <button class="feature">${type}</button>
      <!--task priority-->
      <button class="priority">${priority}</button>
    </div>
  </div>
</div>`;
  if (status == "To Do") {
    $(card).appendTo("#toDo");
  } else if (status == "In Progress") {
    $(card).appendTo("#doing");
  } else if (status == "Done") {
    $(card).appendTo("#done");
  }
  clear();
}
function verifyInputs(title, date, description) {
  let valid = true;
  if (
    title == "" ||
    title == null ||
    date.getDay == NaN ||
    description == "" ||
    description == null
  ) {
    valid = false;
  }
  return valid;
}
function clear() {
  $("#taskTitle").val("");
  $("#description").val("");
  $("#validation").text("");
  $("#date").valueAsDate = new Date("yyyy-mm-dd");
  $("#feature").attr("checked", false);
  $("#bug").attr("checked", false);
}
$(document).ready(function () {
  $("#addTask").click(function () {
    $("#addTaskPage").toggle("slow");
  });
  $("#cancel").click(function () {
    $("#addTaskPage").hide("slow");
    clear();
  });
  $(".delTask").click(function () {
    var id_to_be_deleted = $(this).parent().parent().attr("id").split("_")[1];
    const pos = arrOfTask.map((t) => t.id).indexOf(parseInt(id_to_be_deleted));
    //alert(pos);
    arrOfTask.splice(pos, 1);
    localStorage.setItem("arrOfTasks", JSON.stringify(arrOfTask));
    window.location.reload();
  });
  $(".updateTask").click(function () {
    const id_to_be_updated = $(this).parent().parent().attr("id").split("_")[1];
    const position = arrOfTask
      .map((t) => t.id)
      .indexOf(parseInt(id_to_be_updated));
    $("#addTaskPage").show("slow");
    $("#addTaskPage h3").text("Edit task");
    $("#addTaskPage #add").text("Update");
    $("#add").attr("id", "update");
    $("#description").val(arrOfTask[position].description);
    $("#taskTitle").val(arrOfTask[position].title);
    $("#date").val(arrOfTask[position].date);
    const type = arrOfTask[position].type;
    const priority = arrOfTask[position].priority;
    const ettiquette = arrOfTask[position].ettiquette;
    const status = arrOfTask[position].status;
    if (type == "feature") $("#feature").attr("checked", true);
    else $("#bug").attr("checked", true);
    $('option[value="' + priority + '"]').attr("selected", true);
    $('option[value="' + ettiquette + '"]').attr("selected", true);
    $('option[value="' + status + '"]').attr("selected", true);
    $("#update").click(function () {
      let changes = getInputs();
      let updatedNode = {
        id: position,
        title: changes.title,
        type: changes.type,
        priority: changes.priority,
        ettiquette: changes.bg,
        status: changes.status,
        date: changes.date,
        description: changes.description,
      };
      if (verifyInputs(changes.title, changes.date, changes.description)) {
        arrOfTask.splice(position, 1, updatedNode); /// remplace object in position with updated node
        localStorage.setItem("arrOfTasks", JSON.stringify(arrOfTask));
        window.location.reload();
      } else {
        $("#validation").text("invalid values or empty field detected !");
      }
    });
    return false;
  });

  $("#add").click(function () {
    const inputsValues = getInputs();
    if ($(this).attr("id") == "update") {
      return; // to prevent adding node
    } else {
      if (
        verifyInputs(
          inputsValues.title,
          inputsValues.date,
          inputsValues.description
        )
      ) {
        $("#addTaskPage").hide("slow");
        let task = {
          id: arrOfTask.length,
          title: inputsValues.title,
          type: inputsValues.type,
          priority: inputsValues.priority,
          etiquette: inputsValues.bg,
          status: inputsValues.status,
          date: inputsValues.date,
          description: inputsValues.description,
        };
        arrOfTask.push(task);
        localStorage.setItem("arrOfTasks", JSON.stringify(arrOfTask));
        window.location.reload();
      } else {
        $("#validation").text("Please fill all the fields!");
      }
    }
  });
});
