export function loadScriptGoogleSignin(): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    try {
      const existingScript = document.getElementById('google-signin');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.id = 'google-signin';
        document.body.appendChild(script);
        script.onload = () => {
          setTimeout(() => {
            resolve(true);
          }, 1000);
        };
      }
      if (existingScript) {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      }
    } catch (e) {
      reject(false);
    }
  });
}
