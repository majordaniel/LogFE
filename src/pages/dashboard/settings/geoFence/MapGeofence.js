/* global google */
import React, {Component} from 'react';
import Map from './Map';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?libraries=geometry,drawing&key=AIzaSyDdHMB87WgSAdWlbEiORryX6ttcBiIwJC8`;

let map;
let bounds;
// eslint-disable-next-line
let sub_area;
let coordinates = [];
let color = ['#FF0000', '#4286f4', '#ffff00', '#ff00b2', '#bb00ff', '#00ffff', '#26ff00', '#00ff87'];

// eslint-disable-next-line
function _handleSearch(query) {
    if (!query) {
        return;
    }
    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
        fetch(`https://nominatim.openstreetmap.org/search.php?q=${query}&polygon_geojson=1&format=json`)
            .then(resp => resp.json())
            .then(data => {
                let filterGeoJsonType = data.filter(function (data) {
                    return data.geojson.type === "MultiPolygon" || data.geojson.type === "Polygon"
                });
                this.setState({options: filterGeoJsonType});
            });
    }, 1000)
}

// eslint-disable-next-line
function renderCoordinate(paths) {
    coordinates = [];
    let position = 0;
    paths?.map((location) => {
        if (position % 10 === 0) {
            coordinates.push({"lat": location[1], "lng": location[0]});
            bounds.extend({"lat": location[1], "lng": location[0]});
        }
        position++
        return true;
    });
}

// eslint-disable-next-line
function renderToMaps(selectedOptions) {
    selectedOptions.forEach((option) => {

        if (option.geojson.type === "MultiPolygon") {
            this.renderCoordinate(option.geojson.coordinates[0][0]);
        } else if (option.geojson.type === "Polygon") {
            this.renderCoordinate(option.geojson.coordinates[0]);
        } else {
            alert('option.geojson.type: MultiPolygon & Polygon');
        }

        if (coordinates.length > 1) {
            let sub_area = new window.google.maps.Polygon({
                paths: coordinates,
                strokeColor: color[1],
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: color[1],
                fillOpacity: 0.35,
                editable: true
            });

            sub_area.setMap(map);
            map.setOptions({maxZoom: 15});
            map.fitBounds(bounds);

            coordinates = [];
        }
    })
}


class MapGeofence extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bounds: [],
            center: {lat: 24.7136, lng: 46.6753},
            content: 'Getting position...',
            insideFence: false,
            previousPolygon: null,
            fence: null,
            watchID: null,
            lastFetched: null,
        };
    }

    componentDidMount() {
        // this.watchLocation();
    }

    componentWillUnmount() {
        // this.unwatchLocation();
    }

    watchLocation() {
        if ('geolocation' in navigator) {
            const geoOptions = {enableHighAccuracy: true, maximumAge: 30000, timeout: 27000};
            navigator.geolocation.watchPosition(this.getLocation, null, geoOptions);
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    unwatchLocation() {
        if ('geolocation' in navigator && this.state.watchID) {
            navigator.geolocation.clearWatch(this.state.watchID);
        }
    }

    getLocation = (position) => {
        this.setState({
            center: {lat: position.coords.latitude, lng: position.coords.longitude,},
            content: `Loc   ation found.`,
            lastFetched: position.timestamp,
        });

    }
    clearPolygon = () => {
        if (this.state.previousPolygon) {
            this.state.previousPolygon.setMap(null);
        }
    }
    doneDrawing = (polygon) => {
        let polygonBounds = polygon.getPath();
        let bounds = [];
        let regions = "";
        for (var i = 0; i < polygonBounds.length; i++) {
            let point = {
                lat: polygonBounds.getAt(i).lat(),
                lng: polygonBounds.getAt(i).lng()
            };
            bounds.push(point);
            regions += polygonBounds.getAt(i).lat() + " " + polygonBounds.getAt(i).lng() +
                (i === (polygonBounds.length -1) ? '' : ", ");
        }
        this.props.onChange(regions);
        this.clearPolygon()
        this.setState({previousPolygon: polygon, bounds});
        this.setState({fence: new google.maps.Polygon({paths: polygon.getPaths()})});
    }

    getCurrentPosition() {
        return new google.maps.LatLng(this.state.center.lat, this.state.center.lng);
    }

    render() {
        const {drawable, isFencing} = this.props
        return (
            <div style={{position: 'relative'}}>
                <Map
                    googleMapURL={googleMapURL}
                    loadingElement={<p>Loading maps...</p>}
                    containerElement={<div className="map-container"/>}
                    mapElement={<div className="map"/>}
                    center={this.state.center}
                    data={this.props.data}
                    content={this.state.content}
                    doneDrawing={this.doneDrawing}
                    drawable={drawable && isFencing}
                />
                {(drawable) &&
                <div className="map-control">
                    {this.state.previousPolygon &&
                    <span onClick={() => this.clearPolygon()} className="clickable">Clear</span>}
                    {!isFencing && <input className="map-input"/>}
                </div>
                }
            </div>
        );
    }

}

export default MapGeofence;
