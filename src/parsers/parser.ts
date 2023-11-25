import { CRONSection } from "../models/cron";
import { parseFixedNumber } from "./helpers/fixed";
import { parseRange } from "./helpers/range";

const REGEX_WILDCARD_CHARACTER = "\\*";

export function parser(cronInput: string, type: Exclude<CRONSection, "command">): string {

    const RANGE_ALLOWED_FOR_MINUTES_REGEX = "[1-5]?[0-9]";

    const fixedNumberParse = parseFixedNumber(cronInput, type)
    if (fixedNumberParse) {
        return fixedNumberParse
    }

    const rangeParse = parseRange(cronInput, type)
    if (rangeParse) {
        return rangeParse
    }

    // check if we have a step passed in
    const stepMatches = cronInput.match(
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

        const startIsRangeMatches = cronInput.match(
            new RegExp(
                `^${RANGE_ALLOWED_FOR_MINUTES_REGEX}\-${RANGE_ALLOWED_FOR_MINUTES_REGEX}$`
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

    // throw if we have no valid matches
    throw new Error("Minute passed is not valid");
}
