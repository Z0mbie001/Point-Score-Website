import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Create a single supabase client
const supabase = createClient('https://zndpnqsommwahmmdkmmc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZHBucXNvbW13YWhtbWRrbW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyOTA0MDMsImV4cCI6MjAzMTg2NjQwM30.SOviPkL0lHuGRIP0OLMFCPXq9KhixmPEB4s6Z5Arcjk');

// Get UI Elements
const table = document.getElementById("ActivityTable");
const options = document.getElementById("ActivityInput");

// Assign Event Listeners

// The Refresh Function
async function refreshActivites()
{
    console.log("Refreshing the Activities");
    let {data, error} = await supabase.from("Activities").select("*").order("Points", {ascending: false});
    if(data.length != 0)
    {
        await clearOptions();
        
        for(let i = 0; i < data.length; i++)
        {
            var newRow = document.createElement("tr");
            var name = document.createElement("td");
            name.innerText = data[i].ActivityName;
            var points = document.createElement("td");
            points.innerText = data[i].Points;

            newRow.appendChild(name);
            newRow.appendChild(points);
            table.appendChild(newRow);

            var option = document.createElement("option");
            option.innerText = data[i].ActivityName;
            options.add(option);
        }
    }
}

async function clearOptions()
{
    console.log("Clear Table");
    if(table.children.length > 1)
    {
        for(let i = 1; i < table.children.length; i++)
        {
            table.removeChild(table.children[1]);
        }
    }

    console.log("Clear Options");
    if(options.length > 1)
    {
        for(let i = 1; i < options.length; i++)
        {
            options.remove(options.children[1]);
        }
    }
}

refreshActivites();