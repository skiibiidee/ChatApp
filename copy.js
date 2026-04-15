const fs = require("fs");
const path = require("path");
require("dotenv").config();

const sourceDir = path.resolve(__dirname, "./public");
const destDir = path.resolve(__dirname, "./firebase");

// Copy entire folder recursively
fs.cpSync(sourceDir, destDir, { recursive: true });

// Now modify index.html
const serviceUrl = process.env.SERVICEURL;

const appPath = path.join(destDir, "index.html");
let appContent = fs.readFileSync(appPath, "utf-8");

appContent = appContent.replace(
  'const rootUrl = ""',
  `const rootUrl = "${serviceUrl}"`
);

fs.writeFileSync(appPath, appContent);

console.log("Public folder mirrored successfully.");