# ⚔️Keebtrack GraphQL API Explorer

The GraphQL groupbuy explorer is synced with a google sheets file to keep an updated API for all the currently running groupbuys. 

![keebtrack flow](https://i.imgur.com/gZpnBX6.png)

in the `bin/` folder you will find the script that is responsible for updating the groupbuys by the google sheets file, plannend for the future is a protected field that will indicate if the GB is synced or not. The sync job will probably run hourly. 

Currently the API supports two queries, get a single groupbuy by ID and a query with a cursor

```
{
  groupbuy(id: 5) {
    name
    description
  }
}
```
if you user Relay or Apollo you can use the pageInfo to get the next results after the current last item by passing the base64 code from 'after' to `groupbuys(first: 3, after: "WzVd")` for example. 
```
{
  groupbuys(first: 3) {
    results {
      name
      description
    }
    pageInfo {
    	hasNext
      after
    }
  }
}
```

