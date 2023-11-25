import { CRONSection } from "../../models/cron";

export const REGEX_WILDCARD_CHARACTER = "\\*";

export type RangeMapping = {
    [key in Exclude<CRONSection, "command">]: string;
}

// Helper to store the regex patterns for cron section type valid ranges
export const rangePatternMapping: RangeMapping = {
    minute: "[1-5]?[0-9]", // 0-59
    hour: "([0-1][0-9]|2[0-3])", // 0-23
    dayOfMonth: "([0-2]?[0-9]|3[0-1])", // 0-31 - NOTE: This does not validate based on month 
    month: "([1-9]|1[0-2])", // 1 - 12 
    dayOfWeek: "[1-7]" // 1 - 7 - NOTE: Sunday can be 1 or 7
}
