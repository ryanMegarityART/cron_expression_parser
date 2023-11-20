import { ParsedOutput } from "../models/parse";

export function formatParsedValuesForLogging({
    parsedMinute,
    parsedHour,
    parsedDayOfMonth,
    parsedMonth,
    parsedDayOfWeek,
    parsedCommand,
}: ParsedOutput) {
    return {
        minute: parsedMinute,
        hour: parsedHour,
        dayOfMonth: parsedDayOfMonth,
        month: parsedMonth,
        dayOfWeek: parsedDayOfWeek,
        command: parsedCommand,
    };
}

export function logConfiguration({
    parsedMinute,
    parsedHour,
    parsedDayOfMonth,
    parsedMonth,
    parsedDayOfWeek,
    parsedCommand,
}: ParsedOutput) {
    console.table(
        formatParsedValuesForLogging({
            parsedMinute,
            parsedHour,
            parsedDayOfMonth,
            parsedMonth,
            parsedDayOfWeek,
            parsedCommand,
        })
    );
}
