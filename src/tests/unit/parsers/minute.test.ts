import { expect } from "chai";
import { parseMinute } from "../../../parsers/minute";
import { fullRange } from "../../../parsers/shared/range";

describe("minute is parsed correctly", () => {
    it("returns the correct string for an exact minute passed", () => {
        let parsedMinute = parseMinute("51");
        expect(parsedMinute).to.equal("51");

        parsedMinute = parseMinute("40");
        expect(parsedMinute).to.equal("40");

        parsedMinute = parseMinute("1");
        expect(parsedMinute).to.equal("1");

        parsedMinute = parseMinute("0");
        expect(parsedMinute).to.equal("0");
    });
    it("returns the correct string for a minute wildcard", () => {
        let parsedMinute = parseMinute("*");
        expect(parsedMinute).to.equal(
            "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59"
        );
    });
    it("returns the correct string for a step wildcard", () => {
        let parsedMinute = parseMinute("*/15");
        expect(parsedMinute).to.equal("0 15 30 45");
        parsedMinute = parseMinute("*/10");
        expect(parsedMinute).to.equal("0 10 20 30 40 50");
    });
    it("returns the correct string for an exact range passed", () => {
        let parsedMinute = parseMinute("0-9");
        expect(parsedMinute).to.equal("0 1 2 3 4 5 6 7 8 9");

        parsedMinute = parseMinute("7-19");
        expect(parsedMinute).to.equal("7 8 9 10 11 12 13 14 15 16 17 18 19");
    });
    it("throws for invalid values", () => {
        expect(() => parseMinute("60")).to.throw("Minute passed is not valid");
        expect(() => parseMinute("-1")).to.throw("Minute passed is not valid");
        expect(() => parseMinute("50-73")).to.throw(
            "Minute passed is not valid"
        );
    });
});
