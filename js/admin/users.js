// Import Statements
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { setCookie, getCookie } from '../cookies.js';

// Create a single supabase client
const supabase = createClient('https://zndpnqsommwahmmdkmmc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZHBucXNvbW13YWhtbWRrbW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyOTA0MDMsImV4cCI6MjAzMTg2NjQwM30.SOviPkL0lHuGRIP0OLMFCPXq9KhixmPEB4s6Z5Arcjk');

// Create references to UI elements
const navbar = document.getElementById("navbar-container");
const statsbar = document.getElementById("stats-container");
const loginForm = document.getElementById("login-form");
const pwInput = document.getElementById("pwInput");
const pwButton = document.getElementById("pwSubmit");
const logoutButton = document.getElementById("adminLogout");
const refreshButton = document.getElementById("refresh");

// Create references to Text UI elements
const mainHeader = document.getElementById("main-header");
//// Users
const numUsers = document.getElementById("userCount");

// Create Reference to the table
const table = document.getElementById("userStats");

// Create Static Password Variable
const passwd = "59860170";

// Add Event Listeners
pwButton.addEventListener("click", checkPassword);
logoutButton.addEventListener("click", logout);
refreshButton.addEventListener("click", getDetails);

async function getDetails()
{
    console.log("Refreshing Details");
    // User Data
    const {data:userData, error:userError} = await supabase.from("People").select("*");
    if(userData != null)
    {
        numUsers.innerText = "Number of Users: " + userData.length;
        for(let i = 0; i < userData.length; i++)
        {
            var newRow = document.createElement("tr");
            var id = document.createElement("td");
            id = userData.PersonID;
            var name = document.createElement("td");
            name = userData.Name;
            var totalPoints = document.createElement("td");
            totalPoints = userData.Score;
        }
    }
    else
    {
        numUsers.innerText = "Number of Users: Unknown";
        console.log("No User Data Found");
        return;
    }
}

function showHidden(show)
{
    if(show)
    {
        // Show Elements
        navbar.style.display = "block";
        statsbar.style.display = "block";

        // Hide the Login Form
        loginForm.style.display = "none";

        // Change the heading
        mainHeader.innerText = "User Dashboard";
    }
    else
    {
        // Hide Elements
        navbar.style.display = "none";
        statsbar.style.display = "none";

        // Show the Login Form
        loginForm.style.display = "block";

        // Change the heading
        mainHeader.innerText = "Login to view";
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

// A function to hash a given input
function hashFunction(string) {
    return string.split('').reduce((hash, char) => {
        return char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash;
    }, 0);
}

showHidden(false);
checkCookie();
getDetails();