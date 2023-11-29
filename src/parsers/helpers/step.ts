import { CRONSection } from "../../models/cron";
import { REGEX_WILDCARD_CHARACTER, rangePatternMapping } from "./patterns";
import { limitMapping, parseRange } from "./range";

export function parseStep(
    input: string,
    section: Exclude<CRONSection, "command">
): string | null {
    // check if we have a step passed in
    const stepMatches = input.match(
        new RegExp(
            `^(${rangePatternMapping[section]}\-${rangePatternMapping[section]}|${rangePatternMapping[section]}|${REGEX_WILDCARD_CHARACTER})\/${rangePatternMapping[section]}$`
        )
    );
    if (stepMatches !== null) {
        const stepStringAsArray = stepMatches[0].split("/");
        if (stepStringAsArray.length !== 2) {
            throw new Error("Step is not valid");
        }
        const stepStart = stepStringAsArray[0];
        const stepEnd = stepStringAsArray[1];

        let lowerLimit = limitMapping[section].lower;
        let upperLimit = limitMapping[section].upper;

        if (stepStart != "*") {
            const rangeParse = parseRange(stepStart, section);
            if (rangeParse) {
                const rangeArray = rangeParse.split(" ");
                lowerLimit = +rangeArray[0];
                upperLimit = +rangeArray[rangeArray.length - 1];
            }
        }

        let stepArray = [];
        let increment = lowerLimit;
        while (increment <= upperLimit) {
            stepArray.push(increment);
            increment = increment + +stepEnd;
        }
        return stepArray.join(" ");
    }

    return null;
}
