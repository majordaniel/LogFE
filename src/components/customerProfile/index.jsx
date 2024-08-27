import "./styles.scss";
import {Drawer} from "antd";
import CloseButton from "../closeBotton/closeBotton";
import {useContext, useEffect, useState} from "react";
import {AppContext, DEFAULT_STATE} from "../../context/AppContext";
import {setAppState, USER_TYPE_HASH} from "../../utils/Constants";
import Moment from "react-moment";
import {LineDetail} from "../common";
import Loading from "../loading/loading";
import TabsComponent from "../Tabs/tabs";
import {AppService} from "../../services";
import {catchAuthError} from "../../utils";
import TripCard from "../taskCard/tripCard";
// import {CgSpinnerTwo} from "react-icons/all";
import {CgSpinnerTwo} from "react-icons/cg";

const CustomerProfile = () => {
    const {openCustomerProfile, selectedCustomer} = useContext(AppContext);
    const [trips, setTrips] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState(1);
    const [isLoading, setLoading] = useState(false);
    const onClose = () =>
        setAppState({
            openCustomerProfile: false,
            selectedCustomer: DEFAULT_STATE.selectedCustomer, editMode: false,
        });
    let isUser = false, isRider = false;
    if (selectedCustomer?.Role) {
        const role = selectedCustomer?.Role?.name?.toLowerCase() || ''
        isUser = role === "user";
        isRider = role === "rider";
    }

    const fetchRiders = () => {
        if (selectedCustomer.id) {
            setLoading(true);
            AppService.listUserTrips(selectedCustomer.id)
                .then(({data}) => setTrips(data.data.trips))
                .catch(catchAuthError)

            AppService.singleUser(selectedCustomer.id)
                .then(({data: {data}}) => setAppState({selectedCustomer: data}))
                .catch(catchAuthError)
                .finally(() => setLoading(false));
        }
    };

    const deleteUser = () => {
        if (selectedCustomer.id) {
            setAppState({isLoading: true});
            AppService.deleteUser(selectedCustomer.id)
                .then(({data}) => {
                    window.location.reload()
                })
                .catch(catchAuthError)
                .finally(() => setAppState({isLoading: false}));
        }
    };

    useEffect(() => {
        fetchRiders();
        // eslint-disable-next-line
    }, [openCustomerProfile]);
    const dashboardMobile = [
        {
            tabName: "DETAILS",
            tabContent: (
                <div className="details-list">
                    {isLoading && <div className=" mx-auto py-5">
                        <CgSpinnerTwo/>
                    </div>}
                    <h4 hidden={isLoading} className="sub-heading">
                        {isUser ? "Customer" : isRider ? "Rider" : "Admin"} Details
                    </h4>
                    <ul>
                        <LineDetail value={selectedCustomer.full_name} title={"Name"}/>
                        <LineDetail value={selectedCustomer.phone} title={"Contact"}/>
                        <LineDetail value={selectedCustomer.email} title={"Email"}/>
                        <LineDetail title={"Number of Trips"}/>
                        <LineDetail
                            title={"Date Joined"}
                            value={<Moment fromNow>{selectedCustomer.createdAt}</Moment>}
                        />
                        {isUser && (
                            <>
                                <LineDetail
                                    title={"Referral"}
                                    value={selectedCustomer.referral}
                                />
                                <LineDetail
                                    title={"Status"}
                                    value={
                                        <div>
                      <span
                          className={`badge ${
                              selectedCustomer.isVerified
                                  ? "bg-success"
                                  : "bg-danger"
                          }`}
                      >
                        {selectedCustomer.isVerified
                            ? "Verified"
                            : "Not Verified"}
                      </span>
                                            <span
                                                className={`badge ${
                                                    selectedCustomer.isOnline ? "bg-success" : "bg-danger"
                                                }`}
                                            >
                        {selectedCustomer.isOnline ? "Online" : "Offline"}
                      </span>
                                            <span
                                                className={`badge ${
                                                    selectedCustomer.isActive ? "bg-success" : "bg-danger"
                                                }`}
                                            >
                        {selectedCustomer.isActive ? "Active" : "Not Active"}
                      </span>
                                        </div>
                                    }
                                />
                            </>
                        )}
                    </ul>
                    <div className="action-button">
                        <button

                            hidden={!isUser && localStorage.getItem(USER_TYPE_HASH) !== 'company'}
                            onClick={() => {
                                if (isRider) return setAppState({
                                    openEditCompany: true,
                                    selectedRider: selectedCustomer,
                                    editMode: true
                                })
                                setAppState({
                                    openEditAdmin: true,
                                    selectedAdmin: selectedCustomer,
                                    editMode: true
                                })

                            }} className="edit">Edit
                        </button>
                        <button className="delete" onClick={() => deleteUser()}>
                            Delete
                        </button>
                    </div>
                </div>
            ),
            tabValue: null,
            tabIndex: 1,
        },
        {
            tabName: "TRIPS",
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
                            <Loading/>
                        </div>
                    ) : (
                        <div className="w-100 ">
                            {!trips?.length && (
                                <div
                                    className="w-100 justified flex-column aligned h-100"
                                    style={{paddingTop: 40}}
                                >
                                    <img
                                        src={"/image/empty.png"}
                                        alt="Empty List"
                                        className="mx-auto"
                                        width={200}
                                    />
                                    <p className="text-center mt-3">NO DATA FOUND</p>
                                </div>
                            )}
                            {trips?.map((task) => (
                                <TripCard key={task.id} task={task}/>
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
        <Drawer
            headerStyle={{display: "none"}}
            placement="right"
            closable={true}
            onClose={onClose}
            maskClosable={true}
            visible={openCustomerProfile}
            width={370}
            className="half-drawer customer-details z-index-1099"
        >
            {Number(activeTabKey) === 1 ? (
                <div className={`header-avatar ${!isUser && "bg-pink"}`}>
                    <img
                        src={selectedCustomer?.imageUrl || "/image/default-user.png"}
                        alt=""
                    />
                    <span className="username text-capitalize">
            {selectedCustomer?.full_name}
          </span>
                    <div className="close-btn" onClick={onClose}>
                        <CloseButton/>
                    </div>
                </div>
            ) : (
                <div className="search-box">
                    <i className="fa fa-search icon"/>
                    <input type="text" placeholder="Search by trip address"/>
                </div>
            )}
            <TabsComponent
                tabItems={dashboardMobile}
                activeTabKey={"1"}
                onChange={setActiveTabKey}
            />
        </Drawer>
    );
};

export default CustomerProfile;
