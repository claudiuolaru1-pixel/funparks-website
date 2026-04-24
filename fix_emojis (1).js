const fs=require('fs');
const path='app/agent/page.js';
let c=fs.readFileSync(path,'utf8');

// Map mojibake sequences to correct emojis
const fixes=[
  ['\u00f0\u009f\u0093\u00b8','\u{1f4f8}'],   // 📸
  ['\u00f0\u009f\u008e\u00b5','\u{1f3b5}'],   // 🎵
  ['\u00e2\u0096\u00b6\u00ef\u00b8\u008f','\u25b6\ufe0f'], // ▶️
  ['\u00f0\u009f\u0091\u00a5','\u{1f465}'],   // 👥
  ['\u00f0\u009f\u0093\u0085','\u{1f4c5}'],   // 📅
  ['\u00e2\u009c\u00a8','\u2728'],             // ✨
  ['\u00f0\u009f\u008e\u00a2','\u{1f3a2}'],   // 🎢
  ['\u00f0\u009f\u008c\u008d','\u{1f30d}'],   // 🌍
  ['\u00f0\u009f\u008c\u008f','\u{1f30f}'],   // 🌏
  ['\u00f0\u009f\u0092\u00a1','\u{1f4a1}'],   // 💡
  ['\u00f0\u009f\u008e\u0089','\u{1f389}'],   // 🎉
  ['\u00f0\u009f\u0093\u009a','\u{1f4da}'],   // 📚
  ['\u00f0\u009f\u0094\u00a5','\u{1f525}'],   // 🔥
  ['\u00f0\u009f\u008e\u00a1','\u{1f3a1}'],   // 🎡
  ['\u00e2\u009c\u0085','\u2705'],             // ✅
  ['\u00f0\u009f\u0093\u008b','\u{1f4cb}'],   // 📋
  ['\u00f0\u009f\u0093\u009d','\u{1f4dd}'],   // 📝
  ['\u00f0\u009f\u009a\u0080','\u{1f680}'],   // 🚀
  ['\u00e2\u008f\u00b3','\u23f3'],             // ⏳
  ['\u00f0\u009f\u008c\u008a','\u{1f30a}'],   // 🌊
  ['\u00f0\u009f\u0092\u00b0','\u{1f4b0}'],   // 💰
  ['\u00e2\u009c\u0088\u00ef\u00b8\u008f','\u2708\ufe0f'], // ✈️
  ['\u00f0\u009f\u0097\u00ba\u00ef\u00b8\u008f','\u{1f5fa}\ufe0f'], // 🗺️
  ['\u00e2\u009a\u0094\u00ef\u00b8\u008f','\u2694\ufe0f'], // ⚔️
  ['\u00f0\u009f\u0093\u00b0','\u{1f4f0}'],   // 📰
  ['\u00f0\u009f\u0092\u008e','\u{1f48e}'],   // 💎
  ['\u00f0\u009f\u008f\u0086','\u{1f3c6}'],   // 🏆
  ['\u00f0\u009f\u0093\u00b1','\u{1f4f1}'],   // 📱
  ['\u00f0\u009f\u0087\u00aa\u00f0\u009f\u0087\u00ba','\u{1f1ea}\u{1f1fa}'], // 🇪🇺
  ['\u00f0\u009f\u0087\u00ba\u00f0\u009f\u0087\u00b8','\u{1f1fa}\u{1f1f8}'], // 🇺🇸
];

fixes.forEach(([bad,good])=>{
  while(c.includes(bad)) c=c.split(bad).join(good);
});

fs.writeFileSync(path,c,'utf8');
console.log('Fixed emojis');
console.log('Has Weekly Schedule:',c.includes('Weekly Schedule'));
console.log('Has 📸:',c.includes('\u{1f4f8}'));
console.log('Has 🎢:',c.includes('\u{1f3a2}'));
