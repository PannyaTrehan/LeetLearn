import { GoogleLogin, CredentialResponse, useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

function Login() {

    return (
        <GoogleLogin
            onSuccess={(credentialResponse: CredentialResponse) => {
                if (credentialResponse.credential) {
                    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                    console.log(credentialResponseDecoded);
                } else {
                    console.error('Credential is undefined');
                }
            }}
            onError={() => {
                console.log('Login Failed');
            }}
        />
    );
}

export default Login;