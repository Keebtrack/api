import fs from 'fs';
import Domain from '../domain';

const { GroupBuy } = Domain;

const calendar = fs.readFileSync('./static/calendar.ics')

export function getCalendar(req, res) {
  return res.send(calendar)
}

export function getGroupbuys(req, res) {
  return GroupBuy.all(req.query.first, req.query.limit, req.query.after)
    .then(page => res.send(JSON.stringify(page)))
}