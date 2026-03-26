-- SOVEREIGN SWARM SPOTLIGHT (macOS Global Hotkey)
-- Bind this script to a keyboard shortcut (e.g., Cmd + Option + S) using Raycast, Alfred, or FastScripts.
-- Function: Instantly prompts the CEO for input, sends it to the Measurably Better Swarm Gen AI, and presents the response.

set swarmEndpoint to "https://measurablybetterthings.com/api/siri/analyze"
set apiKey to "SIRI-BMT-8842-X" -- Replace with the actual SIRI_API_KEY from .env

try
    -- 1. Display the invisible native macOS input dialog
    display dialog "Consult the Swarm:" default answer "" with title "Sovereign Edge" buttons {"Cancel", "Strike"} default button "Strike"
    set userQuery to text returned of result
    
    if userQuery is not "" then
        -- 2. Escape quotes for JSON
        set escapedQuery to replaceText(userQuery, "\"", "\\\"")
        
        -- 3. Construct the cURL request to the Gen AI backend
        set curlCommand to "curl -s -w \"\\n%{http_code}\" -X POST " & swarmEndpoint & " " & ¬
            "-H \"Content-Type: application/json\" " & ¬
            "-H \"Authorization: Bearer " & apiKey & "\" " & ¬
            "-d '{\"query\": \"" & escapedQuery & "\"}'"
            
        -- 4. Execute the cURL command and parse the JSON response
        set rawResponse to do shell script curlCommand
        
        -- Extract HTTP Code (last 3 chars)
        set httpCode to text -3 thru -1 of rawResponse
        set respBody to text 1 thru -5 of rawResponse
        
        if httpCode is "200" then
            -- We are using python to parse the JSON 'text' node since AppleScript natively lacks JSON support
            set pythonScript to "import sys, json; print(json.loads(sys.argv[1]).get('text', 'No text returned.'))"
            set aiAnswer to do shell script "python3 -c " & quoted form of pythonScript & " " & quoted form of respBody
            
            -- 5. Return the result directly into macOS UI (or TTS)
            display alert "Sovereign Swarm Analysis" message aiAnswer as informational
            
            -- UNCOMMENT to enable native Text-to-Speech Siri voice:
            -- say aiAnswer using "Alex"
        else
            display alert "Edge Disconnect" message "HTTP Status: " & httpCode & return & respBody as warning
        end if
    end if
on error errMsg number errNum
    if errNum is not -128 then -- -128 is user cancelled
        display alert "Swarm Error" message "Code " & errNum & ": " & errMsg as critical
    end if
end try

-- Helper function to escape text
on replaceText(subject, find, replace)
    set AppleScript's text item delimiters to find
    set theList to every text item of subject
    set AppleScript's text item delimiters to replace
    set theResult to theList as string
    set AppleScript's text item delimiters to ""
    return theResult
end replaceText
