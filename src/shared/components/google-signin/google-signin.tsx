import React, {LegacyRef} from "react";
import {loadScriptGoogleSignin} from "../../providers/google-signin";


export class GoogleSignin extends React.Component<any, any> {
    private googleSignInButton: any;



    constructor(props: any) {
        super(props);
        this.googleSignInButton = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (value: any){
        this.props.handleCredentialResponse(value);
    }

    componentDidMount(){
        loadScriptGoogleSignin()
            .then(() => {
                google.accounts.id.initialize({
                    client_id: "254542711718-57hnbbbj67l1sbje3pq7cekk4l2jpclf.apps.googleusercontent.com",
                    callback: this.handleClick
                });

                if( !this.props.isOneTap ){
                    google.accounts.id.renderButton(
                        this.googleSignInButton.current,
                        { size: "large", type:"icon", shape:"circle" }  // customization attributes
                    );
                }
                else{
                    google.accounts.id.prompt();
                }
            });
    }

    render() {
        return (
            <div ref={this.googleSignInButton} className="customGPlusSignIn"></div>
        );
    }
}
