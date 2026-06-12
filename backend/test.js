// test.js

require("dotenv").config();

const keys = Object.keys(process.env)
  .filter(k => k.startsWith("GOOGLE_API_KEY_"))
  .sort();

console.log(keys);