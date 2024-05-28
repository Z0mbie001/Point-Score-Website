//Import Supabase
import { supabase } from "../supabase";

// Get UI Elements
const table = document.getElementById("results-table");
const refreshButton = document.getElementById("refresh-leaderboard");

// Store Table Detials
var results = null;

// Assign Event Listeners
refreshButton.addEventListener("click", refreshLeaderboard);

// The Refresh Function
async function refreshLeaderboard()
{
    console.log("Refreshing the Leaderboard");
    let {data, error} = await supabase.from("People").select("*").order("Score", {ascending: false}).order("Name", {ascending: false});
    if(data.length != 0)
    {
        if(data == results)
        {
            return;
        }
        await clearTable();
        results = data;
        for(let i = 0; i < data.length; i++)
        {
            var newRow = document.createElement("tr");
            var rank = document.createElement("td");
            rank.innerText = i + 1;
            var name = document.createElement("td");
            name.innerText = data[i].Nickname;
            var score = document.createElement("td");
            score.innerText = data[i].Score;

            newRow.appendChild(rank);
            newRow.appendChild(name);
            newRow.appendChild(score);

            table.appendChild(newRow);
        }
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

async function scheduleRefresh()
{
    window.setInterval(refreshLeaderboard, 60000);
}

refreshLeaderboard();
scheduleRefresh();