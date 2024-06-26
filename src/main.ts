import { parseCommand } from "./parsers/helpers/command";
import { parser } from "./parsers/parser";
import { extractIndividualCRONSectionsFromInput } from "./utils/input";
import { logConfiguration } from "./utils/log";

export function parse(input: string) {
    try {
        // split out the sections of the CRON statement
        const { minute, hour, dayOfMonth, month, dayOfWeek, command } =
            extractIndividualCRONSectionsFromInput(input);

        // parse the sections
        const parsedMinute = parser(minute, "minute");
        const parsedHour = parser(hour, "hour");
        const parsedDayOfMonth = parser(dayOfMonth, "dayOfMonth");
        const parsedMonth = parser(month, "month");
        const parsedDayOfWeek = parser(dayOfWeek, "dayOfWeek");
        const parsedCommand = parser(command, "command");

        // log these out to the console in the expected format
        logConfiguration({
            parsedMinute,
            parsedHour,
            parsedDayOfMonth,
            parsedMonth,
            parsedDayOfWeek,
            parsedCommand,
        });
    } catch (e) {
        console.error("Error parsing input: ", e);
        process.exit(1);
    }
}

export function main() {
    // test that user has given input before attempt to parse
    if (!process.argv[2]) {
        console.log(
            'Please provide a CRON string as an argument, e.g. "*/15 0 1,15 * 1-5 /usr/bin/find"'
        );
    }

    parse(process.argv[2]);
}

if (require.main === module) {
    main();
}
