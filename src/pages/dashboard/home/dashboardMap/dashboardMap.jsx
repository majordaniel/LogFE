import "./styles.scss";
import React, {useContext, useEffect, useState} from "react";
import GoogleMapReact from "google-map-react";
import {AppContext} from "../../../../context/AppContext";
import {setAppState} from "../../../../utils/Constants";
// import {GoPin} from "react-icons/all";
import { GoPin } from 'react-icons/go';


let directionsService;
let directionsRenderer;
const Map = () => {
    const {trips} = useContext(AppContext);
    const [map, setMap] = useState();
    const [maps, setMaps] = useState();
    const lat = 6.5095;
    const lng = 3.3711;

    useEffect(() => {
        if (maps) {
            directionsService = new maps.DirectionsService();
            directionsRenderer = new maps.DirectionsRenderer();
        }
        // eslint-disable-next-line
    }, [maps])

    const drawDirection = (trip) => {
        directionsRenderer.setMap(null);
        const request = {
            origin: new maps.LatLng(trip?.origin.latitude, trip?.origin?.longitude),
            destination: new maps.LatLng(trip?.destination.latitude, trip?.destination?.longitude),
            travelMode: 'DRIVING'
        };
        directionsService.route(request, function (result, status) {
            if (status === 'OK') {
                directionsRenderer.setMap(map);
                directionsRenderer.setDirections(result);
            } else {
                alert("Could not find direction from " + trip?.origin?.address + " to " + trip?.destination?.address)
            }
        });
    }


    return (
        <div className="dashboard-map">
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyDdHMB87WgSAdWlbEiORryX6ttcBiIwJC8",
                    language: "en",
                }}
                defaultCenter={{lat, lng}}
                center={[lat, lng]}
                defaultZoom={15}
                onGoogleApiLoaded={({map, maps}) => {
                    setMap(map);
                    setMaps(maps)
                }}
                yesIWantToUseGoogleMapApiInternals
            >
                {trips?.map(({id, ...data}) => {
                        const { origin,} = data
                        return (
                            <CustomMarker
                                key={'origin' + id}
                                position={{lat: Number(origin?.latitude), lng: Number(origin?.longitude)}}
                                lat={Number(origin?.latitude)}
                                drawDirection={() => drawDirection(data)}
                                lng={Number(origin?.longitude)}
                                text={origin?.address} data={data}
                            />
                        );
                    }
                )}

                {trips?.map(({id, ...data}) => {
                        const {destination,} = data
                        return (
                            <CustomMarker
                                key={'destination' + id}
                                position={{lat: Number(destination?.latitude), lng: Number(destination?.longitude)}}
                                lat={Number(destination?.latitude)}
                                lng={Number(destination?.longitude)}
                                drawDirection={() => drawDirection(data)}
                                text={destination?.address} data={data}
                            />
                        );
                    }
                )}
            </GoogleMapReact>
        </div>
    );
};

const CustomMarker = ({data, text, drawDirection}) => <div
    className="card pin-view"
    onClick={drawDirection}
>
    <GoPin className="me-1"/>
    <div>
        <div>{text}</div>
        <div className="mt-2 spaced ">
            <span style={{color: 'lightgray',}}>Click to direction</span>
            <span className="text-success  cursor-pointer"
                  onClick={() => setAppState({showTripInformation: true, tripInformation: data,})}>Open</span>
        </div>
    </div>

</div>;


export default Map;
