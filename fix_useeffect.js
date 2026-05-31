const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

// Fix the import to include useEffect
c = c.replace(
  "import { useState } from 'react';",
  "import { useState, useEffect } from 'react';"
);

fs.writeFileSync("app/agent/page.js", c, "utf8");
console.log("Fixed! useEffect imported:", c.includes("useEffect"));