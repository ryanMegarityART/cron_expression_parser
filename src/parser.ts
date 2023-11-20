import { ParsedOutput } from "./models/parse";
import { parseCommand } from "./parsers/command";
import { parseDayOfMonth } from "./parsers/dayOfMonth";
import { parseDayOfWeek } from "./parsers/dayOfWeek";
import { parseHour } from "./parsers/hour";
import { parseMinute } from "./parsers/minute";
import { parseMonth } from "./parsers/month";

export function parseInputs(
    minute: string,
    hour: string,
    dayOfMonth: string,
    month: string,
    dayOfWeek: string,
    command: string
): ParsedOutput {
    // parse the split out inputs
    const parsedMinute = parseMinute(minute);
    const parsedHour = parseHour(hour);
    const parsedDayOfMonth = parseDayOfMonth(dayOfMonth);
    const parsedMonth = parseMonth(month);
    const parsedDayOfWeek = parseDayOfWeek(dayOfWeek);
    const parsedCommand = parseCommand(command);
    return {
        parsedMinute,
        parsedHour,
        parsedDayOfMonth,
        parsedMonth,
        parsedDayOfWeek,
        parsedCommand,
    };
}
