import "./styles.scss";
import React from "react";
import Moment from "react-moment";
// import {FaMap, FiMapPin} from "react-icons/all";
import { FaMap } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';


import {formatMoney, Naira} from "../../utils";
import {setAppState} from "../../utils/Constants";

const TripCard = ({task}) => {
    const color = {'NOT_STARTED':'info', 'ACCEPTED':'purple',
        'IN_TRANSIT': 'brown', 'COMPLETED':'success',
        'CANCELLED':'dark', 'REJECTED':'danger', 'EN_ROUTE':'danger', 'DELIVERED':'success'}[task?.status]|| 'primary'
    return (
        <React.Fragment>
            <div className="task-card" onClick={() => {
            }}>
                <div className="spaced aligned">
                    <div className="aligned">
                        <FiMapPin/>
                        <p className="ms-2 task-address">{task?.origin?.address}</p>
                    </div>
                    <p className="fw-500">{Naira + formatMoney(task?.amount || 0)}</p>
                </div>
                <div className="spaced aligned py-0 ps-2">
                    <div className="divider"/>
                    <div className="hoverable">
                        <button
                            className="btn btn-primary btn-sm btn-round"
                            onClick={() =>
                                setAppState({
                                    showTripInformation: true,
                                    tripInformation: task,
                                })
                            }
                        >
                            View Trip Details
                        </button>
                    </div>
                </div>
                <div className="d-flex ">
                    <FaMap className="mt-1 "/>
                    <div className="ms-2 flex">
                        <p className="task-address">{task?.destination?.address}</p>
                        <div className="spaced w-100">
                            <Moment className="fs-12 fw-100" fromNow date={task.createdAt}/>
                            <p className={`text-${color} fs-12 font-italic`}>{task?.status?.replace('_', ' ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default TripCard;
