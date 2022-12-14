import moment from "moment";

const convertToLocalHourStr = (dateStr: string) => {
    const localDate = new Date(dateStr);
    return (moment(localDate)).format("HH:mm");
};

const convertToLocalDayShortStr = (dateStr: string) => {
    const localDate = new Date(dateStr);
    return (moment(localDate)).format("ddd, DD MMMM");
};

const convertToLocalDayLongStr = (dateStr: string) => {
    const localDate = new Date(dateStr);
    return (moment(localDate)).format("dddd, DD MMMM YYYY");
};

const convertToDateStr = (dateStr: string, withYear: boolean = false) => {
    const format = withYear ? "DD-MM-YY" : "DD-MM";
    const localDate = new Date(dateStr);
    return (moment(localDate)).format(format);
};

const convertToDateTimeStr = (dateStr: string) => {
    const localDate = new Date(dateStr);
    return (moment(localDate)).format("DD-MMM-YYYY HH:mm");
};

export {
    convertToLocalHourStr,
    convertToLocalDayShortStr,
    convertToLocalDayLongStr,
    convertToDateStr,
    convertToDateTimeStr
};