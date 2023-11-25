import { CRONSection } from "../../models/cron";
import { REGEX_WILDCARD_CHARACTER, rangePatternMapping } from "./patterns";
import { fullRange } from "./range";

export function parseFixedNumber(input: string, section: Exclude<CRONSection, "command">): string | null {

    // check if we just have a single number passed in
    const singleNumberMatches = input.match(
        new RegExp(
            `^(${rangePatternMapping[section]}|${REGEX_WILDCARD_CHARACTER})$`
        )
    );
    if (singleNumberMatches !== null) {
        if (singleNumberMatches[0] === "*") {
            return fullRange(section);
        }
        return singleNumberMatches[0];
    }

    return null
}
