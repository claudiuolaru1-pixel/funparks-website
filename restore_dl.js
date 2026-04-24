const fs=require('fs');

// Restore DownloadSection to working state - real links, Coming Soon text, no onClick
let c=fs.readFileSync('components/DownloadSection.js','utf8');

// Replace any remaining broken href="#" with real store links
const PLAY='https://play.google.com/store/apps/details?id=com.funparks.app';
const IOS='https://apps.apple.com/app/funparks/id000000000';

// Remove ALL onClick from anchor tags completely
c=c.replace(/ onClick=\(e\)=>e\.preventDefault\(\)/g,'');
c=c.replace(/ onClick=\{[^}]*\}/g,'');
c=c.replace(/href='#'/g,"href='"+PLAY+"'");

fs.writeFileSync('components/DownloadSection.js',c,'utf8');
console.log('DownloadSection restored');

// Check for any remaining onClick in anchor tags
const anchors=c.match(/<a [^>]*onClick[^>]*>/g)||[];
console.log('Remaining <a onClick> tags:',anchors.length);