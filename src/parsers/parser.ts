import { CRONSection } from "../models/cron";
import { parseCommand } from "./helpers/command";
import { parseFixedNumber } from "./helpers/fixed";
import { parseList } from "./helpers/list";
import { parseRange } from "./helpers/range";
import { parseStep } from "./helpers/step";

export function parser(cronInput: string, section: CRONSection): string {
    if (section === "command") {
        return parseCommand(cronInput);
    }

    const fixedNumberParse = parseFixedNumber(cronInput, section);
    if (fixedNumberParse) {
        return fixedNumberParse;
    }

    const rangeParse = parseRange(cronInput, section);
    if (rangeParse) {
        return rangeParse;
    }

    const stepParse = parseStep(cronInput, section);
    if (stepParse) {
        return stepParse;
    }

    const listParse = parseList(cronInput, section);
    if (listParse) {
        return listParse;
    }

    // throw if we have no valid matches
    throw new Error(`${section} could not be parsed [input: "${cronInput}"]`);
}
