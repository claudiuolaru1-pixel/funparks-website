const fs=require('fs');
let c=fs.readFileSync('components/DownloadSection.js','utf8');
// Remove the onClick handlers - just keep href="#"
c=c.replace(/href='#' onClick=\{[^}]+\}/g,"href='#'");
fs.writeFileSync('components/DownloadSection.js',c,'utf8');
console.log('Fixed DownloadSection');