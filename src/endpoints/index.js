import fs from 'fs';
import path from 'path';
import Domain from '../domain';

const { GroupBuy } = Domain;

const calendar = fs.readFileSync(path.resolve(__dirname, '../../static/calendar.ics')).toString()
console.log('calendar path', path.resolve(__dirname, '../../static/calendar.ics'))

export function getCalendar(req, res) {
  return res.send(calendar)
}

export function getGroupbuys(req, res) {
  return GroupBuy.all(req.query.first, req.query.limit, req.query.after)
    .then(page => res.send(JSON.stringify(page)))
}