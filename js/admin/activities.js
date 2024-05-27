// Import Statements
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { setCookie, getCookie } from '../cookies.js';
import { hashFunction } from '../hash.js';

// Create a single supabase client
const supabase = createClient('https://zndpnqsommwahmmdkmmc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZHBucXNvbW13YWhtbWRrbW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyOTA0MDMsImV4cCI6MjAzMTg2NjQwM30.SOviPkL0lHuGRIP0OLMFCPXq9KhixmPEB4s6Z5Arcjk');

// Create references to UI elements
const navbar = document.getElementById("navbar-container");
const hiddenContent = document.getElementById("hidden-container");
const loginForm = document.getElementById("login-form");
const pwInput = document.getElementById("pwInput");
const pwButton = document.getElementById("pwSubmit");
const logoutButton = document.getElementById("adminLogout");
const refreshButton = document.getElementById("refresh");

// Create references to Text UI elements
const mainHeader = document.getElementById("main-header");
//// Users
const numUsers = document.getElementById("userCount");

// Create reference to UI elements to add user
const idInput = document.getElementById("idInput");
const nameInput = document.getElementById("nameInput");
const nicknameInput = document.getElementById("nicknameInput");
const sumbitButton = document.getElementById("submitButton");

// Create Reference to the table
const table = document.getElementById("userStats");

// Create Static Password Variable
const passwd = "59860170";

// Add Event Listeners
pwButton.addEventListener("click", checkPassword);
logoutButton.addEventListener("click", logout);
refreshButton.addEventListener("click", getDetails);
sumbitButton.addEventListener("click", addUser);

// A function to add a user
async function addUser()
{
    console.log("Adding User");
    const {data:fetchData, error:fetchError} = await supabase.from("People").select("*").eq("PersonID", idInput.value);
    if(fetchData.length > 0)
    {
        console.log("ID Already Being Used");
        return;
    }
    else
    {
        const {error} = await supabase.from("People").insert({PersonID: idInput.value, Name: nameInput.value, Nickname: nicknameInput.value});
        getDetails();
    }
}

// A function to refresh the screen
async function getDetails()
{
    console.log("Refreshing Details");
    clearTable();
    // User Data
    const {data:userData, error:userError} = await supabase.from("People").select("*").order("PersonID", {ascending: true});
    console.log(userData);
    if(userData != null)
    {
        numUsers.innerText = "Number of Users: " + userData.length;
        for(let i = 0; i < userData.length; i++)
        {
            // Create Table elements
            var newRow = document.createElement("tr");
            var id = document.createElement("td");
            id.innerText = userData[i].PersonID;
            var name = document.createElement("td");
            name.innerText = userData[i].Name;
            var nickname = document.createElement("td");
            nickname.innerText = userData[i].Nickname;
            var totalPoints = document.createElement("td");
            totalPoints.innerText = userData[i].Score;
            var buttonBox = document.createElement("td");
            var button = document.createElement("button");
            button.innerText = "Remove User";
            buttonBox.appendChild(button);

            // Add event listenet
            button.addEventListener("click", function(){deleteUser(userData[i].PersonID)})

            // Add children to objects
            newRow.appendChild(id);
            newRow.appendChild(name);
            newRow.appendChild(nickname);
            newRow.appendChild(totalPoints);
            newRow.appendChild(buttonBox)

            table.appendChild(newRow);
        }
    }
    else
    {
        numUsers.innerText = "Number of Users: Unknown";
        console.log("No User Data Found");
        return;
    }
}

async function deleteUser(id)
{
    console.log("Removing: " + id);
    const {error} = await supabase.from("People").delete().eq("PersonID", id);
    if(error != null)
    {
        console.log(error);
    }
    getDetails();
}

// A function to toggle hidden elements
function showHidden(show)
{
    if(show)
    {
        // Show Elements
        navbar.style.display = "block";
        hiddenContent.style.display = "block";

        // Hide the Login Form
        loginForm.style.display = "none";

        // Change the heading
        mainHeader.innerText = "User Dashboard";
    }
    else
    {
        // Hide Elements
        navbar.style.display = "none";
        hiddenContent.style.display = "none";

        // Show the Login Form
        loginForm.style.display = "block";

        // Change the heading
        mainHeader.innerText = "Login to view";
    }
}

// A function to check if it is the correct password
async function checkPassword()
{
    var pswd = hashFunction(pwInput.value);
    //console.log(pswd);
    if(pswd == passwd)
    {
        showHidden(true);
        setCookie("adminPassword", pswd, 1);
    }
}

// A function to log the user out
async function logout()
{
    showHidden(false);
    setCookie("adminPassword", "void", 1);
}

// A function to check any cookies
async function checkCookie()
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

// Clears the Leaderboard
async function clearTable()
{
    console.log("Clear Table");
    if(table.children.length > 1)
    {
        for(let i = 0; i <= table.children.length; i++)
        {
            table.removeChild(table.children[1]);
        }
    }
}

showHidden(false);
checkCookie();
getDetails();