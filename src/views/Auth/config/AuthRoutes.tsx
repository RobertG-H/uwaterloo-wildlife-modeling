import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {Login} from "../../Auth/components";
import { AuthContext } from "../../../AuthProvider";


export const AuthRoutes = () => {
    const {loadingAuthState, authenticated} = useContext(AuthContext);

    if (loadingAuthState) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }

    if (authenticated) {
        return (<Redirect to="/dashboard" from="/auth" />);
    }

    return (
        <Switch>
            <Route path="/auth/login" component={Login} />
            <Redirect to="/auth/login" from="/auth" />
        </Switch>
    );
};