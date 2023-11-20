import { parseCommand } from "./parsers/command";
import { parseDayOfMonth } from "./parsers/dayOfMonth";
import { parseDayOfWeek } from "./parsers/dayOfWeek";
import { parseHour } from "./parsers/hour";
import { parseMinute } from "./parsers/minute";
import { parseMonth } from "./parsers/month";
import { extractIndividualCRONSectionsFromInput } from "./utils/input";
import { logConfiguration } from "./utils/log";

export function main() {
    if (!process.argv[2]) {
        console.log(
            'Please provide a CRON string as an argument, e.g. "*/15 0 1,15 * 1-5 /usr/bin/find"'
        );
    }
    const { minute, hour, dayOfMonth, month, dayOfWeek, command } =
        extractIndividualCRONSectionsFromInput(process.argv[2]);

    // parse these inputs
    const parsedMinute = parseMinute(minute);
    const parsedHour = parseHour(hour);
    const parsedDayOfMonth = parseDayOfMonth(dayOfMonth);
    const parsedMonth = parseMonth(month);
    const parsedDayOfWeek = parseDayOfWeek(dayOfWeek);
    const parsedCommand = parseCommand(command);

    // log these out to the console in the expected format
    logConfiguration(
        parsedMinute,
        parsedHour,
        parsedDayOfMonth,
        parsedMonth,
        parsedDayOfWeek,
        parsedCommand
    );
}

main();
