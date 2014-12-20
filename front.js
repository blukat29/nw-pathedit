
/* global: get_values, set_values */

function list_elem(data) {
  var div = $("<div></div>");
  div.html(data);
  return div;
}

function display() {
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

$("#btnload").click(function() {
  display();
})

function collect() {
  var arr = [];
  $("#disp").children().each(function() {
    arr.push(this.innerHTML);
  });
  set_values(arr, function(err) {
    if (err) alert("Error!");
    else alert("Success");
  });
}

$("#btncoll").click(function() {
  collect();
});

