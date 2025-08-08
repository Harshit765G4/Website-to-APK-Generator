// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const updateJavaFileWithURL = require('./updateJavaWithURL');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/output', express.static(path.join(__dirname, '../output')));

// Route to handle APK generation
app.post('/generate-apk', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        // 1. Update the WebView URL in MainActivity.java
        updateJavaFileWithURL(url);

        // 2. Build the APK using Gradle
        const androidProjectPath = path.join(__dirname, 'android-template');
        const gradlew = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';

        console.log('🔧 Building APK...');
        exec(`${gradlew} assembleDebug`, { cwd: androidProjectPath }, (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Gradle build failed:', stderr);
                return res.status(500).json({ error: 'APK build failed' });
            }

            console.log('✅ APK built successfully.');

            // 3. Copy APK to output folder
            const builtApkPath = path.join(
                androidProjectPath,
                'app',
                'build',
                'outputs',
                'apk',
                'debug',
                'app-debug.apk'
            );

            const outputFolder = path.join(__dirname, '../output');
            if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder);

            const outputApkPath = path.join(outputFolder, 'YourWebsiteApp.apk');
            fs.copyFileSync(builtApkPath, outputApkPath);

            return res.json({ apkUrl: '/output/YourWebsiteApp.apk' });
        });
    } catch (err) {
        console.error('❌ Error:', err.message);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});