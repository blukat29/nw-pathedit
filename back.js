
var Winreg = require('winreg');

var regkey = new Winreg({
    hive: Winreg.HKLM,
    key: "\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment"
});

var name = "TestPath";

function get_values(callback) {
  regkey.get(name, function(err, data) {
    if (err) {
      callback(null);
    }
    else {
      var raw = data.value.split(";");
      var f = raw.filter(function(elem) {
        return (elem.length > 0);
      });
      callback(f);
    }
  });
}

function set_values(arr, callback) {
  var raw = arr.join(";");
  regkey.set(name, "REG_EXPAND_SZ", raw, callback);
}

