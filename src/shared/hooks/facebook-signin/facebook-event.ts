import { useCallback } from "react";

export const facebookEvent = () => {

    const logoutFB = useCallback(() => {
        FB.logout((response: any) => {
            console.log('FB logout');
        });
    }, [])

    const loginFB = useCallback(() => {
        FB.login(
             (response: any) => {
                if (response.status === "connected") {
                    console.log('response ', response);
                    FB.api('/me', {fields: "id,name,email,picture"}, (responseMe: any) => {
                        console.log('Good to see you, ', responseMe);
                    });
                } else {
                    console.error('Error FB')
                }
            },
            { scope: "public_profile, email" }
        );
    }, [])

    return {
        loginFB,
        logoutFB
    } as const;
}
