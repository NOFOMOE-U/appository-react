const fs = require('fs')

const nxConfig = {
  $schema: './node_modules/nx/schemas/nx-schema.json',
  npmScope: 'appository',
  projects: {
    'your-app': {
      architect: {
        'build-android': {
          builder: '@nrwl/android:build',
          options: {
            outputPath: process.env.ANDROID_OUTPUT_PATH || "dist/android",
            androidPackageId: process.env.ANDROID_PACKAGE_ID || 'com.example.myapp',
            androidPackageId: process.env.ANDROID_PACKAGE_ID || 'com.example.myapp',
            androidKeystoreFile: process.env.ANDROID_KEYSTORE_FILE || 'path/to/keystore',
            androidMinSdkVersion: process.env.ANDROID_MIN_SDK_VERSION || 21,
            androidTargetSdkVersion: process.env.ANDROID_TARGET_SDK_VERSION || 30,
            androidVersionCode: process.env.ANDROID_VERSION_CODE || 1,
            androidVersionName: process.env.ANDROID_VERSION_NAME || '1.0.0',
            androidBuildType: process.env.ANDROID_BUILD_TYPE || 'debug',
            androidBuildVariant: process.env.ANDROID_BUILD_VARIANT || 'armeabi-v7a',
            androidResourceConfig: {
              resSrc: 'apps/your-app/src/main/res',
              resOutput: 'build/your-app/generated/res',
              configurations: {
                debug: {
                  resValues: {
                    yourString: 'This is a debug string',
                  },
                },
                release: {
                  resValues: {
                    yourString: 'This is a release string',
                  },
                },
              },
            },
            androidSplitApk: process.env.ANDROID_SPLIT_APK === 'true' || false,
            androidGoogleServicesJson: process.env.ANDROID_GOOGLE_SERVICES_JSON || 'apps/your-app/google-services.json',
            // ... other options ...
          },
          // ... other options ...
        },
        'build-ios': {
          builder: '@nrwl/ios:build',
          options: {
            outputPath: process.env.IOS_OUTPUT_PATH || "dist/ios",
            iosBundleIdentifier: process.env.IOS_BUNDLE_IDENTIFIER || 'com.example.myapp',
            iosBitcode: process.env.IOS_BITCODE === 'true' || false,
            iosAppIcon: process.env.IOS_APP_ICON || 'path/to/app-icon.png',
            iosLaunchScreen: process.env.IOS_LAUNCH_SCREEN || 'path/to/launch-screen.xib',
            iosDeviceFamily: process.env.IOS_DEVICE_FAMILY || ['iPhone'],
            iosWatchApp: {
              bundleIdentifier: process.env.IOS_WATCH_BUNDLE_IDENTIFIER || 'com.example.watchapp',
              deploymentTarget: {
                iOS: '9.0',
                watchOS: '2.0',
              },
              watchAppIcon: process.env.IOS_WATCH_APP_ICON || 'path/to/watch-app-icon.png',
              watchComplication: true,
              // ... other watch app options ...
            },
            // ... other iOS options ...
            iosCustomOption1: process.env.IOS_CUSTOM_OPTION_1 || 'default-value-1',
            iosCustomOption2: process.env.IOS_CUSTOM_OPTION_2 || 'default-value-2',

            // ... other iOS options ...
          },
        },
      },
    },
  },
  tasksRunnerOptions: {
    default: {
      runner: '@nrwl/nx-cloud',
      options: {
        cacheableOperations: ['build', 'lint', 'test', 'e2e', 'build-storybook'],
        accessToken: process.env.NX_ACCESS_TOKEN || 'your-default-access-token',
      },
    },
  },

  // ... rest of the nx.json file ...
}

fs.writeFileSync('nx.json', JSON.stringify(nxConfig, null, 2))





//todo
// Checklist:
// Configuration Script:

// Create the nx-update-config.js script as shown in previous examples.
// Include configurations for both Android and iOS in the script.
// Define default values and options for various build configurations.
// Add Script to Package.json:

// Update your package.json to include scripts for running the configuration script.
// json
// Copy code
// "scripts": {
//   "update-config": "node nx-update-config.js"
// }
// Run Configuration Script:

// Run the script to generate or update the nx.json file.
// bash
// Copy code
// npm run update-config
// Choose Configurations:

