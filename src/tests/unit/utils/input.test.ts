import { expect } from "chai";
import { extractIndividualCRONSectionsFromInput } from "../../../utils/input";

describe("Input is correctly interpreted", () => {
    it("splits the input as expected", () => {
        const { minute, hour, dayOfMonth, month, dayOfWeek, command } =
            extractIndividualCRONSectionsFromInput(
                "*/15 0 1,15 * 1-5 /usr/bin/find"
            );
        expect(minute).to.equal("*/15");
        expect(hour).to.equal("0");
        expect(dayOfMonth).to.equal("1,15");
        expect(month).to.equal("*");
        expect(dayOfWeek).to.equal("1-5");
        expect(command).to.equal("/usr/bin/find");
    });
});
