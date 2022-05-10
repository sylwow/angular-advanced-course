type DigitValidator = (char: string) => boolean;

const numericValidator: DigitValidator = char => /[0-9]{1}/.test(char);

const lowerCaseValidator: DigitValidator = char => /[a-z]{1}/.test(char);

const upperCaseValidator: DigitValidator = char => /[A-Z]{1}/.test(char);

const anyValidator: DigitValidator = char => true;

const neverValidator: DigitValidator = char => false;

const numberRangeValidator = (maxValue: number, char: string) => numericValidator(char) && +char <= maxValue;

const maskDigitValidators: { [key: string]: DigitValidator } = {
    'a': lowerCaseValidator,
    'A': upperCaseValidator,
    '*': anyValidator,
};

for (let i = 0; i <= 9; i++) {
    maskDigitValidators[i] = numberRangeValidator.bind(undefined, i) // or wrap in () => ...
}

export function getDigitValidator(key: string): DigitValidator {
    return maskDigitValidators[key] || neverValidator;
}