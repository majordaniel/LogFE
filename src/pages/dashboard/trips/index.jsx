import {useContext, useEffect, useState} from "react";
import {Image, Table} from "antd";
import Moment from "react-moment";

import "./styles.scss";
import {hideLoading, setAppState, showLoading, USER_TYPE_HASH,} from "../../../utils/Constants";
import {AppService, CompanyAuthService} from "../../../services";
import {catchAuthError} from "../../../utils";
import GeneralButton from "../../../components/generalButton/AcceptButton";
import SingleTripDetails from "../../../components/singleTripDetails/singleTripDetails";
import {AppContext} from "../../../context/AppContext";
import TripLocationMap from "../../../components/singleTripLocationMap/singleTripLocationMap";

const columns = [
  {
    title: "Customer Details",
    dataIndex: "user",
    key: "Name",
    render: (value) => (
      <div>
        {value.full_name} <br /> {value.phone}
      </div>
    ),
  },
  {
    title: "Items",
    key: "Type",
    render: (value) => (
      <div>
        Weight: {value.weight}kg
        <div className="d-flex flex-wrap">
          {value?.images?.map((image) => (
            <div className="m-2" key={image}>
              <Image width={30} height={30} src={image} />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Rider",
    dataIndex: "rider",
    key: "rider",
    render: (value) => (
      <div>
        {value.full_name} <br /> {value.phone}
      </div>
    ),
  },
  {
    title: "Location",
    key: "Location",
    render: (value) => (
      <div>
        Origin: {value.origin.address} <br />
        Destination: {value.destination.address}
      </div>
    ),
  },
  {
    title: "Time & ammount",
    key: "address",
    render: (value) => (
      <div>
        {<Moment fromNow>{value.createdAt}</Moment>} <br />
        Amount: ₦{value.amount}
      </div>
    ),
  },
  {
    title: "STATUS",
    key: "status",
    render: (value) => (
      <div>
        {value.status} <br />
        Payment Method: {value.payment_method} <br />
        Paid: {value.isPaid ? "Completed" : "Not Paid"}
      </div>
    ),
  },
  {
    title: "Action",
    key: "action",
    width: 100,
    render: (value) => (
      <div className="more">
        <span className="material-icons more-icon">more_horiz</span>
        <ul className="dropdown">
          <li
            className="option"
            onClick={() =>
              setAppState({
                showTripInformation: true,
                tripInformation: value,
              })
            }
          >
            View Details
          </li>
        </ul>
      </div>
    ),
  },
];
const Trips = () => {
  const { showTripInformation, showMapLocation } = useContext(AppContext);

  let [currentPage, setCurrentPage] = useState(1);
  // state for customers data
  const [trips, setTrips] = useState([]);
  // const [pagesCount, setPagesCount] = useState(1);

  const fetchData = () => {
    showLoading();
    if (localStorage.getItem(USER_TYPE_HASH) === "company") {
      CompanyAuthService.listTrips(currentPage)
        .then(({ data }) => {
          setTrips(data.data.trips);
          console.log(data);
          setCurrentPage(data.data?.page || 1);
          // setPagesCount(data.data.total);
        })
        .catch(catchAuthError)
        .finally(hideLoading);
    } else {
      AppService.listTrips(currentPage)
        .then(({ data }) => {
          setTrips(data.data.trips);
          console.log(data);
          setCurrentPage(data.data?.page || 1);
          // setPagesCount(data.data.total);
        })
        .catch(catchAuthError)
        .finally(hideLoading);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [currentPage]);

  //   const [taskDetails, setTaskDetails] = useState();
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <div className="tasks-list">
      <div className="table-pages-header large">
        <div className="search-bar">
          <i className="fa fa-search" />
          <input type="text" placeholder="Search Trips" />
        </div>

        {/*<div className="filter">*/}
        {/*    <div className="filter-one">*/}
        {/*        <DropdownFilter*/}
        {/*            options={filterOneOptions} selectOption={e => setFilterOne(e.target.innerText)}*/}
        {/*            backdrop={false} optionSelected={filterOne}*/}
        {/*        />*/}
        {/*    </div>*/}

        {/*    <div className="filter-two">*/}
        {/*        <DropdownFilter*/}
        {/*            options={filterTwoOptions}*/}
        {/*            selectOption={e => setFilterTwo(e.target.innerText)}*/}
        {/*            backdrop={false}*/}
        {/*            optionSelected={filterTwo}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*</div>*/}

        <div className="delete-btn">
          {selectedRows.length >= 1 ? (
            <GeneralButton buttonText="Delete" />
          ) : null}
        </div>
      </div>

      <div className="table-pages-header mobile">
        {selectedRows.length >= 1 && (
          <div className="search-bar">
            <i className="fa fa-search" />
            <input type="text" placeholder="Search Trips" />
          </div>
        )}
        <div className="delete-btn">
          {selectedRows.length >= 1 && <GeneralButton buttonText="Delete" />}
        </div>
      </div>
      <div className="task-table">
        <Table
          columns={columns}
          pagination={false}
          className="table"
          rowSelection={{
            type: "checkbox",
            onChange: setSelectedRows,
          }}
          scroll={{
            x: "1200px",
            //  y: "calc(100vh - 300px)"
          }}
          dataSource={trips}
        />
      </div>

      {showTripInformation && <SingleTripDetails />}
      {showMapLocation && <TripLocationMap />}
    </div>
  );
};

export default Trips;
