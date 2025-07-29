// n8n JavaScript Expression to extract block of numbers at the end of a sentence
// Use this in a "Set" node or "Code" node in n8n

// Method 1: Using Regular Expression (most reliable)
const text = "A contact with the email 'bypasscollision@yahoo.com' already exists. Existing ID: 122226941560";
const numberMatch = text.match(/\d+$/);
const extractedNumber = numberMatch ? numberMatch[0] : null;

// Method 2: Using split and filter for numbers at the end
const words = text.split(' ');
const lastWord = words[words.length - 1];
const isNumber = /^\d+$/.test(lastWord);
const numberFromSplit = isNumber ? lastWord : null;

// Method 3: More robust regex that handles various end patterns
const robustMatch = text.match(/(\d+)\s*$/);
const robustNumber = robustMatch ? robustMatch[1] : null;

// For n8n workflow, you would typically use one of these expressions:

// In a Set node, you can use this expression:
// {{ $json.message.match(/\d+$/)?.[0] }}

// Or in a Code node:
// return [{ 
//   extractedId: $input.first().json.message.match(/\d+$/)?.[0] || null,
//   originalMessage: $input.first().json.message
// }];

console.log("Method 1 (regex \\d+$):", extractedNumber);
console.log("Method 2 (split last word):", numberFromSplit);
console.log("Method 3 (robust regex):", robustNumber);