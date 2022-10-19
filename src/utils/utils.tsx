import moment from "moment";

const convertToLocalHourStr = (dateStr: string) => {
    const localDate = new Date(dateStr);
    return (moment(localDate)).format("HH:mm");
};

export default convertToLocalHourStr;