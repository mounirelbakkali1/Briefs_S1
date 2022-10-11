$(document).ready(function () {
  var prdExt = false;
  var total = 0;
  $("#toggle").click(function () {
    $(this).find("#nav-group").slideToggle("slow");
    $(this).parent().parent().find("#shoppingCart").hide();
    $(this).parent().parent().find("#suggestSignInSignUp").hide();
  });
  $("#u").click(function () {
    window.location.href = "contactUs.html";
  });
  $("#userBtn").click(function () {
    $("#toggle").find("#nav-group").hide();
    $(this).parent().parent().find("#suggestSignInSignUp").toggle();
    $(this).parent().parent().find("#shoppingCart").hide();
  });
  $("#cardBtn").click(function () {
    $("#toggle").find("#nav-group").hide();
    if (!prdExt) {
      $(this).parent().parent().find("#shoppingCart").find("#somePrd").hide();
      $(this).parent().parent().find("#shoppingCart").find("#noPrd").show();
    } else {
      $(this).parent().parent().find("#shoppingCart").find("#somePrd").show();
      $(this).parent().parent().find("#shoppingCart").find("#noPrd").hide();
    }

    $(this).parent().parent().find("#shoppingCart").toggle();
    $(this).parent().parent().find("#suggestSignInSignUp").hide();
  });
  $(".card-footer button").click(function () {
    /*swal({
      className: "swal-custom",
      title: [$(this).parent().parent().find("p:first").text()],
      text: "Go to cart , and validate your order",
      icon: "info",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "confirm Adding",
          value: true,
          visible: true,
          className: "confirm",
          closeModal: true,
        },
      },
      dangerMode: false,
    }).then((confirm) => {
      if (confirm) {*/
    $("#cardBtn").addClass("added");
    prdExt = true;
    var row = document.createElement("tr");
    var col1 = document.createElement("td");
    col1.innerHTML = $(this).parent().parent().find("h3").text();
    var col2 = document.createElement("td");
    col2.innerHTML = $(this).parent().parent().find(".prx").text();
    row.appendChild(col1);
    row.appendChild(col2);
    $("#tableOfPrd tbody")[0].appendChild(row);
    var x = parseFloat($("#tableOfPrd #total").val());
    if (isNaN(x)) x = 0;
    //console.log("getted "+parseFloat($("#tableOfPrd #ttl").val()));
    x += parseFloat($(this).parent().parent().find(".prx").text());
    total += x;
    console.log("total :" + total.toString());
    $("#total")
      .find("span")
      .text(total.toString() + " $");
    swal("Added successfuly !", "Go to cart to validate the order", {
      icon: "success",
      buttons: false,
      timer: 2000,
    });
  });
  $("#buyNow").click(function () {
    $("#shoppingCart").hide();
    swal({
      className: "swal-custom",
      title: ["Total to pay : " + $("#total").find("span").text() + "$"],
      text: "Once you validate the order ,your card will be debited !",
      icon: "info",
      buttons: {
        cancel: {
          text: "Cancel",
          value: null,
          visible: true,
          className: "",
          closeModal: true,
        },
        confirm: {
          text: "Validate",
          value: true,
          visible: true,
          className: "confirm",
          closeModal: true,
        },
      },
      dangerMode: false,
    }).then((confirm) => {
      if (confirm) {
        prdExt = false;
        total = 0;
        $("#cardBtn").removeClass("added");
        $("#tableOfPrd tbody").empty();
        $("#total").find("span").text("");
        swal("Shopping done !", "Enjoy Gamming", {
          icon: "success",
          buttons: false,
          timer: 2000,
        });
      } else {
        swal("search for other product !");
      }
    });
  });
});
