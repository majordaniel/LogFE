import PaneHeader from "../../../../components/PaneHeader/PaneHeader";
import TabsComponent from "../../../../components/Tabs/tabs";
import "./styles.scss";
import {useContext} from "react";
import {AppContext} from "../../../../context/AppContext";
import {CompanyAuthService} from "../../../../services";
import {UserCard} from "../../../../components/common";

function RidersList() {
  const { riders } = useContext(AppContext);
  return (
    <div className="w-100 h-100 flex-fill">
      {!riders?.length && (
        <div
          className="w-100 justified flex-column aligned h-100"
          style={{ paddingTop: "40%" }}
        >
          <img
            src="/image/riders.png"
            alt="Empty List"
            className="mx-auto"
            width={"60%"}
          />
          <p className="text-center my-3">NO DATA FOUND</p>

          <button
            className="btn px-2 py-1 btn-primary btn-round btn-success"
            onClick={CompanyAuthService.fetchAllCompanyData}
          >
            Reload
          </button>
        </div>
      )}
      {riders?.map((agent, idx) => (
        <UserCard user={agent} key={idx} />
      ))}
    </div>
  );
}

const UserList = ({ data }) => (
  <div className="w-100 h-100 flex-fill">
    {!data?.length && (
      <div
        className="w-100 justified flex-column aligned h-100"
        style={{ paddingTop: "40%" }}
      >
        <img
          src="/image/empty.png"
          className="mx-auto"
          alt="Empty List"
          width={"60%"}
        />
        <p className="text-center my-3">NO DATA FOUND</p>
        <button
          className="btn px-2 py-1 btn-primary btn-round btn-success"
          onClick={CompanyAuthService.fetchAllCompanyData}
        >
          Reload
        </button>
      </div>
    )}
    {data?.map((user, idx) => (
      <UserCard user={user} key={idx} />
    ))}
  </div>
);

const DashboardDelegates = () => {
  const { riders, admins } = useContext(AppContext);
  const dashboardDelegateTabs = [
    {
      tabName: "Riders",
      tabContent: <RidersList />,
      tabValue: riders?.length || 0,
      tabIndex: 1,
    },
    {
      tabName: "Admins",
      tabContent: <UserList data={admins} />,
      tabValue: admins?.length || 0,
      tabIndex: 2,
    },
  ];

  return (
    <div className="dashboard-delegate">
      <PaneHeader
        tabName="Delegates"
        animateSearh={false}
        showSearch={true}
        taskId={""}
      />
      <TabsComponent tabItems={dashboardDelegateTabs} />
    </div>
  );
};

export default DashboardDelegates;
