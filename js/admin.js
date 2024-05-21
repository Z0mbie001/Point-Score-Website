// Import Statements
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const crypto = require("crypto"), hash = crypto.getHashes();

// Create a single supabase client
const supabase = createClient('https://zndpnqsommwahmmdkmmc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuZHBucXNvbW13YWhtbWRrbW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyOTA0MDMsImV4cCI6MjAzMTg2NjQwM30.SOviPkL0lHuGRIP0OLMFCPXq9KhixmPEB4s6Z5Arcjk');
























// A function to hash a given input
async function hash(plainText)
{
    return crypto.createHash("sha1").update(plainText).digest("hex");
}