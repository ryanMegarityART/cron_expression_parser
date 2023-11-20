export function formatParsedValuesForLogging(
    parsedMinute: string,
    parsedHour: string,
    parsedDayOfMonth: string,
    parsedMonth: string,
    parsedDayOfWeek: string,
    parsedCommand: string
) {
    return {
        minute: parsedMinute,
        hour: parsedHour,
        dayOfMonth: parsedDayOfMonth,
        month: parsedMonth,
        dayOfWeek: parsedDayOfWeek,
        command: parsedCommand,
    };
}

export function logConfiguration(
    parsedMinute: string,
    parsedHour: string,
    parsedDayOfMonth: string,
    parsedMonth: string,
    parsedDayOfWeek: string,
    parsedCommand: string
) {
    console.table(
        formatParsedValuesForLogging(
            parsedMinute,
            parsedHour,
            parsedDayOfMonth,
            parsedMonth,
            parsedDayOfWeek,
            parsedCommand
        )
    );
}
