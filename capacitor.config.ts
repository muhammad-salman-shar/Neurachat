import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.neurasamu.neurachat',
    appName: 'NeuraChat',
      // Local build ko chhod kar, live Vercel URL wrap kar rahe hain.
        server: {
            url: 'https://neurachat-1gru2vu2g-muhammadsalmansharbaloch-2724s-projects.vercel.app',
                cleartext: true,
                  },
                    // webDir property ko hata diya hai kyunki hum local files use nahi kar rahe.
                    };

                    export default config;
                    