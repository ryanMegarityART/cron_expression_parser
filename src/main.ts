import { parseCommand } from "./parsers/command";
import { parseDayOfMonth } from "./parsers/dayOfMonth";
import { parseDayOfWeek } from "./parsers/dayOfWeek";
import { parseHour } from "./parsers/hour";
import { parseMinute } from "./parsers/minute";
import { parseMonth } from "./parsers/month";
import { logConfiguration } from "./utils/log";

(() => {
    if (!process.argv[2]) {
        console.log(
            'Please provide a CRON string as an argument, e.g. "*/15 0 1,15 * 1-5 /usr/bin/find"'
        );
    }
    const [, , minute, hour, dayOfMonth, month, dayOfWeek, command] =
        process.argv[2].split(" ");
    const parsedMinute = parseMinute(minute);
    const parsedHour = parseHour(hour);
    const parsedDayOfMonth = parseDayOfMonth(dayOfMonth);
    const parsedMonth = parseMonth(month);
    const parsedDayOfWeek = parseDayOfWeek(dayOfWeek);
    const parsedCommand = parseCommand(command);

    logConfiguration(
        parsedMinute,
        parsedHour,
        parsedDayOfMonth,
        parsedMonth,
        parsedDayOfWeek,
        parsedCommand
    );
})();
