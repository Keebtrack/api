# ⚔️Keebtrack GraphQL API Explorer

The GraphQL groupbuy explorer is synced with a google sheets file to keep an updated API for all the currently running groupbuys. 

Currently the API supports two queries, get a single groupbuy by ID and a query with a cursor

```
{
  groupbuy(id: 5) {
    name
    description
    imgUrl
    openDate
    closeDate
  }
}
```

```
{
  groupbuys(first: 3) {
    results {
      name
      description
      imgUrl
      openDate
      closeDate
    }
    pageInfo {
    	hasNext
      after
    }
  }
}
```

if you user Relay or Apollo you can use the pageInfo to get the next results after the current last item by passing the base64 code from 'after' to `groupbuys(first: 3, after: "WzVd")` for example. 
