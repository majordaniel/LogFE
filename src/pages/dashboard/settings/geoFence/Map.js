/* global google */
import React from 'react';
import {GoogleMap, Marker, Polygon, withGoogleMap, withScriptjs,} from 'react-google-maps';

import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";


const processCoords = (string = '') => {
    const array = string.split(', ');
    const coords = [];
    array.forEach(loc => {
        const pos = loc.split(' ');
        coords.push({lat: Number(pos[0]), lng: Number(pos[1])})
    });
    return coords;
}


export default withScriptjs(withGoogleMap(({drawable, data, ...props}) => (
    <GoogleMap defaultZoom={8} center={props.center}>
        {drawable && <DrawingManager
            defaultDrawingMode={google.maps.drawing.OverlayType.POLYGON}
            defaultOptions={{
                // drawingControl: true,
                drawingControlOptions: {
                    position: google.maps.ControlPosition.TOP_CENTER,
                    drawingModes: [google.maps.drawing.OverlayType.POLYGON],
                },
            }}
            onPolygonComplete={props.doneDrawing}
        />}
        {
            data?.map(({data: coords}) => {
                const color = Math.floor(Math.random() * 16777215).toString(16);
                return <Polygon
                    path={processCoords(coords)}
                    key={color}
                    options={{
                        fillColor: "#" + color,
                        fillOpacity: 0.4,
                        strokeColor: "#" + color,
                        strokeOpacity: 1,
                        strokeWeight: 1
                    }}
                    onClick={() => {
                        // console.log("ahmet")
                    }}
                />
            })
        }

        {props.center.lat && props.center.lng && (<Marker position={props.center}/>)}
    </GoogleMap>
)));
