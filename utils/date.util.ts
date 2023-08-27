import { format } from "date-fns";
export function formatTime(dateStr: string) {
    try {
        const formatedTime = format(new Date(dateStr), "hh:mm a");
        return formatedTime;
    } catch (error) {
        return "-";
    }
}
