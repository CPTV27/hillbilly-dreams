-- THE SOVEREIGN GHOST FOLDER (macOS Folder Action)
-- Purpose: A frictionless drop folder. You drag a file into the "Sovereign Drop" folder on your Desktop,
--          the file is instantly read by the Swarm, uploaded to the 1-Million Token window, and deleted.
-- Setup:
-- 1. Create a folder named "Sovereign Drop" on your Desktop.
-- 2. Right-click the folder -> Services -> Folder Actions Setup.
-- 3. Attach this script (save it to ~/Library/Scripts/Folder Action Scripts/SovereignGhostFolder.scpt).

on adding folder items to this_folder after receiving added_items
    set apiEndpoint to "https://measurablybetterthings.com/api/notebook/drop"
    set dropAuthor to "Chase (Ghost Folder)"
    
    repeat with dragged_file in added_items
        set posixPath to POSIX path of dragged_file
        
        -- Extract the raw text using cat
        try
            set fileContent to do shell script "cat " & quoted form of posixPath
            
            -- Upload to the Sovereign Notebook mapping via cURL and JQ
            set curlCommand to "jq -n " & ¬
                "--arg title \"Ghost Drop\" " & ¬
                "--arg content \"$(cat " & quoted form of posixPath & ")\" " & ¬
                "--arg author \"" & dropAuthor & "\" " & ¬
                "--argjson tags '[\"ghost-folder\", \"macos\"]' " & ¬
                "'{title: $title, content: $content, author: $author, tags: $tags, sourceSystem: \"ghost-folder\"}' " & ¬
                "| curl -s -o /dev/null -w \"%{http_code}\" -X POST " & apiEndpoint & " -H \"Content-Type: application/json\" -d @-"
                
            set httpCode to do shell script curlCommand
            
            if httpCode is "200" then
                -- Silently delete the file from the folder to complete the "Ghost" illusion
                do shell script "rm " & quoted form of posixPath
                
                -- Native Apple Notification
                display notification "A file vanished into the Swarm Memory." with title "Ghost Drop Successful"
            else
                display notification "HTTP Error " & httpCode with title "Ghost Drop Failed"
            end if
        on error errMsg
            display notification "Error: " & errMsg with title "Ghost Drop Error"
        end try
    end repeat
end adding folder items to
