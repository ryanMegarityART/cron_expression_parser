import { expect } from "chai";
import { parser } from "../../../parsers/parser";
import { fullRange } from "../../../parsers/helpers/range";

describe("minute is parsed correctly", () => {
    it("returns the correct string for an exact minute passed", () => {
        let parsedMinute = parser("51", "minute");
        expect(parsedMinute).to.equal("51", "minute");

        parsedMinute = parser("40", "minute");
        expect(parsedMinute).to.equal("40");

        parsedMinute = parser("1", "minute");
        expect(parsedMinute).to.equal("1");

        parsedMinute = parser("0", "minute");
        expect(parsedMinute).to.equal("0");
    });
    it("returns the correct string for a minute wildcard", () => {
        let parsedMinute = parser("*", "minute");
        expect(parsedMinute).to.equal(
            "0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48 49 50 51 52 53 54 55 56 57 58 59"
        );
    });
    it("returns the correct string for an exact range passed", () => {
        let parsedMinute = parser("0-9", "minute");
        expect(parsedMinute).to.equal("0 1 2 3 4 5 6 7 8 9");

        parsedMinute = parser("7-19", "minute");
        expect(parsedMinute).to.equal("7 8 9 10 11 12 13 14 15 16 17 18 19");
    });
    it("returns the correct string for a step wildcard", () => {
        let parsedMinute = parser("*/15", "minute");
        expect(parsedMinute).to.equal("0 15 30 45");
        parsedMinute = parser("*/10", "minute");
        expect(parsedMinute).to.equal("0 10 20 30 40 50");
    });
    it("returns the correct string for a step", () => {
        let parsedMinute = parser("0/15", "minute");
        expect(parsedMinute).to.equal("0 15 30 45");
        parsedMinute = parser("5/10", "minute");
        expect(parsedMinute).to.equal("5 15 25 35 45 55");
    });
    it("returns the correct string for a step with a range", () => {
        let parsedMinute = parser("0-29/15", "minute");
        expect(parsedMinute).to.equal("0 15");
        parsedMinute = parser("5-25/10", "minute");
        expect(parsedMinute).to.equal("5 15 25");
    });
    it("throws for invalid values", () => {
        expect(() => parser("60", "minute")).to.throw("Minute passed is not valid");
        expect(() => parser("-1", "minute")).to.throw("Minute passed is not valid");
        expect(() => parser("50-73", "minute")).to.throw(
            "Minute passed is not valid"
        );
    });
});
