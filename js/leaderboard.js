// Install the supabse-js module
import { createClient } from '';

// Create a single supabase client
const supabase = createClient('', '');

// Get UI Elements
const table = document.getElementById("results-table");

// Store Table Detials
var results = null;

// The Refresh Function
async function refreshLeaderboard()
{
    let leaderboardQuery = supabase.from("People").select("*").order("Score", {ascending: false});
    let {data, error} = await leaderboardQuery;
    if(data.length != 0)
    {
        if(data == results)
        {
                return;
        }
        clearTable();
        results = data;
        for(let i = 0; i < data.length; i++)
        {
            var newRow = document.createElement("tr");
            var rank = document.createElement("td");
            rank.innerText = i + 1;
            var name = document.createElement("td");
            name.innerText = data.Name;
            var score = document.createElement("td");
            score.innerText = data.CurrentScore;

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
    if(table.children.length > 1)
    {
        for(let i = 1; i < table.children.length; i++)
        {
            table.removeChild(table.children[1]);
        }
    }
}

async function scheduleRefresh()
{
    window.setInterval(refreshLeaderboard, 60000);
}

clearTable();
refreshLeaderboard();
scheduleRefresh();