


export const TAB = 9,
    LEFT_ARROW = 37,
    RIGHT_ARROW = 39,
    BACKSPACE = 8,
    DELETE = 46;

export const SPECIAL_CHARACTERS = [" ", "/", "(", ")", "+", "\/", "-"];


export function overWriteCharAtPos(input: HTMLInputElement, cursorPos: number, key: string) {
    const currentValue = input.value;

    input.value = currentValue.slice(0, cursorPos) + key + currentValue.slice(cursorPos + 1);
}




