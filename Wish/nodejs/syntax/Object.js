var members = ["wish", "gonu", "sony"];
console.log(members[1]);

var i = 0;
while (i < members.length) {
  console.log("array loop", members[i]);
  i++;
}

var roles = { my_nick: "wish", my_friend: "gonu", my_name: "sony" };
console.log(roles.my_name);

for (var key in roles) {
  //console.log("key :", key);
  //console.log("value :", roles[key]);
  console.log("key :", key, "/ value :", roles[key]);
}
