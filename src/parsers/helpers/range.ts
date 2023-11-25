import { CRONSection } from "../../models/cron";
import { rangePatternMapping } from "./patterns";

export function fullRange(type: Exclude<CRONSection, "command">) {
    switch (type) {
        case "minute":
            return "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59";
        case "hour":
            return "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23";
        case "dayOfMonth":
            return "1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31";
        case "dayOfWeek":
            // 0 or 7 are Sunday, 1 is Monday etc.
            return "0 1 2 3 4 5 6 7";
        default:
            return "";
    }
}

export function parseRange(input: string, section: Exclude<CRONSection, "command">): string | null {

    // check if we have a range passed in
    const rangeMatches = input.match(
        new RegExp(
            `^${rangePatternMapping[section]}\-${rangePatternMapping[section]}$`
        )
    );

    if (rangeMatches !== null) {
        const rangeStringAsArray = rangeMatches[0].split("-");
        if (rangeStringAsArray.length !== 2) {
            throw new Error("Minute range is not valid");
        }
        const rangeStart = +rangeStringAsArray[0];
        const rangeEnd = +rangeStringAsArray[1];
        let rangeArray = [];
        for (let i = +rangeStart; i <= +rangeEnd; i++) {
            rangeArray.push(i);
        }
        return rangeArray.join(" ");
    }

    return null
}
