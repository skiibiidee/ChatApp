const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Define source and destination paths
const sourceFiles = [
  { src: "./public/index.html", dest: "./firebase/index.html" },
  { src: "./public/manifest.json", dest: "./firebase/manifest.json" },
  { src: "./public/styles.css", dest: "./firebase/styles.css" },
  { src: "./CHANGELOG.md", dest: "./firebase/CHANGELOG.md" },
  { src: "./public/script.js", dest: "./firebase/script.js" },
];

// Copy files
sourceFiles.forEach((file) => {
  fs.copyFileSync(
    path.resolve(__dirname, file.src),
    path.resolve(__dirname, file.dest),
  );
});

const serviceUrl = process.env.SERVICEURL;

// Update the script.js file
const appPath = path.resolve(__dirname, "./firebase/index.html");
let appContent = fs.readFileSync(appPath, "utf-8");

// Replace rootUrl and io() with the serviceUrl
appContent = appContent.replace(
  'const rootUrl = ""',
  `const rootUrl = "${serviceUrl}"`,
);


// Write the updated content back to the script.js file
fs.writeFileSync(appPath, appContent);
