console.log('hello world');
// var init
var loggedin = JSON.parse (localStorage.getItem("loggedin"));
// objects init
var lbl_username = document.getElementById("lbl_username");
var lbl_channelID = document.getElementById("lbl_channelID");
var chart = document.getElementById("chart_js");
var btn_logout = document.getElementById("btn_logout");
// fcn
btn_logout_click = function(){
    localStorage.removeItem('loggedin');
    window.location.assign('index.html');
}
//code
lbl_username.innerText = loggedin.username;
lbl_channelID.innerText = loggedin.channelID;
chart.src="https://thingspeak.com/channels/"+ loggedin.channelID+"/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15" ;
btn_logout.onclick = btn_logout_click;
//496626
