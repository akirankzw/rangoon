import { InjectionToken } from '@angular/core';

import * as moment from 'moment';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface AppConfig {
  intervals: string[];
  days: any[];
  wdays: any;
  emoji: string[];
}

export const DI_CONFIG: AppConfig = {
  intervals: [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00',
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00',
    '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
  ],
  days: [0, 1, 2, 3, 4, 5, 6].map(function(x) { return moment().add(x, 'days') }),
  wdays: { Sun: '日', Mon: '月', Tue: '火', Wed: '水',  Thu: '木', Fri: '金', Sat: '土' },
  emoji: [
    '&#x1f601', '&#x1f602', '&#x1f603', '&#x1f604', '&#x1f605', '&#x1f606', '&#x1f609',
    '&#x1f60A', '&#x1f60B', '&#x1f60C', '&#x1f60F', '&#x1f612', '&#x1f613', '&#x1f614',
    '&#x1f616', '&#x1f618', '&#x1f61A', '&#x1f61C', '&#x1f61D', '&#x1f61E', '&#x1f620',
    '&#x1f621', '&#x1f622', '&#x1f623', '&#x1f624', '&#x1f625', '&#x1f628', '&#x1f629',
    '&#x1f62A', '&#x1f62B', '&#x1f62D', '&#x1f630', '&#x1f631', '&#x1f632', '&#x1f633',
    '&#x1f635', '&#x1f637', '&#x1f638', '&#x1f639', '&#x1f63A', '&#x1f63B', '&#x1f63C',
    '&#x1f63D', '&#x1f63E', '&#x1f63F', '&#x1f640', '&#x1f645', '&#x1f646', '&#x1f647',
    '&#x1f648', '&#x1f649', '&#x1f64A', '&#x1f64B', '&#x1f64C', '&#x1f64D', '&#x1f64E',
    '&#x1f64F'
  ]
}
