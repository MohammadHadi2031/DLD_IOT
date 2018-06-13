console.log('hello world');
// objects init
var btn_signup = document.querySelector(".btn_signup_js");
var txt_username = document.querySelector(".txt_username_js");
var txt_pass= document.querySelector(".txt_pass_js");
var txt_channelID = document.querySelector(".txt_channelID_js");
// events 

var btn_signup_click = function(){

    //console.log('signup clicked');
    //console.log(txt_username.value);
    var userJSON =  localStorage.getItem('users');
    if(userJSON != null && userJSON != "")
        users = JSON.parse(userJSON);
   

    if(txt_username.value =="" )
         console.log('User name is empty. \nPlease enter your username.');
    else if(txt_pass.value == "")
        console.log("Please enter your password");
    else if(txt_channelID.value == "")
        console.log("Please enter your Channel ID"); 
    else if(users.some(e=> e.username === txt_username.value) )
        console.log("this Username already exists. Please enter another username");
    else
    {
        var newuser = {
            username: txt_username.value,
            pass : txt_pass.value,
            channelID : txt_channelID.value,
        };
        users.push(newuser);
        localStorage.setItem('users', JSON.stringify(users))
    }
}

var users =[];

btn_signup.addEventListener("click", btn_signup_click);