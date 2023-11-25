import { CRONSection } from "../models/cron";
import { parseCommand } from "./helpers/command";
import { parseFixedNumber } from "./helpers/fixed";
import { parseRange } from "./helpers/range";
import { parseStep } from "./helpers/step";

export function parser(cronInput: string, section: CRONSection): string {

    if (section === "command") {
        return parseCommand(cronInput)
    }

    const fixedNumberParse = parseFixedNumber(cronInput, section)
    if (fixedNumberParse) {
        return fixedNumberParse
    }

    const rangeParse = parseRange(cronInput, section)
    if (rangeParse) {
        return rangeParse
    }

    const stepParse = parseStep(cronInput, section)
    if (stepParse) {
        return stepParse
    }

    // throw if we have no valid matches
    throw new Error(`${section} could not be parsed [input: "${cronInput}"]`);
}
