import React from 'react';
import { useHistory } from 'react-router-dom';
import firebase from '../../../firebase';
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import TileLayer from '@arcgis/core/layers/TileLayer';
import { LarmSidebar, LarmHeader } from '../../../shared/layouts';
import { OptionView } from '../../../shared/components';
import { Grid } from 'semantic-ui-react';

import 'firebase/firestore';

const Dashboard = () => {
    const arcViewRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (arcViewRef.current) {
            const map = new Map({
                basemap: 'topo-vector',
            });

            const view = new MapView({
                container: arcViewRef.current,
                map: map,
                zoom: 14,
                center: [-80.58, 43.48],
            });

            const larm = new TileLayer({
                url: 'https://tiles.arcgis.com/tiles/wlGPBvwc5LdaCZBr/arcgis/rest/services/ArcOnline_jan1/MapServer',
            });
            map.add(larm);

            const larmCosts = new TileLayer({
                url: 'https://tiles.arcgis.com/tiles/wlGPBvwc5LdaCZBr/arcgis/rest/services/CM1_Gnarly_costs/MapServer',
            });
            map.add(larmCosts);
        }
    });

    return (
        <div style={{ textAlign: 'center' }}>
            <LarmHeader></LarmHeader>
            <LarmSidebar>
                <Grid columns={2}>
                    <Grid.Column width={2} textAlign={'right'}>
                        <OptionView></OptionView>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <div ref={arcViewRef} className="arcViewDiv" style={{ width: '100vw', height: '100vh' }}></div>
                    </Grid.Column>
                </Grid>
            </LarmSidebar>
        </div>
    );
};

export default Dashboard;
