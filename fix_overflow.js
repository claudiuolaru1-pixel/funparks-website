const fs=require('fs');

// Fix globals.css
let css=fs.readFileSync('app/globals.css','utf8');
if(!css.includes('overflow-x: hidden')){
  css='html, body { overflow-x: hidden; }\n'+css;
  fs.writeFileSync('app/globals.css',css,'utf8');
  console.log('globals fixed');
}

// Fix layout.js - add overflow hidden to body tag
let layout=fs.readFileSync('app/layout.js','utf8');
layout=layout.replace('<body>','<body style={{overflowX:"hidden"}}>');
fs.writeFileSync('app/layout.js',layout,'utf8');
console.log('layout fixed');