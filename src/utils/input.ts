// split out user input string into 6 expected properties
export function extractIndividualCRONSectionsFromInput(input: string) {
    const [minute, hour, dayOfMonth, month, dayOfWeek, command] =
        input.split(" ");
    return { minute, hour, dayOfMonth, month, dayOfWeek, command };
}
