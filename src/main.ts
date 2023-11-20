import { parseInputs } from "./parser";
import { extractIndividualCRONSectionsFromInput } from "./utils/input";
import { logConfiguration } from "./utils/log";

export function main() {
    // test that user has given input before attempt to parse
    if (!process.argv[2]) {
        console.log(
            'Please provide a CRON string as an argument, e.g. "*/15 0 1,15 * 1-5 /usr/bin/find"'
        );
    }

    // split out the sections of the CRON statement
    const { minute, hour, dayOfMonth, month, dayOfWeek, command } =
        extractIndividualCRONSectionsFromInput(process.argv[2]);

    const parsedOutputs = parseInputs(
        minute,
        hour,
        dayOfMonth,
        month,
        dayOfWeek,
        command
    );

    // log these out to the console in the expected format
    logConfiguration(parsedOutputs);
}

main();
