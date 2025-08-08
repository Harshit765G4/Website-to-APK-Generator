const fs = require('fs');
const path = require('path');

function updateJavaWithURL(url) {
    const mainActivityPath = path.join(__dirname, 'android-template', 'app', 'src', 'main', 'java', 'com', 'example', 'webviewapp', 'MainActivity.java');
    
    let content = fs.readFileSync(mainActivityPath, 'utf-8');

    const newContent = content.replace(
        /myWebView\.loadUrl\(".*?"\);/,
        `myWebView.loadUrl("${url}");`
    );

    fs.writeFileSync(mainActivityPath, newContent, 'utf-8');
    console.log(`✅ Updated MainActivity.java with URL: ${url}`);
}

module.exports = updateJavaWithURL;
