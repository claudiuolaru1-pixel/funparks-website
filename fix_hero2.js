const fs = require('fs');
const file = "C:\\Users\\Lenovo\\OneDrive\\Desktop\\funparks-website\\components\\Hero.js";
let c = fs.readFileSync(file, 'utf8');
c = c.replace(
  "<Link href='/parks' className='inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white border-2 border-purple-200 text-gray-700 font-bold text-base hover:border-purple-400 transition-all shadow-md'>\n              Explore Parks \uD83D\uDDFA\uFE0F\n            </Link>",
  "<a href='https://apps.apple.com/app/funparks-theme-park-guide/id6763944775' target='_blank' rel='noopener noreferrer' className='inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white border-2 border-purple-200 text-gray-700 font-bold text-base hover:border-purple-400 transition-all shadow-md'>\n              Download on iOS \uD83C\uDF4E\n            </a>\n            <Link href='/parks' className='inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white border-2 border-purple-200 text-gray-700 font-bold text-base hover:border-purple-400 transition-all shadow-md'>\n              Explore Parks \uD83D\uDDFA\uFE0F\n            </Link>"
);
fs.writeFileSync(file, c, 'utf8');
console.log('Done');