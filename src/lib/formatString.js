export const formatTime = (date, format) => {
    var dateFormat = new Date(date);

    var hh = dateFormat.getHours();
    var mm = dateFormat.getMinutes();
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    if (format === 'hh:mm') return hh + ':' + mm;
};

export const formatTimeAuto = (date) => {
    var _date = new Date(date);
    var currentDate = new Date();

    var aDay = 86400000;
    var totalDay = (currentDate.getTime() - _date.getTime()) / aDay;

    var hh = _date.getHours();
    var mm = _date.getMinutes();
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;

    // var totalDay = currentDate.getDate() - _date.getDate();
    // số ngày nhỏ hơn 1, tức là trong ngày
    if (totalDay < 1) {
        return hh + ':' + mm;
    }
    // số ngày từ 1-7
    else if (totalDay < 7) {
        return totalDay + ' ngày trước, ' + hh + ':' + mm;
    }
    // số ngày từ 7 -365 ngày
    else if (totalDay < 365) {
        return (
            (_date.getDate() > 9 ? _date.getDate() : '0' + _date.getDate()) +
            '/' +
            (_date.getMonth() > 8 ? _date.getMonth() + 1 : '0' + (_date.getMonth() + 1)) +
            ', ' +
            hh +
            ':' +
            mm
        );
    } else
        return (
            (_date.getDate() > 9 ? _date.getDate() : '0' + _date.getDate()) +
            '/' +
            (_date.getMonth() > 8 ? _date.getMonth() + 1 : '0' + (_date.getMonth() + 1)) +
            '/' +
            _date.getFullYear() +
            ', ' +
            hh +
            ':' +
            mm
        );
};

export const getLastName = (fullName) => {
    var arrName = fullName.split(' ');
    return arrName[arrName.length - 1];
};
