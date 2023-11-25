import { CRONSection } from "../../models/cron";
import { REGEX_WILDCARD_CHARACTER, rangePatternMapping } from "./patterns";

export function parseStep(input: string, section: Exclude<CRONSection, "command">): string | null {

    // check if we have a step passed in
    const stepMatches = input.match(
        new RegExp(
            `^(${rangePatternMapping[section]}|${REGEX_WILDCARD_CHARACTER})\/${rangePatternMapping[section]}$`
        )
    );
    if (stepMatches !== null) {
        const stepStringAsArray = stepMatches[0].split("/");
        if (stepStringAsArray.length !== 2) {
            throw new Error("Minute step is not valid");
        }
        const stepStart = stepStringAsArray[0];
        const stepEnd = stepStringAsArray[1];

        const startIsRangeMatches = input.match(
            new RegExp(
                `^${rangePatternMapping[section]}\-${rangePatternMapping[section]}$`
            )
        );

        if (startIsRangeMatches === null) {
            let stepArray = [];
            if (stepStart === "*") {
                let increment = 0;
                while (increment < 60) {
                    stepArray.push(increment);
                    increment = increment + +stepEnd;
                }
            } else {
                for (let i = +stepStart; i <= +stepEnd; i++) {
                    stepArray.push(i);
                }
            }
            return stepArray.join(" ");
        } else {
            const rangeStringAsArray = startIsRangeMatches[0].split("-");
            if (rangeStringAsArray.length !== 2) {
                throw new Error("Minute range is not valid");
            }
            const rangeStart = +rangeStringAsArray[0];
            const rangeEnd = +rangeStringAsArray[1];
        }
    }

    return null
}
