// Import Statements
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Create a single supabase client
const supabase = createClient('https://zndpnqsommwahmmdkmmc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZHBucXNvbW13YWhtbWRrbW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyOTA0MDMsImV4cCI6MjAzMTg2NjQwM30.SOviPkL0lHuGRIP0OLMFCPXq9KhixmPEB4s6Z5Arcjk');

// Create references to UI elements
const navbar = document.getElementById("navbar-container");
const statsbar = document.getElementById("stats-container");
const pwInput = document.getElementById("pwInput");
const pwButton = document.getElementById("pwSubmit");

// Create Static Password Variable
const passwd = "123";

// Add Event Listeners
//pwButton.addEventListener("click");

// TODO Work out cookies for continuing authentication (IDEAL)
// TODO finish stats
// TODO compare hashed password

function showHidden(show)
{
    if(show)
    {
        navbar.style.display = "block";
        statsbar.style.display = "block";
    }
    else
    {
        navbar.style.display = "none";
        statsbar.style.display = "none";
    }
}


// A function to hash a given input
function hashFunction(string) {
    return string.split('').reduce((hash, char) => {
        return char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash;
    }, 0);
}

showHidden(false);