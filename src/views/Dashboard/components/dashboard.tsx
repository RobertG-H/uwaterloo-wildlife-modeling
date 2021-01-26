import { useContext } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../../firebase";
import { AuthContext } from "../../../AuthProvider";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView"

import "firebase/firestore";

const Dashboard = () => {
    const { logout } = useContext(AuthContext);


    const handleClick = (event: any) => {
        event.preventDefault();
        logout();
    }

    const webmap = new WebMap({
        portalItem: { // autocasts as new PortalItem()
          id: "2d3d8f71b9ee47afa34b4ac377b41b19"
    }});

    const view = new MapView({
        map: webmap,
        container: "arcViewDiv"
    });

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Dashboard</h1>
            <h2>Welcome to Dashboard!</h2>
            <button onClick={handleClick}>Logout</button>
            <div className="arcViewDiv" style={{ width: '100vw', height: '100vh' }}>
            </div>
        </div>
    );
}

export default Dashboard;