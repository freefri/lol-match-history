# League of Legends match history stats viewer
Download all your matches from League of Legends and watch a summary of your stats grouped by champion

# Run script
This script is not using the official Riot API and it should run from leagueoflegends.com In order to do so you will need to use your browser's developer tools. Use the following instructions:

+ Go to http://matchhistory.{REGION}.leagueoflegends.com (remember to change your region: euw, na, etc)
+ Click "login" and enter your user and password
+ Open the developer tool by pressing F12 or doing right click and "Inspect element"
+ In the developer tool go to network and in the bottom press XHR in order to filter the network trafic
+ In the Match History site, click in view my match history (if you already see your matches, just reload the page - F5)
+ In the developer tool you should be able to see how new requests appear. One of them should be something similar to `GET auth?betIndex=0&...`. Click on it and copy the "Authorization" string from "request headers", you will need to include this code as {AUTH_CODE}
+ Get your summoner id from the url of the Match history `http://matchhistory.euw.leagueoflegends.com/en/#match-history/EUW1/{your SUMMONER_ID}`. You will need to replace {SUMMONER_ID} with this ID.
+ In the developer tool go to "Console" and paste there the following code (Remember to replace {AUTH_CODE}, {SUMMONER_ID} and {REGION}):

`` ADD 
JS CODE HERE ``
