export function loadScriptGoogleSignin(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const existingScript = document.getElementById("google-signin");
            if (!existingScript) {
                const script = document.createElement("script");
                script.src = "https://accounts.google.com/gsi/client";
                script.id = "google-signin";
                document.body.appendChild(script);
                script.onload = () => {
                    resolve(true);
                };
            }
            if (existingScript) resolve(true);
        } catch (e) {
            reject(false);
        }
    });
}
