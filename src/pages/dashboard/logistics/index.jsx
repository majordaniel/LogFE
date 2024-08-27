import "./styles.scss";
import {Pagination, Table} from "antd";
import {useEffect, useState} from "react";
import GeneralButton from "../../../components/generalButton/AcceptButton";
import {hideLoading, setAppState, showLoading} from "../../../utils/Constants";
import {AppService} from "../../../services";
import {catchAuthError} from "../../../utils";
import Moment from "react-moment";

const columns = [
    {
        title: "FULL NAME",
        dataIndex: "id",
        key: "id"
    },
    {
        title: "PHONE",
        dataIndex: "phone",
        key: "phone"
    },
    {
        title: "ADDRESS",
        dataIndex: "address",
        key: "address"
    },
    {
        title: "PROFILE",
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
    const [companies, setCompanies] = useState([]);
    const [pagesCount, setPagesCount] = useState(1);

    const fetchData = () => {
        showLoading()
        AppService.listCompanies(currentPage).then(({data}) => {
            setCompanies(data.data.companies);
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
                    <input type="text" placeholder="Search Logistics"/>
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
                        <i className="fa fa-search"/>
                        <input type="text" placeholder="Search Logistics"/>
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
                    dataSource={companies?.map(company => {
                        return {
                            key: company.id,
                            id: (
                                <button
                                    onClick={() => setAppState({selectedCompany: company, openCompanyProfile: true})}
                                    className="customers-username">
                                    {company.name}
                                </button>
                            ),
                            phone: company.phone,
                            address: company.address,
                            status: (
                                <div>
                                    <p className="m-0 fs-12">Created At  <Moment format="DD-MM-YYYY @ hh:mm" date={new Date(company.createdAt)} /></p>
                                    <span className={`badge ${company.isActive ? 'bg-success' : 'bg-danger'}`}>
                                        {company.isActive ? 'Active' : 'Not Active'}
                                    </span>
                                </div>
                            ),
                            action: (
                                <div className="more">
                                    <span className="material-icons more-icon">more_horiz</span>
                                    <ul className="dropdown">
                                        <li className="option " onClick={() =>
                                            setAppState({openEditCompany: true, selectedCustomer: company})}>
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
        </div>
    );
};

export default Riders;
