import {AppContext} from "../../context/AppContext";
import {setAppState} from "../../utils/Constants";
import Form from "../customerForm/customerForm";
import {Component, useContext, useEffect, useState} from "react";
import AuthenticationHandler from "../../utils/AuthenticationHandler";
import {Redirect} from "react-router-dom";

export const UserUpdateModal = () => {
    const {customer, openCustomerModal} = useContext(AppContext);
    const [animation, setAnimation] = useState(true);
    const onClose = () => {
        setAnimation(false);
        setTimeout(
            () => setAppState({openCustomerModal: false, selectedCustomer: {}}),
            600
        );
    };

    useEffect(() => {
        if (openCustomerModal) {
            setTimeout(() => setAnimation(true), 500);
        }
    }, [openCustomerModal]);

    if (openCustomerModal) {
        return (
            <div className="modal-wrapper">
                <div className="backdrop"/>
                <div className={`modal ${animation ? "fade-in" : "fade-out"}`}>
                    <Form customer={customer} cancelBtn={onClose}/>
                </div>
            </div>
        );
    }
    return null;
};

export class Logout extends Component<{}> {
    componentDidMount() {
        AuthenticationHandler.logout();
    }

    render() {
        return <Redirect to="/"/>;
    }
}

export const _404 = () => (
    <div>
        <div style={{paddingTop: 120, paddingBottom: 180, textAlign: "center"}}>
            <img src="/image/404.png" alt="404" className="mx-auto col-10 col-sm-7"/>
            <h2 style={{textTransform: "uppercase"}}>PAGE NOT FOUND</h2>
        </div>
    </div>
);

export const AnalyticsCard = ({title, value}) => (
    <div className="col-sm-3 mb-3 ms-3 card p-3 shadow-sm">
        <h6>{title}</h6>
        <p className="m-0 fs-14">{value}</p>
    </div>
);

export const LineDetail = ({value, title}) => (
    <li>
        <label className="label">{title}</label>
        <div className="label-details">{value || "Not Available"}</div>
    </li>
);

export function CompanyList({showMore}) {
    const {companies} = useContext(AppContext);
    return (
        <div className="w-100 h-100 flex-fill">
            {!companies?.length && (
                <div
                    className="w-100 justified flex-column aligned h-100"
                    style={{paddingTop: "40%"}}
                >
                    <img
                        src="/image/company.png"
                        alt="Empty List"
                        className="mx-auto"
                        width={"60%"}
                    />
                    <p className="text-center mt-3">NO DATA FOUND</p>
                </div>
            )}
            {companies?.map((agent, idx) => (
                <div
                    key={idx}
                    className="single-agent-detail shadow-lg"
                    onClick={() =>
                        setAppState({
                            selectedCompany: agent,
                            openCompanyProfile: true,
                        })
                    }
                >
                    <div className="agent-image">
                        <img src={agent?.imagUrl || "/image/company.png"} alt=""/>
                        <div className={`status-dot ${agent.status}`}/>
                    </div>
                    <div className="agent-details">
                        <p className="agent-name">{agent.name}</p>
                        <p className="agent-number">{agent.phone}</p>
                        <p className="agent-number">{agent.address}</p>
                    </div>

                    <div className="message-agent"></div>
                    <div></div>
                    <span className="material-icons show-more-icon">
            keyboard_arrow_right
          </span>
                </div>
            ))}
        </div>
    );
}

export const UserCard = ({user}) => {
    return (
        <div
            className="single-agent-detail shadow-lg"
            onClick={() =>
                setAppState({
                    selectedCustomer: user,
                    openCustomerProfile: true,
                })
            }
        >
            <div className="agent-image">
                <img src={user?.imagUrl || "/image/default-user.png"} alt=""/>
                <div className={`status-dot ${user.status}`}/>
            </div>
            <div className="agent-details">
                <p className="agent-name text-capitalize">{user.full_name}</p>
                <p className="agent-number">{user.email}</p>
                <p className="agent-number">{user.phone}</p>
                <p className="agent-number">
          <span
              className={`badge ${user.isVerified ? "bg-success" : "bg-danger"}`}
          >
            {user.isVerified ? "Verified" : "Not Verified"}
          </span>
                    <span
                        className={`badge ${user.isOnline ? "bg-success" : "bg-danger"}`}
                    >
            {user.isOnline ? "Online" : "Offline"}
          </span>
                    <span
                        className={`badge ${user.isActive ? "bg-success" : "bg-danger"}`}
                    >
            {user.isActive ? "Active" : "Not Active"}
          </span>
                </p>
            </div>
            <div className="message-agent"></div>
            <div></div>
            <span className="material-icons show-more-icon">
        keyboard_arrow_right
      </span>
        </div>
    );
};

export const UserList = ({data}) => (
    <div className="w-100 h-100 flex-fill">
        {!data?.length && (
            <div
                className="w-100 justified flex-column aligned h-100"
                style={{paddingTop: "40%"}}
            >
                <img
                    src="/image/empty.png"
                    className="mx-auto"
                    alt="Empty List"
                    width={"60%"}
                />
                <p className="text-center mt-3">NO DATA FOUND</p>
            </div>
        )}
        {data?.map((user) => (
            <UserCard user={user}/>
        ))}
    </div>
);
