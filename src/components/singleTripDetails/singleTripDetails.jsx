import {Drawer, Image} from "antd";
import React, {useContext} from "react";
import {AppContext} from "../../context/AppContext";
import {isCompany, setAppState} from "../../utils/Constants";
import moment from "moment";
import "./styles.scss";
import CloseButton from "../closeBotton/closeBotton";
import {LineDetail} from "../common";
import {formatMoney, Naira} from "../../utils";

const SingleTripDetails = () => {
    const {showTripInformation, tripInformation} = useContext(AppContext);
    const openTripModal = () => setAppState({assign: true})
    return (
        <Drawer
            title=""
            placement="left"
            width={"360px"}
            className="single-trip-details-drawer"
            bodyStyle={{backgroundColor: "#f6f6f6", height: "100%"}}
            maskClosable={true}
            onClose={() =>
                setAppState({
                    showTripInformation: false,
                    tripInformation: {},
                })
            }
            closable={false}
            visible={showTripInformation}
            key="Left"
        >
            <div className="single-trip-details details-list">
                <div className="heading">
                    <span>Trip Information</span>{" "}
                    <CloseButton
                        onClick={() =>
                            setAppState({
                                showTripInformation: false,
                                tripInformation: {},
                            })
                        }
                    />
                </div>

                {tripInformation?.user && (
                    <div className="trip-owner">
                        <img src="/image/default-user.png" alt=""/>
                        <div className="owner-details">
                            <span>{tripInformation?.user?.full_name}</span>
                            <span>{tripInformation?.user?.phone}</span>
                        </div>
                        <div className="date-created">
                            {moment(new Date(tripInformation?.createdAt)).fromNow()}
                        </div>
                    </div>
                )}

                <div className="trip-loaction">
                    <div className="location-icon">
                        <span className="material-icons-outlined">place</span>
                    </div>
                    <div className="location-details">
                        <h4>Pick-up Address</h4>
                        <span>{tripInformation?.origin?.address}</span>
                        <span>{tripInformation?.origin?.phone}</span>
                    </div>
                    {tripInformation?.origin?.latitude &&
                    tripInformation?.origin?.longitude ? (
                        <span
                            className="view-map"
                            onClick={() =>
                                setAppState({
                                    showMapLocation: true,
                                    map: {
                                        lat: tripInformation?.origin?.latitude,
                                        lng: tripInformation?.origin?.longitude,
                                    },
                                })
                            }
                        >
              View on map
            </span>
                    ) : (
                        ""
                    )}
                </div>

                <div className="trip-loaction">
                    <div className="location-icon">
                        <span className="material-icons-outlined">place</span>
                    </div>
                    <div className="location-details">
                        <h4>Delivery Address</h4>
                        <span>{tripInformation?.destination?.address}</span>
                        <span>{tripInformation?.destination?.phone}</span>
                    </div>
                    {tripInformation?.destination?.latitude &&
                    tripInformation?.destination?.longitude ?
                        <div
                            className="view-map"
                            onClick={() =>
                                setAppState({
                                    showMapLocation: true,
                                    map: {
                                        lat: tripInformation?.destination?.latitude,
                                        lng: tripInformation?.destination?.longitude,
                                    },
                                })
                            }
                        >
                            View on map
                        </div>
                        : ""}
                </div>

                <div className="trip-loaction">
                    <div className="location-icon">
                        <span className="material-icons-outlined">two_wheeler</span>
                    </div>
                    <div className="location-details">
                        <h4>Rider Information</h4>
                        <span>{tripInformation?.rider?.full_name}</span>
                        <span>{tripInformation?.rider?.phone}</span>
                    </div>
                </div>

                {tripInformation?.images && (
                    <div className="item-images">
                        <h4>Images (click to preview)</h4>
                        <div className="images">
                            {tripInformation?.images?.map((imageSrc) => (
                                <Image width={70} src={imageSrc} key={imageSrc}/>
                            ))}
                        </div>
                    </div>
                )}
                <ul>
                    <LineDetail value={tripInformation?.status?.replace('_', ' ')} title={"Status"}/>
                    <LineDetail
                        value={Naira + formatMoney(tripInformation?.amount || 0)}
                        title={"Amount"}
                    />
                    <LineDetail
                        value={tripInformation?.invoice_number}
                        title={"Invoice Number"}
                    />
                    <LineDetail value={tripInformation.isPaid ? 'Yes' :'Not Paid' } title={"Paid"}/>
                </ul>
            </div>

            {isCompany && <>
                <div className="mt-5  d-flex px-5 w-100">
                    <button onClick={openTripModal} className="btn w-100 btn-secondary">
                        Update Trip
                    </button>

                </div>

            </>}
        </Drawer>
    );
};

export default SingleTripDetails;

