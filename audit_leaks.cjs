const fs = require('fs');
const path = require('path');
const SKIP = new Set(['node_modules','.git','dsh-our-free-model','heimdall-token-saver','.opencode','.agents','test-results','.playwright-mcp']);
function walk(dir){
  let out=[];
  for(const f of fs.readdirSync(dir)){
    if(SKIP.has(f)) continue;
    const fp=path.join(dir,f);
    if(fs.statSync(fp).isDirectory()) out=out.concat(walk(fp));
    else out.push(fp);
  }
  return out;
}
const files=walk('.');
const cssFiles=files.filter(f=>f.endsWith('.css'));
const htmlFiles=files.filter(f=>f.endsWith('.html')&&!f.includes('tests'));
const jsFiles=files.filter(f=>f.endsWith('.js')&&!f.includes('tests')&&!f.includes('node_modules'));

console.log('=== CSS FILES ===');
console.log('Count:', cssFiles.length);
cssFiles.forEach(f=>console.log(' ', f));

console.log('\n=== HTML STYLE LEAKS ===');
let htmlLeaks=0;
for(const f of htmlFiles){
  const c=fs.readFileSync(f,'utf8');
  // style tags
  const styleTags=[...c.matchAll(/<style[\s\S]*?<\/style>/gi)];
  // inline style with color/bg/border attrs (skip display:none)
  const inlineColors=[...c.matchAll(/style="([^"]*)"/gi)]
    .filter(m=>{
      const v=m[1];
      return /color|background|border|font-size/.test(v) && !/^display/.test(v.trim());
    });
  if(styleTags.length||inlineColors.length){
    console.log('FILE:', f);
    styleTags.forEach(m=>console.log('  <style>:', m[0].substring(0,120)));
    inlineColors.forEach(m=>console.log('  inline:', m[0].substring(0,120)));
    htmlLeaks++;
  }
}
if(!htmlLeaks) console.log('CLEAN');

console.log('\n=== JS DOM STYLE LEAKS ===');
let jsLeaks=0;
for(const f of jsFiles){
  const c=fs.readFileSync(f,'utf8');
  const matches=[...c.matchAll(/\.style\.(color|background|backgroundColor|border|fontSize|cssText)\s*=/g)];
  if(matches.length){
    console.log('FILE:', f, '->', matches.length, 'hits');
    jsLeaks+=matches.length;
  }
}
if(!jsLeaks) console.log('CLEAN');

console.log('\n=== INDEX.HTML LOCAL STYLESHEET LINKS ===');
const idx=fs.readFileSync('index.html','utf8');
const localLinks=[...idx.matchAll(/<link[^>]*rel="stylesheet"[^>]*href="(?!http)[^"]+"/gi)];
console.log('Local <link> count:', localLinks.length);
localLinks.forEach(m=>console.log(' ', m[0].substring(0,120)));
if(!localLinks.length) console.log('CLEAN');
