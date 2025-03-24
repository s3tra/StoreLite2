![Logo](./sl2.png?raw=true)

### StoreLite2

[![CodeFactor](https://www.codefactor.io/repository/github/s3tra/storelite2/badge)](https://www.codefactor.io/repository/github/s3tra/storelite2)

**StoreLite2** is a lightweight, easy-to-use npm package designed for storing and retrieving data in JSON files. It provides simple methods to save and fetch your data using a unique key.

### Features:

- Store data with a unique key
- Retrieve data quickly using the key
- Save data in a JSON format for easy access

### Getting Started

To get started with StoreLite2, simply install it via npm:

```bash
npm install storelite2
```

### Usage

Once installed, you can use the following methods to save and retrieve data:

```javascript
// To save data
await saveData({
  _key: 'uniqueKey123',
  someData: ['item1', 'item2'],
});

// To retrieve data
const data = await getData('uniqueKey123');
console.log(data); // Returns the saved data associated with 'uniqueKey123'
```
