
/* global: get_values, set_values */

var gui = require('nw.gui');

function list_elem(original, expanded) {
  var input = $("<input></input>");
  input.val(original);
  input.addClass("inputbox");
  var label = $("<div></div>");
  label.html(expanded);
  var div = $("<div></div>");
  div.addClass("elem");
  div.append(input);
  div.append(label);
  return div;
}

function elem_val(obj) {
  return obj.children().val();
}

function refresh() {
  get_values(function(err, original, expanded) {
    if (err) alert("get error!");
    else {
      $("#disp").html("");
      for (var i=0; i<original.length; i++) {
        var o = original[i];
        var e = expanded[i];
        $("#disp").append(list_elem(o, e));
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
  $("#disp").append(list_elem("", "&nbsp;"));
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

$("#a_github").click(function() {
  gui.Shell.openExternal("https://github.com/blukat29/nw-pathedit");
});

