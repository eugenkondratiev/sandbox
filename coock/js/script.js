;

const logButton = document.getElementById("login-test");
logButton.addEventListener('click', ()=> {
    window.open("/coock/index.html?login=xxx&pass=qqq", "_self");

});

const logAdminButton = document.getElementById("login-admin");
logAdminButton.addEventListener('click', ()=> {
    window.open("/coock/index.html?login=kes&pass=4414", "_self");

});


const logPmButton = document.getElementById("login-pm");
logPmButton.addEventListener('click', ()=> {
    window.open("/coock/index.html?login=olga&pass=31415", "_self");

});

const logoutButton = document.getElementById("logout-test");
logoutButton.addEventListener('click', ()=> {
    window.open("/coock/index.html?logout=true", "_self");
    
});


