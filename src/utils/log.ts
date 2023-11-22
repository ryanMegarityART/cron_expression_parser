import { CRONSectionFormatted } from "../models/cron";
import { ParsedOutput } from "../models/parse";

const NUMBER_OF_COLUMNS_FOR_CRON_SECTION = 14;

/*
 * This ensures the requirement that the first column be exactly 14 columns
 */
export function formatCRONSectionText(cronSection: CRONSectionFormatted) {
    return (
        cronSection +
        Array(NUMBER_OF_COLUMNS_FOR_CRON_SECTION - cronSection.length)
            .fill(" ")
            .join("")
    );
}

export function logConfiguration({
    parsedMinute,
    parsedHour,
    parsedDayOfMonth,
    parsedMonth,
    parsedDayOfWeek,
    parsedCommand,
}: ParsedOutput) {
    console.log(formatCRONSectionText("minute"), parsedMinute);
    console.log(formatCRONSectionText("hour"), parsedHour);
    console.log(formatCRONSectionText("day of month"), parsedDayOfMonth);
    console.log(formatCRONSectionText("month"), parsedMonth);
    console.log(formatCRONSectionText("day of week"), parsedDayOfWeek);
    console.log(formatCRONSectionText("command"), parsedCommand);
}
