import "./styles.scss";

import PaneHeader from "../../../../components/PaneHeader/PaneHeader";
import TripComponent from "./tripComponent";
import SingleTripDetails from "../../../../components/singleTripDetails/singleTripDetails";
import {AppContext} from "../../../../context/AppContext";
import {useContext} from "react";
import TripLocationMap from "../../../../components/singleTripLocationMap/singleTripLocationMap";

const DashboardTask = () => {
  const { showTripInformation, showMapLocation } = useContext(AppContext);

  return (
    <div className="dashboard-task">
      <PaneHeader tabName="Requests" />
      <TripComponent />
      {showTripInformation && <SingleTripDetails />}
      {showMapLocation && <TripLocationMap />}
    </div>
  );
};

export default DashboardTask;
