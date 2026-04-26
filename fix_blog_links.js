const fs=require('fs');
let c=fs.readFileSync('app/blog/[slug]/page.js','utf8');

const oldFn=`function renderContent(text) {
  return text.split('\\n\\n').map((para, i) => {
    if (para.startsWith('**') && para.endsWith('**')) {
      return '<h3 style="font-family:Syne,sans-serif;font-size:20px;font-weight:800;color:#1a1a2e;margin:28px 0 12px">' + para.replace(/\\*\\*/g,'') + '</h3>';
    }
    const formatted = para.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
    return '<p style="color:#374151;line-height:1.8;margin-bottom:16px;font-size:16px">' + formatted + '</p>';
  }).join('');
}`;

const newFn=`function renderContent(text) {
  return text.split('\\n\\n').map((para, i) => {
    if (para.startsWith('**') && para.endsWith('**')) {
      return '<h3 style="font-family:Syne,sans-serif;font-size:20px;font-weight:800;color:#1a1a2e;margin:28px 0 12px">' + para.replace(/\\*\\*/g,'') + '</h3>';
    }
    let formatted = para.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>');
    // Convert markdown links to styled affiliate buttons
    formatted = formatted.replace(/\\[([^\\]]+)\\]\\((https?:[^)]+)\\)/g, function(match, label, url) {
      let bg = '#1a1a2e';
      let icon = '🔗';
      if(url.includes('getyourguide')) { bg='#FF6B2B'; icon='⚡'; }
      else if(url.includes('viator')) { bg='#1a73e8'; icon='🗺️'; }
      else if(url.includes('booking')) { bg='#003580'; icon='🏨'; }
      else if(url.includes('klook')) { bg='#FF6600'; icon='🎟️'; }
      return '<a href="'+url+'" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:10px;background:'+bg+';color:white;text-decoration:none;font-weight:700;font-size:14px;margin:4px 4px 4px 0;vertical-align:middle">'+icon+' '+label+'</a>';
    });
    return '<p style="color:#374151;line-height:1.8;margin-bottom:16px;font-size:16px">' + formatted + '</p>';
  }).join('');
}`;

if(c.includes('function renderContent')){
  c=c.replace(oldFn,newFn);
  if(c.includes('Convert markdown links')){
    console.log('Fixed renderContent - links now show as buttons');
  } else {
    // Try simpler replacement
    const start=c.indexOf('function renderContent');
    const end=c.indexOf('}',c.indexOf('.join',start))+1;
    c=c.substring(0,start)+newFn+c.substring(end);
    console.log('Fixed with position-based replacement');
  }
} else {
  console.log('renderContent not found');
}

fs.writeFileSync('app/blog/[slug]/page.js',c,'utf8');
console.log('Done');