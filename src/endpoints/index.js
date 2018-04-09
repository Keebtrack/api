import fs from 'fs';
import path from 'path';
import Domain from '../domain';

const { GroupBuy } = Domain;
consooe.log('calendar path', path.resolve('./static/calendar.ics'))
const calendar = fs.readFileSync(path.resolve('./static/calendar.ics')).toString()
console.log('calendar loaded', calendar)

export function getCalendar(req, res) {
  return res.send(calendar)
}

export function getGroupbuys(req, res) {
  return GroupBuy.all(req.query.first, req.query.limit, req.query.after)
    .then(page => res.send(JSON.stringify(page)))
}