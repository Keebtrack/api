import fs from 'fs';
import path from 'path';
import Domain from '../domain';

const { GroupBuy } = Domain;
const { Calendar } = Domain;

export function getCalendar(req, res) {
  return Calendar.get()
    .then(calendar => {
      return res.end(calendar, 'binary');
    })
    .catch(err => res.send({ error: 'could not get calendar' }))
}

export function getGroupbuys(req, res) {
  return GroupBuy.all(req.query.first, req.query.limit, req.query.after)
    .then(page => res.send(JSON.stringify(page)))
}