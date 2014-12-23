
/* global: get_values, set_values */

function list_elem(data) {
  var div = $("<div></div>");
  var input = $("<input></input>");
  input.val(data);
  input.addClass("inputbox");
  div.append(input);
  return div;
}

function elem_val(obj) {
  return obj.children().val();
}

function refresh() {
  get_values(function(arr) {
    if (!arr) alert("get error!");
    else {
      $("#disp").html("");
      for (var i=0; i<arr.length; i++) {
        $("#disp").append(list_elem(arr[i]));
      }
    }
  });
}
$(window).load(function() {
  refresh()
});
$("#btn_refresh").click(function() {
  refresh();
});

$("#btn_add").click(function() {
  $("#disp").append(list_elem(""));
});

function save() {
  var arr = [];
  $("#disp").children().each(function() {
    arr.push(elem_val($(this)));
  });
  set_values(arr, function(err) {
    if (err) alert("Error!");
    else alert("Success");
    refresh();
  });
}
$("#btn_save").click(function() {
  save();
});

