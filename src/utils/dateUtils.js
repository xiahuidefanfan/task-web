import moment from 'moment'

const isoDateFormat = 'YYYY-MM-DD',
  isoDateTimeFormat = 'YYYY-MM-DD HH:mm:ss',
  dayOfMillisecond = 24 * 60 * 60 * 1000;

export function dateFormate(date) {
	if(!date){
		return "";
	}
  return moment(date).format(isoDateFormat);
}

export function dateTimeFormate(date) {
  return moment(date).format(isoDateTimeFormat);
}

export function customerFormate(date, format) {
  return moment(date).format(format);
}

export function maxOfDay(date) {
  var mDate = moment(date);
  mDate.hours(23);
  mDate.minutes(59);
  mDate.seconds(59);
  return mDate.format(isoDateTimeFormat);
}

export function minOfDay(date) {
  var mDate = moment(date);
  mDate.hours(0);
  mDate.minutes(0);
  mDate.seconds(0);
  return mDate.format(isoDateTimeFormat);
}

export function addDays(date, days) {
  return moment(date).add(days, 'd').format(isoDateFormat);
}

export function subtractDays(date, days) {
  return moment(date).subtract(days, 'd').format(isoDateFormat);
}

export function before(date1, date2) {
  return moment(date1).isBefore(date2);
}
export function after(date1, date2) {
  return moment(date1).isAfter(date2);
}

export function daysDiff(date1, date2) {
  var longTime = moment(date1).diff(date2);
  return (longTime / dayOfMillisecond)
}

/**
 * 获得录入日期所在周的周一和周日的日期 
 */
export function getWeekMondaySunday(date) {
	let weekMondaySunday = []
	if (!date) {
		return weekMondaySunday
	}
	let weekOfday = moment(date).format('E')//计算今天是这周第几天  
	let monday = subtractDays(date, weekOfday - 1)//周一日期  
	let sunday = addDays(date, 7 - weekOfday)//周日日期 
	weekMondaySunday = [monday, sunday]
	return weekMondaySunday
}

/**
 * 月加减计算
 */
export function addMons(date, mons) {
  return moment(date).add(mons, 'M').format(isoDateFormat);
}

/**
 *返回月份 
 */
export function getPrevsMon(date, mons) {
	let date_ = moment(date).add(mons, 'M').format(isoDateFormat);
	 return moment(date_, isoDateFormat).format('MM');  
}

/**
 * 返回当前月
 */
export function getSelectMon(date) {
	return moment(date).format('MM');  
}
