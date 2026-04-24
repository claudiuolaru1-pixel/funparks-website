const fs=require('fs');
let c=fs.readFileSync('components/DownloadSection.js','utf8');
// Fix the button text divs
c=c.replace("'text-xs text-gray-400 uppercase tracking-wider mb-0.5'>Get it on<","'text-xs text-gray-400 uppercase tracking-wider mb-0.5'>Coming soon on<");
c=c.replace("'text-xs text-white/40 uppercase tracking-wider mb-0.5'>Download on the<","'text-xs text-white/40 uppercase tracking-wider mb-0.5'>Coming soon on<");
// Disable the actual store links
c=c.replace("href={PLAY}","href='#' onClick={(e)=>e.preventDefault()}");
c=c.replace("href={IOS}","href='#' onClick={(e)=>e.preventDefault()}");
fs.writeFileSync('components/DownloadSection.js',c,'utf8');
console.log('DownloadSection fixed');