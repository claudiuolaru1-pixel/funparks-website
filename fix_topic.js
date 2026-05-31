const fs = require("fs");
const path = "C:/Users/claud/OneDrive/Desktop/funparks-website/public/topics.json";
let topics = JSON.parse(fs.readFileSync(path, "utf8"));

const sunday = topics["Sunday"];
const idx = sunday.topics.findIndex(t => t.title.toLowerCase().includes("warner") && t.title.toLowerCase().includes("dreamworld"));
if (idx >= 0) {
  sunday.topics[idx] = {
    title: "Wet'n'Wild Gold Coast: Australia's best water park guide",
    category: "Park Guide",
    tone: "fun"
  };
  fs.writeFileSync(path, JSON.stringify(topics, null, 2), "utf8");
  console.log("Replaced at index", idx);
} else {
  console.log("Topic not found");
}