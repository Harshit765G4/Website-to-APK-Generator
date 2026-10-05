# 🌐 Website to APK Generator

Convert any publicly accessible website URL into an Android APK using a reusable Android WebView template and an Express.js backend.

The project provides a simple web interface where you enter a website URL, start the APK generation process, and download the generated debug APK once the Android project has been built.

---

## ✨ Features

- 🔗 Convert a website URL into an Android application
- 📱 Uses an Android WebView to load the supplied website
- ⚙️ Automatically updates the WebView URL in the Android template
- 🏗️ Builds the APK automatically with Gradle
- 📦 Copies the generated APK into an output directory
- ⬇️ Provides a direct download link for the generated APK
- 🎨 Simple frontend with animated particle background and loading feedback
- 🌍 CORS-enabled Express backend for frontend/backend communication
- 🪟 Supports Windows Gradle builds through `gradlew.bat` and Unix-like systems through `./gradlew`

---

## 🏗️ How It Works

```text
Website URL
    │
    ▼
Frontend (HTML/CSS/JavaScript)
    │
    │ POST /generate-apk
    ▼
Express.js Backend
    │
    ▼
Update MainActivity.java
    │
    ▼
Android WebView Template
    │
    ▼
Gradle Build (assembleDebug)
    │
    ▼
Generated APK
    │
    ▼
output/YourWebsiteApp.apk
    │
    ▼
Download APK
```

### Generation Flow

1. Enter a website URL in the frontend.
2. The frontend sends the URL to the backend using `POST /generate-apk`.
3. The backend updates the WebView URL inside `MainActivity.java`.
4. The Android project is built using Gradle.
5. The generated `app-debug.apk` is copied to the `output` folder.
6. The frontend displays a download link for the generated APK.

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Canvas API

### Backend
- Node.js
- Express.js
- CORS
- Body Parser
- Node.js `child_process`
- Node.js `fs` and `path`

### Android
- Android WebView
- Java
- Gradle
- Android SDK
- AndroidX
- Material Components

---

## 📁 Project Structure

```text
Website-to-APK-Generator/
│
├── backend/
│   ├── android-template/
│   │   ├── app/
│   │   │   ├── src/
│   │   │   ├── build.gradle
│   │   │   └── proguard-rules.pro
│   │   ├── gradle/
│   │   ├── build.gradle
│   │   ├── gradle.properties
│   │   ├── gradlew
│   │   ├── gradlew.bat
│   │   └── settings.gradle
│   │
│   ├── index.js
│   ├── updateJavaWithURL.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   └── index.html
│
├── output/
│   └── YourWebsiteApp.apk
│
└── README.md
```

> The `output/` directory is created by the backend when an APK is generated.

---

## 📋 Prerequisites

Make sure you have the following installed:

- **Node.js**
- **npm**
- **JDK**
- **Android SDK / Android build tools**
- Internet access for Gradle dependencies and the website being packaged

The Android template is configured with:

- **compileSdk:** 36
- **targetSdk:** 36
- **minSdk:** 24
- **Java compatibility:** Java 11

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Harshit765G4/Website-to-APK-Generator.git
cd Website-to-APK-Generator
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

---

## ▶️ Running the Backend

From the `backend` directory:

```bash
node index.js
```

The backend starts on:

```text
http://localhost:3000
```

Expected output:

```text
🚀 Server running at http://localhost:3000
```

---

## 🖥️ Running the Frontend

Open:

```text
frontend/index.html
```

You can open it directly in a browser or serve the `frontend` directory using a local development server.

Enter a website URL, for example:

```text
https://example.com
```

Then click **Generate APK**.

---

## 🔌 API

### Generate APK

**Endpoint**

```http
POST /generate-apk
```

**Request body**

```json
{
  "url": "https://example.com"
}
```

**Successful response**

```json
{
  "apkUrl": "/output/YourWebsiteApp.apk"
}
```

### Download Generated APK

```http
GET /output/YourWebsiteApp.apk
```

---

## 🔧 Internal APK Generation

The backend performs three main steps.

### 1. Update the WebView URL

The submitted URL is inserted into:

```text
backend/android-template/app/src/main/java/com/example/webviewapp/MainActivity.java
```

The existing:

```java
myWebView.loadUrl("...");
```

statement is replaced with the URL supplied by the user.

### 2. Build the Android project

The backend runs:

```bash
gradlew assembleDebug
```

On Windows:

```bash
gradlew.bat assembleDebug
```

### 3. Copy the APK

The generated debug APK is copied to:

```text
output/YourWebsiteApp.apk
```

---

## ⚠️ Important Notes

- The project currently generates a **debug APK**, not a production-signed release APK.
- The supplied website must be reachable from the Android device.
- The generated app is a WebView wrapper around the supplied website.
- Websites requiring special permissions, browser APIs, authentication behavior, or native mobile features may need additional Android configuration.
- APK generation requires a working Java, Android SDK, and Gradle environment on the machine running the backend.
- The current URL replacement mechanism should be hardened with stronger validation and escaping before being exposed as a public service.

---

## 🔐 Security Considerations

This project is best suited for local development and experimentation.

Before deploying it publicly, consider adding:

- URL validation and allow/block lists
- Input sanitization and safe escaping
- Authentication and authorization
- Rate limiting
- Build-job isolation
- Build timeouts and process limits
- Temporary-file cleanup
- Per-user output directories
- Sandboxed Android/Gradle builds
- Secure release signing and keystore management

> Allowing arbitrary users to trigger build commands on a server is a security-sensitive operation.

---

## 🔮 Future Improvements

- 🎨 Custom app name
- 📦 Custom package name
- 🖼️ Custom app icon
- 🔐 Signed release APK generation
- ✍️ Version and version-code configuration
- 🧩 Custom splash screen
- 📲 Better WebView navigation and back-button handling
- 📡 Website permission handling
- 🧹 Automatic cleanup of build files
- 🐳 Docker-based build isolation
- ☁️ Cloud-based APK generation
- 📊 Real-time build logs and progress
- 📱 AAB (Android App Bundle) generation

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test the project locally.
5. Open a pull request.

---

## 📄 License

The repository currently does not include a dedicated `LICENSE` file.

If you plan to distribute or reuse this project publicly, consider adding an appropriate open-source license.

---

## 👨‍💻 Author

**Harshit Garg**

GitHub: [@Harshit765G4](https://github.com/Harshit765G4)

Repository: [Website-to-APK-Generator](https://github.com/Harshit765G4/Website-to-APK-Generator)

---

⭐ If you find this project useful, consider giving the repository a star!
