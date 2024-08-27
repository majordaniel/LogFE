import "./styles.scss";

// eslint-disable-next-line no-unused-vars
import { Pagination, Switch, Table } from "antd";
import { getUser, hideLoading, setAppState, showLoading, } from "../../../utils/Constants";
import { useEffect, useState } from "react";

import { AppService } from "../../../services";
import GeneralButton from "../../../components/generalButton/AcceptButton";
import Moment from "react-moment";
import { UserUpdateModal } from "../../../components/common";
import { catchAuthError } from "../../../utils";

const columns = [
    {
        title: "FULL NAME",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "PHONE",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "EMAIL",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "ROLE",
        dataIndex: "role",
        key: "role",
    },
    // {
    //     title: "ONLINE/OFFLINE",
    //     dataIndex: "toggle",
    //     key: "toggle",
    // },
    {
        title: "PROFILE",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100,
    },
];

const Admins = () => {
    // state for current page
    let [currentPage, setCurrentPage] = useState(1);
    // state for selected rows
    const [selectedRows, setSelectedRows] = useState([]);
    // state for customers data
    const [admins, setAdmins] = useState([]);
    const [pagesCount, setPagesCount] = useState(1);

    const fetchData = () => {
        showLoading();

        AppService.listAdmins(currentPage)
            .then(({ data }) => {
                setAdmins(data.data.users);
                setPagesCount(data.data.total);
            })
            .catch(catchAuthError)
            .finally(hideLoading);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [currentPage]);

    return (
        <div className="customers">
            <div className="table-pages-header large">
                <div className="search-bar">
                    <i className="fa fa-search" />
                    <input type="text" placeholder="Search Admin" />
                </div>
                <div className="delete-btn">
                    {selectedRows.length >= 1 ? (
                        <GeneralButton buttonText="Delete" />
                    ) : null}
                </div>
            </div>

            <div className="table-pages-header mobile">
                {selectedRows.length >= 1 ? (
                    ""
                ) : (
                    <div className="search-bar">
                        <i className="fa fa-search" />
                        <input type="text" placeholder="Search Logistics" />
                    </div>
                )}

                <div className="delete-btn">
                    {selectedRows.length >= 1 ? (
                        <GeneralButton buttonText="Delete" />
                    ) : (
                        ""
                    )}
                </div>
            </div>

            <div className="customers-table">
                <Table
                    columns={columns}
                    pagination={false}
                    className="table"
                    rowSelection={{ type: "checkbox", onChange: setSelectedRows }}
                    scroll={{ x: "1200px", y: "calc(100vh - 300px)" }}
                    dataSource={admins?.map((admin) => {
                        return {
                            key: admin.id,
                            id: (
                                <button
                                    onClick={() =>
                                        setAppState({
                                            selectedCustomer: admin,
                                            openCustomerProfile: true,
                                        })
                                    }
                                    className="customers-username text-capitalize"
                                >
                                    {admin.full_name}
                                </button>
                            ),
                            phone: admin.phone,
                            email: admin.email,
                            role: (
                                <span
                                    className={`badge text-capitalize ${admin.isActive ? "bg-success" : "bg-danger"
                                        }`}
                                >
                                    {admin?.Role?.name?.replace('_', ' ')}
                                </span>
                            ),
                            // toggle: (
                            //     <Switch
                            //         onChange={(isOnline) =>
                            //             AppService.updateAdmin(admin.id, { isOnline })
                            //                 .then()
                            //                 .catch(catchAuthError)
                            //         }
                            //         defaultChecked={admin.isOnline}
                            //         size={"small"}
                            //     />
                            // ),
                            status: (
                                <div>
                                    <p className="m-0 fs-12">
                                        Created At{" "}
                                        <Moment
                                            format="DD-MM-YYYY @ hh:mm"
                                            date={new Date(admin.createdAt)}
                                        />
                                    </p>
                                    <span
                                        className={`badge ${admin.isVerified ? "bg-success" : "bg-danger"
                                            }`}
                                    >
                                        {admin.isVerified ? "Verified" : "Not Verified"}
                                    </span>
                                    <span
                                        hidden={['admin', 'company_admin'].includes(admin?.Role?.name)}
                                         className={`badge ${admin.isOnline ? "bg-success" : "bg-danger"
                                            }`}
                                    >
                                        {admin.isOnline ? "Online" : "Offline"}
                                    </span>
                                    <span
                                        className={`badge ${admin.isActive ? "bg-success" : "bg-danger"
                                            }`}
                                    >
                                        {admin.isActive ? "Active" : "Not Active"}
                                    </span>
                                </div>
                            ),
                            action: (
                                <div className="more">
                                    <span className="material-icons more-icon">more_horiz</span>
                                    <ul className="dropdown">
                                        <li
                                            className="option "
                                            onClick={() => setAppState({
                                                openEditAdmin: true, selectedAdmin: admin, editMode: true
                                            })}
                                        >Edit
                                        </li>

                                        <li
                                            hidden={[getUser().id, getUser().company_id].includes(admin.id)}
                                            onClick={() => AppService.deleteAdmin(admin.id).then(fetchData)}
                                            className="option text-danger"
                                        >
                                            <span className="text-danger">Delete</span>
                                        </li>
                                    </ul>
                                </div>
                            ),
                        };
                    })}
                />
                {pagesCount && (
                    <Pagination
                        defaultCurrent={1}
                        total={pagesCount}
                        onChange={setCurrentPage}
                        style={{ textAlign: "right", marginTop: "20px" }}
                    />
                )}
            </div>
            <UserUpdateModal />
        </div>
    );
};

export default Admins;
