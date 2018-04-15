import models from '../models';

import GroupBuy from './GroupBuy.js';
import Calendar from './Calendar.js';
import Vendor from './Vendor.js';

export default {
  GroupBuy: GroupBuy(models),
  Calendar: Calendar(models),
  Vendor: Vendor(models)
}