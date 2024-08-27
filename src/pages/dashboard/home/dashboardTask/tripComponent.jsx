import "./styles.scss";
import TripCard from "../../../../components/taskCard/tripCard";
import {AppContext} from "../../../../context/AppContext";
import {useContext} from "react";
import {AppService, CompanyAuthService} from "../../../../services";
import {USER_TYPE_HASH} from "../../../../utils/Constants";

const TripComponent = ({ data }) => {
  const { trips } = useContext(AppContext);
  return (
    <div className="unassigned-task">
      {!trips?.length && (
        <div className="w-100 justified flex-column aligned h-100">
          <img
            src="/image/empty.png"
            className="mx-auto"
            alt="Empty List"
            width={"60%"}
          />
          <p className="text-center my-3">NO TRIP DATA FOUND</p>
          <button
            className="btn px-2 py-1 btn-primary btn-round btn-success"
            onClick={() => {
              if (localStorage.getItem(USER_TYPE_HASH) === "company") {
                CompanyAuthService.fetchAllCompanyData();
              } else {
                AppService.fetchAllData();
              }
            }}
          >
            Reload
          </button>
        </div>
      )}
      {trips?.map((task) => (
        <TripCard key={task.id} task={task} />
      ))}
    </div>
  );
};
export default TripComponent;
