# Escape characters in Object

Adds escape characters in object recursively.

```json

const testObject = {
    "name": "saiumesh's",
    "data": {
        "name": "Rahul's",
        "place": "Hyderabad"
    }
};
const expectedObject = {
    "name": "saiumesh''s",
    "data": {
        "name": "Rahul''s",
        "place": "Hyderabad"
    }
};

```
