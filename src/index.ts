const escapeCharacters = ["'"] as const;
type EscapeCharactersType = typeof escapeCharacters[number];

interface Response {
    error: string;
    result: object;
}

// returns true if input is of type object
function checkIfObject(input: Object): boolean {
    if (!input) {
        return false;
    }
    return !(typeof input !== 'object' || (typeof input === 'object' && Array.isArray(input)))
}

function escapeCharacter(input: string): string {
    if (typeof input !== 'string') {
        return input;
    }
    let result = input;
    for (const character of escapeCharacters) {
        switch (character as EscapeCharactersType) {
            case "'": {
                result = result.replace(/'/g, "''");
            }
        }
    }
    return result;
}

function iterateObjectRecursively<T = Object>(input: T): T {
    let emptyObject = { ...input };
    // now iterate through object recursively
    for (const [key, value] of Object.entries(input)) {
        let isObject = checkIfObject(value);
        if (!isObject) {
            const replacedCharacter = escapeCharacter(value);
            emptyObject = { ...emptyObject, [key]: replacedCharacter }
        } else {
            const newObject = iterateObjectRecursively(value);
            emptyObject = { ...emptyObject, [key]: newObject };
        }
    }
    return emptyObject;
}

export const escapeObject = (input: object): Response => {
    if (!checkIfObject(input)) {
        return {
            error: 'Input should be an Object',
            result: null,
        }
    }
    const result = iterateObjectRecursively(input);
    return {
        error: null,
        result,
    };
}
