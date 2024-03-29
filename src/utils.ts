
/* IMPORT */

import {getConfig} from 'vscode-extras';
import type {Options} from './types';

/* MAIN */

const getOptions = (): Options => {

  const config = getConfig ( 'githubNotificationsBell' );
  const refreshInterval = isNumber ( config?.refreshInterval ) ? config.refreshInterval : 300;
  const alignment = isString ( config?.alignment ) ? config.alignment : 'right';
  const icon = isString ( config?.icon ) ? config.icon : 'mark-github';
  const color = isString ( config?.color ) ? config.color : '';
  const hideIfNone = isBoolean ( config?.hideIfNone ) ? config.hideIfNone : true;
  const showNumberOfNotifications = isBoolean ( config?.showNumberOfNotifications ) ? config.showNumberOfNotifications : true;
  const protocol = isString ( config?.protocol ) ? config.protocol : 'https';
  const domain = isString ( config?.domain ) ? config.domain : 'github.com';

  return {refreshInterval, alignment, icon, color, hideIfNone, showNumberOfNotifications, protocol, domain};

};

const isBoolean = ( value: unknown ): value is boolean => {

  return typeof value === 'boolean';

};

const isNumber = ( value: unknown ): value is number => {

  return typeof value === 'number';

};

const isString = ( value: unknown ): value is string => {

  return typeof value === 'string';

};

const once = <T> ( fn: () => T ): (() => T) => {

  let inited = false;
  let result: T;

  return (): T => {

    result = ( inited ? result : fn () );
    inited = true;

    return result;

  };

};

/* EXPORT */

export {getOptions, isBoolean, isNumber, isString, once};
