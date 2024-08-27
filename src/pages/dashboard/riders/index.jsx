import "./styles.scss";

import {Pagination, Table} from "antd";
import {hideLoading, setAppState, showLoading} from "../../../utils/Constants";
import {useEffect, useState} from "react";

import {AppService} from "../../../services";
import GeneralButton from "../../../components/generalButton/AcceptButton";
import {UserUpdateModal} from "../../../components/common";
import {catchAuthError} from "../../../utils";

const columns = [
    {
        title: "FULL NAME",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "PHONE",
        dataIndex: "Phone",
        key: "phone"
    },
    {
        title: "EMAIL",
        dataIndex: "Email",
        key: "email"
    },
    {
        title: "PROFILE STATUS",
        dataIndex: "status",
        key: "status"
    },
    {
        title: "Action",
        dataIndex: "action",
        key: "action",
        width: 100
    }
];


const Riders = () => {
    // state for current page
    let [currentPage, setCurrentPage] = useState(1);
    // state for selected rows
    const [selectedRows, setSelectedRows] = useState([]);
    // state for customers data
    const [customers, setRiders] = useState([]);
    const [pagesCount, setPagesCount] = useState(1);

    const fetchData = () => {
        showLoading()
        AppService.list(currentPage).then(({data}) => {
            setRiders(data.data.users);
            setPagesCount(data.data.total);
        }).catch(catchAuthError).finally(hideLoading);
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [currentPage]);

    return (
        <div className="customers">
            <div className="table-pages-header large">
                <div className="search-bar">
                    <i className="fa fa-search"/>
                    <input type="text" placeholder="Search Riders"/>
                </div>
                <div className="delete-btn">
                    {selectedRows.length >= 1 ? <GeneralButton buttonText="Delete"/> : null}
                </div>
            </div>

            <div className="table-pages-header mobile">
                {selectedRows.length >= 1 ? (
                    ""
                ) : (
                    <div className="search-bar">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Search Customer"/>
                    </div>
                )}

                <div className="delete-btn">
                    {selectedRows.length >= 1 ? (
                        <GeneralButton buttonText="Delete"/>
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
                    rowSelection={{type: "checkbox", onChange: setSelectedRows}}
                    scroll={{x: "1200px", y: "calc(100vh - 300px)"}}
                    dataSource={customers?.map(customer => {
                        return {
                            key: customer.id,
                            id: (
                                <button
                                    onClick={() => setAppState({selectedCustomer: customer, openCustomerProfile: true})}
                                    className="customers-username">
                                    {customer.full_name}
                                </button>
                            ),
                            Phone: customer.phone,
                            Email: customer.email,
                            status: (
                                <div>
                                    <span
                                        className={`badge ${customer.isVerified ? 'bg-success' : 'bg-danger'}`}>{customer.isVerified ? 'Verified' : 'Not Verified'}</span>
                                    <span
                                        className={`badge ${customer.isOnline ? 'bg-success' : 'bg-danger'}`}>{customer.isOnline ? 'Online' : 'Offline'}</span>
                                    <span className={`badge ${customer.isActive ? 'bg-success' : 'bg-danger'}`}>
                                        {customer.isActive ? 'Active' : 'Not Active'}
                                    </span>
                                </div>
                            ),
                            action: (
                                <div className="more">
                                    <span className="material-icons more-icon">more_horiz</span>
                                    <ul className="dropdown">
                                        <li className="option " onClick={() =>
                                            setAppState({openEditAdmin: true, selectedCustomer: customer,selectedAdmin: customer,})}>
                                            Edit
                                        </li>
                                        <li className="option">Delete</li>
                                    </ul>
                                </div>
                            )
                        };
                    })}
                />
                {pagesCount && (
                    <Pagination defaultCurrent={1} total={pagesCount} onChange={setCurrentPage}
                                style={{textAlign: "right", marginTop: "20px"}}/>
                )}
            </div>
            <UserUpdateModal/>
        </div>
    );
};

export default Riders;
