require("dotenv").config({
  quiet: true
});

const keys = Object.keys(process.env)
  .filter(key => key.startsWith("GOOGLE_API_KEY_"))
  .sort()
  .map(key => process.env[key]);

  if (keys.length === 0) {
  throw new Error(
    "No Google API keys found in .env file"
  );
}

let currentIndex = 0;

function getKey() {
  return keys[currentIndex];
}

function rotateKey() {
  currentIndex = (currentIndex + 1) % keys.length;
}

function totalKeys() {
  return keys.length;
}

module.exports = {
  getKey,
  rotateKey,
  totalKeys
};