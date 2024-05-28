// Import Statements
// Install the supabse-js module
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Create a single supabase client
const supabase = createClient('https://zndpnqsommwahmmdkmmc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZHBucXNvbW13YWhtbWRrbW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyOTA0MDMsImV4cCI6MjAzMTg2NjQwM30.SOviPkL0lHuGRIP0OLMFCPXq9KhixmPEB4s6Z5Arcjk');

import { setCookie, getCookie } from '../cookies.js';
import { hashFunction } from '../hash.js';

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
const numLogs = document.getElementById("userCount");

// Create Reference to the table
const table = document.getElementById("userStats");

// Create Static Password Variable
const passwd = "59860170";

// Add Event Listeners
pwButton.addEventListener("click", checkPassword);
logoutButton.addEventListener("click", logout);
refreshButton.addEventListener("click", getDetails);

// A function to refresh the screen
async function getDetails()
{
    console.log("Refreshing Details");
    clearTable();
    // User Data
    const {data:logData, error:userError} = await supabase.from("PeopleActivities").select("*").order("PersonID", {ascending: true});
    console.log(logData);
    if(logData != null)
    {
        numLogs.innerText = "Number of Users: " + logData.length;
        for(let i = 0; i < logData.length; i++)
        {
            // Create Table elements
            var newRow = document.createElement("tr");
            var logID = document.createElement("td");
            logID.innerText = logData[i].PeopleActivitiesID;
            var personID = document.createElement("td");
            personID.innerText = logData[i].PersonID;
            //var personName = document.createElement("td");
            var activityID = document.createElement("td");
            activityID.innerText = logData[i].ActivityID;
            //var activityName = document.createElement("td");
            var completionDate = document.createElement("td")
            completionDate.innerText = logData[i].CompletionTime;
            personID.innerText = logData[i].PersonID;

            var buttonBox = document.createElement("td");
            var button = document.createElement("button");
            button.innerText = "Remove Log";
            buttonBox.appendChild(button);

            // Add event listenet
            button.addEventListener("click", function(){deleteLog(logData[i].PeopleActivitiesID, logData[i].PersonID, logData[i].ActivityID)})

            // Add children to objects
            newRow.appendChild(logID);
            newRow.appendChild(personID);
            //newRow.appendChild(personName);
            newRow.appendChild(activityID);
            //newRow.appendChild(activityName);
            newRow.appendChild(completionDate);
            newRow.appendChild(buttonBox);

            table.appendChild(newRow);
        }
    }
    else
    {
        numLogs.innerText = "Number of Users: Unknown";
        console.log("No User Data Found");
        return;
    }
}

async function deleteLog(logID, personID, activityID)
{
    console.log("Removing: " + logID);
    const {error} = await supabase.from("PeopleActivities").delete().eq("PeopleActivitiesID", logID);
    if(error != null)
    {
        console.log(error);
    }
    const {data:activityData, error:activityError} = await supabase.from("Activities").select("Points").eq("ActivityID", activityID);
    if(activityData != null)
    {
        if(activityData.length > 0)
        {
            const {data:personData, error:personError} = await supabase.from("People").select("*").eq("PersonID", personID);
            if(personData != null)
            {
                if(personData.length > 0)
                {
                    const {error:updateError} = await supabase.from("People").update({Score: (personData[0].Score - activityData[0].Points)}).eq("PersonID", personID);
                }
            }
        }
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
        for(let i = 0; i < table.children.length; i++)
        {
            table.removeChild(table.children[1]);
        }
    }
}

showHidden(false);
checkCookie();
getDetails();