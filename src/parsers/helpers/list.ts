import { CRONSection } from "../../models/cron";
import { rangePatternMapping } from "./patterns";

export function parseList(
    input: string,
    section: Exclude<CRONSection, "command">
): string | null {
    // check if we have a range passed in
    const listMatches = input.match(
        new RegExp(
            `^(${rangePatternMapping[section]}\,${rangePatternMapping[section]})*$`
        )
    );

    if (listMatches !== null) {
        return listMatches[0].split(",").join(" ");
    }

    return null;
}