// In the nx.json file, users can customize configurations for Android and iOS by setting environment variables or providing values directly in the script.
// Build Commands:

// Define build commands for bundling Android and iOS applications.
// json
// Copy code
// "scripts": {
//   "build-android": "nx run your-app:build-android",
//   "build-ios": "nx run your-app:build-ios"
// }
// Run Build Commands:

// Execute build commands based on the chosen platform.
// bash
// Copy code
// npm run build-android
// bash
// Copy code
// npm run build-ios
// Download File:

// Use the Nx outputPath option to define the location where build artifacts are generated.
// json
// Copy code
// "projects": {
//   "your-app": {
//     "architect": {
//       "build-android": {
//         "builder": "@nrwl/android:build",
//         "options": {
//           "outputPath": "dist/android"
//           // ... other options ...
//         }
//       },
//       "build-ios": {
//         "builder": "@nrwl/ios:build",
//         "options": {
//           "outputPath": "dist/ios"
//           // ... other options ...
//         }
//       }
//     }
//   }
// }
// Users can download the generated files from the specified outputPath.
// Provide Default Download Option:

// Set default outputPath values in the Nx configuration for Android and iOS.
// Users can override these defaults by setting environment variables or providing values directly.
// Example:
// Here's a simplified example of how your Nx configuration might look:

// json
// Copy code
// "projects": {
//   "your-app": {
//     "architect": {
//       "build-android": {
//         "builder": "@nrwl/android:build",
//         "options": {
//           "outputPath": process.env.ANDROID_OUTPUT_PATH || "dist/android",
//           // ... other options ...
//         }
//       },
//       "build-ios": {
//         "builder": "@nrwl/ios:build",
//         "options": {
//           "outputPath": process.env.IOS_OUTPUT_PATH || "dist/ios",
//           // ... other options ...
//         }
//       }
//     }
//   }
// }





//todo ios and  android set up and consideratins
// For Android (APK):
// 1. Automate APK Generation:
// Set up a continuous integration/continuous deployment (CI/CD) pipeline to automate the APK generation process.
// Use tools like Jenkins, GitLab CI, or GitHub Actions to trigger builds and create signed APKs automatically.
// 2. Distribute APK Download Links:
// After the APK is generated, provide users with a download link.
// You can host the APK on a server, cloud storage, or use a dedicated service for distributing Android apps (e.g., Firebase App Distribution).
// 3. Implement Versioning:
// Implement a versioning system for your app.
// Include the version number in the APK file name or provide a versioning page where users can choose which version to download.
// 4. Security Considerations:
// Ensure that the distribution process is secure.
// If your app includes sensitive information, implement secure download links or use authentication mechanisms to control access.
// 5. Notify Users:
// Implement a notification system to inform users when a new version is available.
// Include release notes or a changelog to highlight what's new.
// For iOS (iOS Bundle):
// 1. Automate iOS Bundle Generation:
// Set up a CI/CD pipeline to automate the iOS bundle generation process.
// Use Xcode Command Line Tools or other build automation tools to create and sign the iOS bundle.
// 2. Distribute iOS Bundle Download Links:
// Similar to Android, provide users with a download link for the iOS bundle.
// Host the iOS bundle on a server or use a service like Apple's TestFlight for beta testing and distribution.
// 3. iOS Distribution Options:
// Consider using TestFlight for beta testing and distributing pre-release versions to a limited audience.
// For App Store distribution, the App Store Connect submission process is typically manual and requires human approval.
// 4. Security Considerations:
// Ensure that the distribution process is secure.
// If necessary, implement secure download links or use authentication mechanisms.
// 5. Notify Users:
// Implement a notification system for iOS users when a new version is available.
// Provide release notes or a changelog.
// General Considerations:
// 1. User Experience:
// Ensure a seamless user experience with clear instructions on how to download and install the app.
// Consider providing step-by-step guides or an FAQ section.
// 2. Feedback Mechanism:
// Implement a mechanism for users to provide feedback on the download and installation process.
// Address any issues promptly to enhance user satisfaction.
// 3. Compliance:
// Ensure that your distribution process complies with the terms of service of the app stores and platforms.
// By automating the distribution process and providing users with download links, you can streamline the app installation experience for both Android and iOS users. Tailor the process based on your specific use case and user requirements.