import fs from "fs";
import path from "path";

const ignore = ["node_modules", ".expo", ".git", "dist", "build"]; // folders to ignore

function listDir(dir, prefix = "", isLast = true) {
  const items = fs.readdirSync(dir).filter(item => !ignore.includes(item));

  items.forEach((item, index) => {
    const fullPath = path.join(dir, item);
    const isDir = fs.statSync(fullPath).isDirectory();
    const lastItem = index === items.length - 1;

    // Print current item with tree lines
    console.log(`${prefix}${lastItem ? "└── " : "├── "}${item}`);

    // If folder, recurse into it
    if (isDir) {
      const newPrefix = prefix + (lastItem ? "    " : "│   ");
      listDir(fullPath, newPrefix, lastItem);
    }
  });
}

// Start from current directory
console.log(path.basename(process.cwd()));
listDir(".");
