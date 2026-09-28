const fs = require('fs');
const path = require('path');

const tabsDir = 'd:/caseBook/components/tabs';
const tabs = fs.readdirSync(tabsDir);

for (const tab of tabs) {
    const tabPath = path.join(tabsDir, tab);
    if (fs.statSync(tabPath).isDirectory()) {
        const htmlFile = path.join(tabPath, tab + '.html');
        const jsFile = path.join(tabPath, tab + '.js');
        
        if (fs.existsSync(htmlFile) && fs.existsSync(jsFile)) {
            let htmlContent = fs.readFileSync(htmlFile, 'utf8');
            // Escape backticks and ${} to prevent template literal corruption
            htmlContent = htmlContent.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
            
            let jsContent = fs.readFileSync(jsFile, 'utf8');
            
            // Remove the broken assignments that the subagents made.
            // Some used `...`, some used \...\
            jsContent = jsContent.replace(/window\.__casebook_tabs\[.*?\]\s*=\s*[\s\S]*?(?=function\s|window\.|$)/g, '');
            
            let newJsContent = `window.__casebook_tabs = window.__casebook_tabs || {};\nwindow.__casebook_tabs['${tab}'] = \`${htmlContent}\`;\n\n${jsContent}`;
            
            fs.writeFileSync(jsFile, newJsContent, 'utf8');
            console.log('Fixed:', jsFile);
        }
    }
}
