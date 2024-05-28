//Import Supabase
import { supabase } from "../supabase";

// Get UI Elements
const table = document.getElementById("ActivityTable");
const idInput = document.getElementById("IDInput");
const options = document.getElementById("ActivityInput");
const submitButton = document.getElementById("ActivitySubmit");
const feeback = document.getElementById("feedback");

// Assign Event Listeners
submitButton.addEventListener("click", submitActivity);

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
        for(let i = 0; i < table.children.length; i++)
        {
            table.removeChild(table.children[1]);
        }
    }

    console.log("Clear Options");
    if(options.length > 1)
    {
        for(let i = 0; i < options.length; i++)
        {
            options.remove(options.children[1]);
        }
    }
}

async function submitActivity()
{
    console.log("Submitting Activity");
    var user = await getUser(idInput.value);
    var activity = await getActivity(options.value);
    console.log(user);
    if(user.PersonID == idInput.value)
    {   
        console.log("Update database");
        let newScore = user.Score + activity.Points;
        const {error} = await supabase.from("PeopleActivities").insert({PersonID: user.PersonID, ActivityID: activity.ActivityID});
        const {error:peopleError} = await supabase.from("People").update({Score: newScore }).eq("PersonID", user.PersonID);
        if(error != null)
        {
            console.log(error);
        }

        if(peopleError != null)
        {
            console.log(peopleError);
        }
    }
    feeback.innerText = "Activity Submitted";
    idInput.value = "";
    options.value = options.children[0].innerText;
}

async function getUser(PersonID)
{
    console.log("Fetching User Data: " + PersonID);
    if(PersonID == "")
    {
        PersonID = 0;
    }
    let {data, error} = await supabase.from("People").select("*").eq("PersonID", PersonID);
    if(data != null)
    {
        if(data.length == 1)
        {
            return data[0];
        }
        else if (data.length > 1)
        {
            console.log("More than 1 user returned");
        }
        else
        {
            console.log("No users returned");
        }
    }
    else
    {
        console.log("Data is Null");
    }
}

async function getActivity(ActivityName)
{
    console.log("Fetching Activity Data: " + ActivityName);
    if(ActivityName == "Select an Activity")
    {
        return;
    }
    let {data, error} = await supabase.from("Activities").select("*").eq("ActivityName", ActivityName);
    console.log(data)
    if(data != null)
        {
            if(data.length == 1)
            {
                return data[0];
            }
            else if (data.length > 1)
            {
                console.log("More than 1 activities returned");
            }
            else
            {
                console.log("No activities returned");
            }
        }
        else
        {
            console.log("Data is Null");
        }
}

refreshActivites();