export const formatTime = (date, format) => {
    var dateFormat = new Date(date);

    var hh = dateFormat.getHours();
    var mm = dateFormat.getMinutes();
    if (hh < 10) hh = '0' + hh;
    if (mm < 10) mm = '0' + mm;
    if (format === 'hh:mm') return hh + ':' + mm;
};
