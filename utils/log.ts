export function logConfiguration(
    parsedMinute: string,
    parsedHour: string,
    parsedDayOfMonth: string,
    parsedMonth: string,
    parsedDayOfWeek: string,
    parsedCommand: string
) {
    console.table([
        {
            minute: "minute",
            hour: "hour",
            dayOfMonth: "day of month",
            month: "month",
            dayOfWeek: "day of Week",
            command: "command",
        },
        {
            minute: parsedMinute,
            hour: parsedHour,
            dayOfMonth: parsedDayOfMonth,
            month: parsedMonth,
            dayOfWeek: parsedDayOfWeek,
            command: parsedCommand,
        },
    ]);
}
