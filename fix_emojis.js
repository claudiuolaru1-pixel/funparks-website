const fs=require('fs');
// Read the source file from outputs and write with correct encoding
// We'll rebuild just the broken emoji parts
let c=fs.readFileSync('app/agent/page.js','utf8');

// Fix all broken emoji sequences
const fixes={
  'ðŸ"¸':'📸',
  'ðŸŽµ':'🎵',
  'â–¶ï¸':'▶️',
  'ðŸ'¥':'👥',
  'ðŸ"…':'📅',
  'âœ¨':'✨',
  'ðŸŽ¢':'🎢',
  'ðŸŒ':'🌍',
  'ðŸ‡ªðŸ‡º':'🇪🇺',
  'ðŸŒ':'🌏',
  'ðŸ‡ºðŸ‡¸':'🇺🇸',
  'ðŸ'¡':'💡',
  'âœˆï¸':'✈️',
  'ðŸŒŠ':'🌊',
  'ðŸ—ºï¸':'🗺️',
  'âš"ï¸':'⚔️',
  'ðŸ"°':'📰',
  'ðŸ'Ž':'💎',
  'ðŸ†':'🏆',
  'ðŸ"±':'📱',
  'ðŸŽ‰':'🎉',
  'ðŸ"š':'📚',
  'ðŸ"¥':'🔥',
  'ðŸŽ¡':'🎡',
  'âœ…':'✅',
  'ðŸ"‹':'📋',
  'ðŸ"':'📝',
  'ðŸš€':'🚀',
  'â³':'⏳',
  'ðŸ'°':'💰',
  'â†'':'→',
};

Object.entries(fixes).forEach(([bad,good])=>{
  c=c.split(bad).join(good);
});

fs.writeFileSync('app/agent/page.js',c,'utf8');
console.log('Emojis fixed');

// Verify
const check=fs.readFileSync('app/agent/page.js','utf8');
const hasWeekly=check.includes('Weekly Schedule');
const hasEmoji=check.includes('📸');
console.log('Has Weekly Schedule:',hasWeekly);
console.log('Has correct emoji:',hasEmoji);