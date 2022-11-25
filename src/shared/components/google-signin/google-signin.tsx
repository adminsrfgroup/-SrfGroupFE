import React, {LegacyRef} from "react";
import { AllAppConfig } from "../../../core/config/all-config";
import {loadScriptGoogleSignin} from "../../providers/google-signin";


export class GoogleSignin extends React.Component<any, any> {
    private googleSignInButton: any;



    constructor(props: any) {
        super(props);
        this.googleSignInButton = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (value: any){
        google.accounts.id.cancel();
        this.props.handleCredentialResponse(value);
    }

    componentDidMount(){
        loadScriptGoogleSignin()
            .then(() => {
                google.accounts.id.initialize({
                    client_id: AllAppConfig.CLIENT_ID_GOOGLLE,
                    callback: this.handleClick,
                    cancel_on_tap_outside: false
                });

                if( !this.props.isOneTap ){
                    google.accounts.id.renderButton(
                        this.googleSignInButton.current,
                        { size: "large", type:"icon", shape:"circle" }  // customization attributes
                    );
                }
                else{
                    // console.log('oneTap');
                    google.accounts.id.prompt();
                }
            });
    }

    render() {
        return (
            <div>
                <div ref={this.googleSignInButton} className={!this.props.isOneTap ? 'customGPlusSignIn' : ''}></div>
            </div>
        );
    }
}
