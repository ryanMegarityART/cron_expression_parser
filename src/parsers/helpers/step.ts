import { CRONSection } from "../../models/cron";
import { REGEX_WILDCARD_CHARACTER, rangePatternMapping } from "./patterns";
import { limitMapping, parseRange } from "./range";

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
            throw new Error("Step is not valid");
        }
        const stepStart = stepStringAsArray[0];
        const stepEnd = stepStringAsArray[1];

        const rangeParse = parseRange(stepStart, section)
        if (rangeParse) {
            // if this returns we know the start is of step form and can use that
            return rangeParse
        }

        let stepArray = [];
        if (stepStart === "*") {
            let increment = 0;
            while (increment < limitMapping[section].upper) {
                stepArray.push(increment);
                increment = increment + +stepEnd;
            }
        } else {
            for (let i = +stepStart; i <= +stepEnd; i++) {
                stepArray.push(i);
            }
        }
        return stepArray.join(" ");
    }

    return null
}
