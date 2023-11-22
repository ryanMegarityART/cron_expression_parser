import { fullRange } from "./shared/range";

const REGEX_WILDCARD_CHARACTER = "\\*";

export function parseMinute(minuteCRONInput: string): string {
    const RANGE_ALLOWED_FOR_MINUTES_REGEX = "[1-5]?[0-9]";

    // check if we just have a single number passed in
    const singleNumberMatches = minuteCRONInput.match(
        new RegExp(
            `^(${RANGE_ALLOWED_FOR_MINUTES_REGEX}|${REGEX_WILDCARD_CHARACTER})$`
        )
    );
    if (singleNumberMatches !== null) {
        if (singleNumberMatches[0] === "*") {
            return fullRange("minute");
        }
        return singleNumberMatches[0];
    }

    // check if we have a range passed in
    const rangeMatches = minuteCRONInput.match(
        new RegExp(
            `^${RANGE_ALLOWED_FOR_MINUTES_REGEX}\-${RANGE_ALLOWED_FOR_MINUTES_REGEX}$`
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

    // check if we have a step passed in
    const stepMatches = minuteCRONInput.match(
        new RegExp(
            `^(${RANGE_ALLOWED_FOR_MINUTES_REGEX}|${REGEX_WILDCARD_CHARACTER})\/${RANGE_ALLOWED_FOR_MINUTES_REGEX}$`
        )
    );
    if (stepMatches !== null) {
        const stepStringAsArray = stepMatches[0].split("/");
        if (stepStringAsArray.length !== 2) {
            throw new Error("Minute step is not valid");
        }
        const stepStart = stepStringAsArray[0];
        const stepEnd = stepStringAsArray[1];
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
    }

    // throw if we have no valid matches
    throw new Error("Minute passed is not valid");
}
