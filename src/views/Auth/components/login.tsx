import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import IdentityManager from "@arcgis/core/identity/IdentityManager"
import Credential from "@arcgis/core/identity/Credential"
import OAuthInfo from "@arcgis/core/identity/OAuthInfo"
import Portal from "@arcgis/core/portal/Portal"


const Login = () => {
    const history = useHistory();
    const { tryToSignIn } = useContext(AuthContext);

    const redirectToTargetPage = () => {
        return history.push("/dashboard");
    }

    // const updateAuth = (cred: Credential) => {
    //     if(user !== null) {
    //         return;
    //     }
    //     var portal = new Portal();
    //     portal.authMode = "immediate";
    //     portal.load().then(() => {
    //         //setLoadingAuthState(true); //todo maybe add portal
    //         setUser(portal.user.username);
    //     })

    // }



    return (
    <div>
        <h1>Wildlife Movement Modeling</h1>
        <button onClick={tryToSignIn}>Click to Sign in with ArcGIS</button>
    </div>
    );
}

export default Login;