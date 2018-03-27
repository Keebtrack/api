# ⚔️Keebtrack API

The GraphQL groupbuy explorer is synced with a google sheets file to keep an updated API for all the currently running groupbuys. 

in the `bin/` folder you will find the script that is responsible for updating the groupbuys by the google sheets file, plannend for the future is a protected field that will indicate if the GB is synced or not. The sync job will probably run hourly. Besides the sync job there is also a calendar job that creates a ical calendar. 

If you want to intergrate the project inside your application I would recommend cloning the repo and exploring the graphiql interface for the queries `http://localhost:9094/graphiql` for the standerd REST endpoints you can checkout the `endpoints` folder inside `src` 

