import dayjs from "dayjs";

// Returns true if the date passed = today or a day before
export const isDateBeforeOrToday = (date: string) => {
    const today = dayjs();

    return (today.format('MM/DD/YYYY') === dayjs(date).format('MM/DD/YYYY'))
        || (dayjs(date).isBefore(today, 'day'));
}