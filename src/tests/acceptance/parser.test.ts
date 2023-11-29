import sinon from "sinon";
import chai, { expect } from "chai";
import sinonChai from "sinon-chai";
import { parse } from "../../main";
chai.use(sinonChai);

const sandbox = sinon.createSandbox();
let consoleLogSpy: any;

describe("parse inputs", () => {
    beforeEach(function () {
        consoleLogSpy = sandbox.spy(console, "log");
    });

    afterEach(function () {
        sandbox.restore();
    });

    it("should log the correct output", () => {
        parse("*/15 0 1,15 * 1-5 /usr/bin/find");
        expect(consoleLogSpy).to.have.been.calledWith(
            "minute        ",
            "0 15 30 45"
        );
        expect(consoleLogSpy).to.have.been.calledWith("hour          ", "0");
        expect(consoleLogSpy).to.have.been.calledWith("day of month  ", "1 15");
        expect(consoleLogSpy).to.have.been.calledWith(
            "day of week   ",
            "1 2 3 4 5"
        );
        expect(consoleLogSpy).to.have.been.calledWith(
            "command       ",
            "/usr/bin/find"
        );
    });
});
