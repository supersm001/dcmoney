import moment from 'moment';

export const FormatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}

export const ExtendMonth = (date, extend) => {
    var dt = moment(date).add(extend, 'M').format('DD/MM/YYYY');

    return dt;
}

export const ResetDate = (date, extend) => {
    var dt = moment(date).add(extend, 'M').format('YYYY-MM-DD');
    return dt;
}