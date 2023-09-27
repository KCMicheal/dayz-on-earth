import { differenceInDays, parseISO } from 'date-fns';


type TimestampDetails = {
    name: string;
    date: string;
    diffInDays: string
}

export function getTimeStamp(name: string, date: string): TimestampDetails | null {
    try {
        const currentDateTime = Date.now();
        const timestamp = parseISO(date);
        const days = differenceInDays(currentDateTime, timestamp);
        const diffInDays = days.toString();
        
        return { name, date, diffInDays}

    } catch (error) {
        console.error("Error parsing date:", error);
        return null;
    }
}