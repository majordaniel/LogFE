import {Modal} from "antd";
import "./styles.scss";
import {Component, useContext} from "react";
import GoogleMapReact from "google-map-react";
import {faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import {AppContext} from "../../context/AppContext";
import {setAppState} from "../../utils/Constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const closebtn = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="black"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TripLocationMap = () => {
  const { showMapLocation, map } = useContext(AppContext);

  console.log(map);

  return (
    <Modal
      onCancel={() =>
        setAppState({
          showMapLocation: false,
        })
      }
      footer={false}
      closable={false}
      visible={showMapLocation}
      destroyOnClose={true}
      className="event-map"
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyDdHMB87WgSAdWlbEiORryX6ttcBiIwJC8",
          language: "en",
        }}
        defaultCenter={{
          lat: Number(map.lat) || 0,
          lng: Number(map.lng) || 0,
        }}
        yesIWantToUseGoogleMapApiInternals={true}
        defaultZoom={5}
      >
        <MyMarker lat={map.lat} lng={map.lng} />
      </GoogleMapReact>
      <span
        className="close-btn"
        onClick={() =>
          setAppState({
            showMapLocation: false,
          })
        }
      >
        {closebtn}
      </span>
    </Modal>
  );
};

class MyMarker extends Component {
  state = { clicked: false };

  render() {
    return <FontAwesomeIcon icon={faMapMarkerAlt} className="map-pin" />;
  }
}
export default TripLocationMap;
