// Import Statements
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Create a single supabase client
const supabase = createClient('https://zndpnqsommwahmmdkmmc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZHBucXNvbW13YWhtbWRrbW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyOTA0MDMsImV4cCI6MjAzMTg2NjQwM30.SOviPkL0lHuGRIP0OLMFCPXq9KhixmPEB4s6Z5Arcjk');

// Create references to UI elements
const navbar = document.getElementById("navbar-container");
const statsbar = document.getElementById("stats-container");
const loginForm = document.getElementById("login-form");
const pwInput = document.getElementById("pwInput");
const pwButton = document.getElementById("pwSubmit");
const logoutButton = document.getElementById("adminLogout");

// Create references to Text UI elements
//// Users
const numUsers = document.getElementById("userCount");

//// Activites
const numActivities = document.getElementById("");
const numActivitiesToday = document.getElementById("");
const avgActivities = document.getElementById("");
const avgActivitiesToday = document.getElementById("");

// Create Static Password Variable
const passwd = "59860170";

// Add Event Listeners
pwButton.addEventListener("click", checkPassword);
logoutButton.addEventListener("click", logout);

// TODO Work out cookies for continuing authentication (IDEAL)
// TODO finish stats
// TODO compare hashed password

function showHidden(show)
{
    if(show)
    {
        // Show Elements
        navbar.style.display = "block";
        statsbar.style.display = "block";

        // Hide the Login Form
        loginForm.style.display = "none";
    }
    else
    {
        // Hide Elements
        navbar.style.display = "none";
        statsbar.style.display = "none";

        // Show the Login Form
        loginForm.style.display = "block";
    }
}

function checkPassword()
{
    var pswd = hashFunction(pwInput.value);
    //console.log(pswd);
    if(pswd == passwd)
    {
        showHidden(true);
        setCookie("adminPassword", pswd, 1);
    }
}

function logout()
{
    showHidden(false);
    setCookie("adminPassword", "void", 1);
}

function checkCookie()
{
    let password = getCookie("adminPassword");
    if (password != "")
    {
        if(password == passwd)
        {
            showHidden(true);
        }
    }
    else
    {
        showHidden(false);
    }
}

function setCookie(cname, cvalue, expiryDays)
{
    const d = new Date();
    d.setTime(d.getTime() + (expiryDays*24*60*1000));
    document.cookie = cname + "=" + cvalue + ";" + "expires=" + d.toUTCString() + ";path=/";
}

function getCookie(cname)
{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for(let i = 0; i < ca.length; i++)
    {
        let c = ca[i];
        while (c.charAt(0) == ' ') 
        {
            c = c.substring(1);
        }

        if(c.indexOf(name) == 0){
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// A function to hash a given input
function hashFunction(string) {
    return string.split('').reduce((hash, char) => {
        return char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash;
    }, 0);
}

showHidden(false);
checkCookie();