import { InjectionToken } from '@angular/core';

import * as moment from 'moment';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface AppConfig {
  intervals: string[];
  days: any[];
  wdays: any;
}

export const DI_CONFIG: AppConfig = {
  intervals: [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
    '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
    '22:00', '22:30', '23:00', '23:30'
  ],
  days: [0, 1, 2, 3, 4, 5, 6].map(function(x) { return moment().add(x, 'days') }),
  wdays: { Sun: '日', Mon: '月', Tue: '火', Wed: '水',  Thu: '木', Fri: '金', Sat: '土' }
}
