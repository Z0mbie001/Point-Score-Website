// Import Statements
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { setCookie, getCookie } from '../cookies.js';
import { hashFunction } from '../hash.js';

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
const pointsCount = document.getElementById("pointsCount");
const pointsAvg = document.getElementById("pointsAvg")

//// Activites
const numActivities = document.getElementById("userActivity");
const numActivitiesToday = document.getElementById("userActivityDay");
const avgActivities = document.getElementById("userActivityAverage");
const avgActivitiesToday = document.getElementById("userActivityAverageDay");

// Create Static Password Variable
const passwd = "59860170";

// Add Event Listeners
pwButton.addEventListener("click", checkPassword);
logoutButton.addEventListener("click", logout);
refreshButton.addEventListener("click", getStats);

async function getStats()
{
    console.log("Refreshing Stats");
    // User Data
    const {data:userData, error:userError} = await supabase.from("People").select("*");
    if(userData != null)
    {
        numUsers.innerText = "Number of Users: " + userData.length;
        var total = 0;
        for(let i = 0; i < userData.length; i++)
        {
            total += userData[i].Score;
        }
        pointsCount.innerText = "Total Number of Points: " + total;
        pointsAvg.innerText = "Average Points per Person: " + (total/userData.length);
    }
    else
    {
        numUsers.innerText = "Number of Users: Unknown";
        console.log("No User Data Found");
        return;
    }

    // Activity Data
    const {data:activityData, error:activityError} = await supabase.from("PeopleActivities").select("*");
    if(activityData != null)
    {
        numActivities.innerText = "Number of Activities Subitted: " + activityData.length;
        avgActivities.innerText = "Average Number of Activites: " + (activityData.length / userData.length);
    }
    else if(activityData.length == 0 || userData.length == 0)
    {
        numActivities.innerText = "Number of Activities Submitted: 0";
        avgActivities.innerText = "Average Number of Activities per Person: 0";
    }
    else
    {
        numActivities.innerText = "Number of Activities Submitted: Unknown";
        avgActivities.innerText = "Average Number of Activities per Person: Unknown";
        console.log("No Activities Data Found");
        return;
    }

    // Activity Data Daily
    const today = new Date();
    today.setTime(today.getTime() - 24*60*60*1000);
    const {data:activityDailyData, error:activityDailyError} = await supabase.from("PeopleActivities").select("*").gte("CompletionTime", today.toISOString());
    if(activityDailyData != null)
    {
        numActivitiesToday.innerText = "Number of Activities Today: " + activityDailyData.length;
        avgActivitiesToday.innerText = "Average Number of Activities Today per Person: " + (activityDailyData.length / userData.length);
    }
    else if(activityDailyData.length == 0 || userData.length == 0)
    {
        numActivitiesToday.innerText = "Number of Activities Today: 0";
        avgActivitiesToday.innerText = "Average Number of Activities Today per Person: 0";
    }
    else
    {
        numActivitiesToday.innerText = "Number of Activities Today: Unknown";
        avgActivitiesToday.innerText = "Average Number of Activities Today per Person: Unknown";
        console.log("No Activities Data Found");
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
        mainHeader.innerText = "General Statistics";
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

showHidden(false);
checkCookie();
getStats();