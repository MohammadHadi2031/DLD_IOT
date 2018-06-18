console.log('hello world');
//constant init
const emptyUsernameMsg = 'User name is empty. \nPlease enter your username.';
const emptyPassMsg = "Please enter your password";
const emptyChannelIDMsg = "Please enter your Channel ID"; 
const ExistedUserMsg = "this Username already exists. Please enter another username";
// variable init
var users =[];
var userJSON =  localStorage.getItem('users');
var LoginState = false;
var loggedin =null;
// objects init
var btn_signup = document.querySelector(".btn_signup_js");
var btn_switch = document.querySelector(".btn_switch_js");
var txt_username = document.querySelector(".txt_username_js");
var txt_pass= document.querySelector(".txt_pass_js");
var txt_channelID = document.querySelector(".txt_channelID_js");
var lbl_channelID = document.querySelector(".lbl_channelID_js");
var epmtyUsername = document.getElementById('emptyUsername');
var epmtyPass = document.getElementById('emptyPass');
var incorrectPass = document.getElementById('incorrectPass');
var emptyChannelID = document.getElementById('emptyChannelID');
var existedUsername = document.getElementById('existedUsername');
// events 
var txt_username_blur = function()
{
   checkUsername();
}

var txt_pass_blur = function()
{
   checkPass();
}

var txt_channelID_blur = function()
{
   checkChannelID();
}

var btn_signup_click = function()
{    
    if(checkUsername() && checkPass() && checkChannelID())
    {
        if(LoginState)
        {
            var tmpUsername = txt_username.value;
            var tmpPass =txt_pass.value;
           var seluser= users.find(e=> e.username === tmpUsername);
           if(seluser.pass != tmpPass)
           {
               // incorrect pass
                incorrectPass.style.display = "block";
           }
           else
           {
               //login
               incorrectPass.style.display = "none";
               loginfcn(seluser);
           }
           
        }
        else
        {
            incorrectPass.style.display = "none";
            var newuser = {
                username: txt_username.value,
                pass : txt_pass.value,
                channelID : txt_channelID.value,
            };
            users.push(newuser);
            localStorage.setItem('users', JSON.stringify(users));
            loginfcn(newuser);
        }
      
    }
}

var btn_switch_click = function(){
    if(LoginState)
    {
        //switching to SignIn state
        lbl_channelID.style.display = "block";
        txt_channelID.style.display = "block";
        existedUsername.innerText = " *existed";
        btn_switch.textContent = "Log In";
        btn_signup.textContent = "Sign up";
        LoginState=false;
    }
    else
    {
        //switching to Login state
        lbl_channelID.style.display = "none";
        txt_channelID.style.display = "none";
        existedUsername.innerText = " *not found";
        btn_switch.textContent = "Sign up";
        btn_signup.textContent = "Log In";
        LoginState= true;
    }
    existedUsername.style.display = "none";
    epmtyUsername.style.display = "none";
    epmtyPass.style.display = "none";
    emptyChannelID.style.display = "none";

}
// methods
var loginfcn = function(_user){
    loggedin = _user;
    localStorage.setItem('loggedin', JSON.stringify(loggedin));
    window.location.assign('dash.html');
}

var checkUsername = function()
{
    if(txt_username.value =="" )
    {
        console.log(emptyUsernameMsg);
        epmtyUsername.style.display = "block";
        existedUsername.style.display =  "none";
        return 0;
    }
    else  if(LoginState ^ users.some(e=> e.username === txt_username.value) )
    {
        console.log(ExistedUserMsg);
        existedUsername.style.display =  "block";
        epmtyUsername.style.display = "none";
        return 0;
    }
    epmtyUsername.style.display = "none";
    existedUsername.style.display =  "none";
    return 1;
}

var checkPass = function()
{
    if(txt_pass.value == "")
    {
        console.log(emptyPassMsg);
        epmtyPass.style.display = "block";
        incorrectPass.style.display = "none";
        return 0;
    }
    epmtyPass.style.display = "none";
    return 1;
}

var checkChannelID = function() 
{
    if(!LoginState && txt_channelID.value == "")
    {
        console.log(emptyChannelIDMsg); 
        emptyChannelID.style.display = "block";
        return 0;
    }
    emptyChannelID.style.display = "none";
    return 1;
}
//code
if(userJSON != null && userJSON != "")
        users = JSON.parse(userJSON);
   
btn_signup.addEventListener("click", btn_signup_click);
btn_switch.addEventListener("click", btn_switch_click);
txt_username.addEventListener('blur', txt_username_blur);
txt_pass.addEventListener('blur', txt_pass_blur);
txt_channelID.addEventListener('blur', txt_channelID_blur);

