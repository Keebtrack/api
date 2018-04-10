import models from '../models';

import GroupBuy from './GroupBuy.js';
import Calendar from './Calendar.js';

export default {
  GroupBuy: GroupBuy(models),
  Calendar: Calendar(models)
}