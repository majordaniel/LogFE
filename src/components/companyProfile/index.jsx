import "./styles.scss";
import {Drawer} from "antd";
import React, {useContext, useEffect, useState} from "react";
import CloseButton from "../closeBotton/closeBotton";
import {setAppState} from "../../utils/Constants";
import {AppContext, DEFAULT_STATE} from "../../context/AppContext";
import {AppService} from "../../services";
import {catchAuthError, showSuccess} from "../../utils";
import Loading from "../loading/loading";
import {LineDetail, UserCard} from "../common";
import Moment from "react-moment";
import TabsComponent from "../Tabs/tabs";

const CompanyProfile = () => {
  const { openCompanyProfile, selectedCompany } = useContext(AppContext);
  // console.log(selectedCompany);
  const [riders, setRiders] = useState([]);
  const [activeKey, setActiveKey] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const onClose = () =>
    setAppState({
      openCompanyProfile: false, editMode: false,
      selectedCompany: DEFAULT_STATE.selectedCompany,
    });
  const fetchRiders = () => {
    if (selectedCompany.id) {
      setLoading(true);
      AppService.listCompanyRiders(selectedCompany.id)
        .then(({ data }) => {
          setRiders(data.data.riders);
        })
        .catch(catchAuthError)
        .finally(() => setLoading(false));
    }
  };

  const deleteComapany = () => {
    if (selectedCompany.id) {
      setAppState({ isLoading: true });
      AppService.deleteCompany(selectedCompany.id)
        .then(({ data }) => {
          console.log(data);
          showSuccess("Successfully deleted");
          onClose();
          AppService.fetchAllData();
        })
        .catch(catchAuthError)
        .finally(() => setAppState({ isLoading: false }));
    }
  };

  useEffect(() => {
    fetchRiders();
    // eslint-disable-next-line
  }, [openCompanyProfile]);

  const dashboardMobile = [
    {
      tabName: "DETAILS",
      tabContent: (
        <div className="details-list">
          <h4 className="sub-heading">{"Company"} Details</h4>
          <ul>
            <LineDetail value={selectedCompany.name} title={"Name"} />
            <LineDetail value={selectedCompany.phone} title={"Contact"} />
            <LineDetail value={selectedCompany.email} title={"Email"} />
            <LineDetail title={"Number of Trips"} />
            <LineDetail
              title={"Date Joined"}
              value={<Moment fromNow>{selectedCompany.createdAt}</Moment>}
            />
          </ul>
          <div className="action-button">
            <button className="delete" onClick={deleteComapany}>
              Delete
            </button>
          </div>
        </div>
      ),
      tabValue: null,
      tabIndex: 1,
    },
    {
      tabName: "RIDERS",
      tabContent: (
        <div className="task-content p-2">
          {isLoading ? (
            <div
              className="centered"
              style={{
                height: "200px",
                position: "relative",
                width: "100%",
              }}
            >
              <Loading />
            </div>
          ) : (
            <div className="w-100 ">
              {!riders?.length && (
                <div
                  className="w-100 justified flex-column aligned h-100"
                  style={{ paddingTop: 40 }}
                >
                  <img
                    src={selectedCompany?.imageUrl || "/image/company.png"}
                    alt="Empty List"
                    className="mx-auto"
                    width={200}
                  />
                  <p className="text-center mt-3">NO DATA FOUND</p>
                </div>
              )}
              {riders?.map((user, idx) => (
                <UserCard user={user} key={idx} />
              ))}
            </div>
          )}
        </div>
      ),
      tabValue: null,
      tabIndex: 2,
    },
  ];
  return (
    <div className="create-task-wrapper">
      <Drawer
        title=""
        placement="left"
        width={370}
        className="half-drawer customer-details"
        bodyStyle={{ backgroundColor: "#f6f6f6", height: "100%" }}
        maskClosable={true}
        closable={false}
        visible={openCompanyProfile}
        onClose={onClose}
        key="right"
      >
        {Number(activeKey) === 1 ? (
          <div
            className={`header-avatar ${
              Number(activeKey) === 1 ? "fade-in" : "fade-out"
            }`}
          >
            <img
              src={selectedCompany?.imageUrl || "/image/company.png"}
              width={"50%"}
              alt=""
            />
            <span className="username text-capitalize">
              {selectedCompany?.name}
            </span>
            <div className="close-btn" onClick={onClose}>
              <CloseButton />
            </div>
          </div>
        ) : (
          <div
            className={`search-box ${
              Number(activeKey) === 1 ? "fade-in" : "fade-out"
            }`}
          >
            <i className="fa fa-search icon" />
            <input type="text" placeholder="Search by Rider Name" />
          </div>
        )}
        <TabsComponent
          tabItems={dashboardMobile}
          activeTabKey={"1"}
          onChange={setActiveKey}
        />
      </Drawer>
    </div>
  );
};

export default CompanyProfile;
