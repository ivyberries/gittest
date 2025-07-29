# n8n Code Examples: Extract Numbers from End of Sentence

## Scenario
Extract the ID number `122226941560` from:
```
A contact with the email 'bypasscollision@yahoo.com' already exists. Existing ID: 122226941560
```

## Method 1: Using Set Node

**Node Type:** Set
**Field Name:** `extractedId`
**Expression:**
```javascript
{{ $json.message.match(/\d+$/)?.[0] }}
```

## Method 2: Using Code Node

**Node Type:** Code
**JavaScript Code:**
```javascript
// Extract number from the end of the message
const message = $input.first().json.message;
const numberMatch = message.match(/\d+$/);
const extractedId = numberMatch ? numberMatch[0] : null;

return [{
  extractedId: extractedId,
  originalMessage: message,
  hasId: extractedId !== null
}];
```

## Method 3: Using Function Node (Alternative)

**Node Type:** Function
**JavaScript Code:**
```javascript
const items = $input.all();

return items.map(item => {
  const text = item.json.message || item.json.text || '';
  
  // Extract trailing numbers
  const match = text.match(/(\d+)\s*$/);
  const id = match ? match[1] : null;
  
  return {
    json: {
      ...item.json,
      extractedId: id,
      idAsNumber: id ? parseInt(id, 10) : null
    }
  };
});
```

## Method 4: Using IF Node + Set Node Combination

**Step 1 - IF Node:**
- Condition: `{{ $json.message.includes('Existing ID:') }}`

**Step 2 - Set Node (if true):**
- Field: `extractedId`
- Expression: `{{ $json.message.match(/\d+$/)?.[0] }}`

## Regex Patterns Explained

- `/\d+$/` - Matches one or more digits at the end of the string
- `/(\d+)\s*$/` - Matches digits followed by optional whitespace at the end
- `/ID:\s*(\d+)/` - Specifically matches "ID:" followed by optional space and digits

## Test Cases

All methods should extract `122226941560` from these variations:
- `Existing ID: 122226941560`
- `Existing ID:122226941560`
- `Existing ID: 122226941560   `
- `Contact already exists. ID: 122226941560`