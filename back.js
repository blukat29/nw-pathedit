
var Winreg = require('winreg');

var regkey = new Winreg({
    hive: Winreg.HKLM,
    key: "\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment"
});

var name = "TestPath";

function get_values(callback) {
  regkey.get(name, function(err, data) {
    if (err) {
      callback(err);
    }
    else {
      var raw = data.value.split(";");
      var nonempty = raw.filter(function(elem) {
        return (elem.length > 0);
      });
      var expanded = nonempty.map(expandPath);
      callback(null, nonempty, expanded);
    }
  });
}

function set_values(arr, callback) {
  var raw = arr.join(";");
  regkey.set(name, "REG_EXPAND_SZ", raw, callback);
}

function expandPath(x) {
  var y = "";
  var i, j;
  while ((i = x.indexOf("%")) >= 0) {
    // Append until first occurence of %.
    y += x.substring(0,i);
    x = x.substr(i+1);

    // %% is escape for %.
    if (x.charAt(0) == "%")
      y += "%";

    // %name% is replaced by environment variable.
    else {
      j = x.indexOf("%");
      var name = x.substring(0,j);
      if (name in process.env)
        y += process.env[name];
      else
        y += "%" + name + "%";
      x = x.substr(j+1);
    }
  }
  y += x;
  return y;
}

