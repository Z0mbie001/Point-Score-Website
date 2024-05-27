export function setCookie(cname, cvalue, expiryDays)
{
    const d = new Date();
    d.setTime(d.getTime() + (expiryDays*24*60*1000));
    document.cookie = cname + "=" + cvalue + ";" + "expires=" + d.toUTCString() + ";path=/";
}

export function getCookie(cname)
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