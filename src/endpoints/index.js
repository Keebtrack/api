import fs from 'fs';
import path from 'path';
import RSS from 'rss';

import Domain from '../domain';

const { GroupBuy } = Domain;
const { Calendar } = Domain;

export function getCalendar(req, res) {
  return Calendar.get()
    .then(calendar => res.end(calendar, 'binary'))
    .catch(err => res.send({ error: 'could not get calendar' }))
}

export function getGroupbuys(req, res) {
  return GroupBuy.all(req.query.first, req.query.limit, req.query.after)
    .then(page => res.send(JSON.stringify(page)))
}

export function getRSSfeed(req, res) {
  let feed = new RSS({
    title: 'Group buys',
    description: 'active groupbuys provided by keebtrack.com',
    feed_url: 'https://api.keebtrack.com/rss.xml',
    site_url: 'http:s//keebtrack.com',
    image_url: 'https://keebtrack.com/keebtrack.jpg',
    managingEditor: 'klaaz0r',
    webMaster: 'klaaz0r',
    language: 'en',
    categories: ['Keyboards', 'Keycaps', 'Group buys'],
  });

  return GroupBuy.allWithoutCursor()
    .then(groupbuys => {
      console.log(groupbuys)
      groupbuys.map(gb => {
        feed.item({
          title: gb.name,
          description: gb.description,
          url: gb.url, // link to the item
          date: gb.openDate,
          categories: gb.tags
        })
      })
    })
    .then(() => {
      res.send(feed.xml())
    })
    .catch(err => {
      res.send(err)
    })
}