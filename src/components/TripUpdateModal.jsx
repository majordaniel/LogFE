import React, {useContext, useState} from "react";
import {AppContext} from "../context/AppContext";
import {Modal, Select, Switch} from "antd";
import {hideLoading, setAppState, showLoading} from "../utils/Constants";
import {AppService} from "../services";
import {catchAuthError, showSuccess} from "../utils";

const TripUpdateModal = () => {
    const {assign, tripInformation, riders} = useContext(AppContext)
    const {Option} = Select;
    const [status, setStatus] = useState(tripInformation.status);
    const [rider_id, setRiderId] = useState(tripInformation.rider_id);
    const [isPaid, setIsPaid] = useState(tripInformation.isPaid);


    const setAssignModal = (assign) => setAppState({assign})
    const update = (data) => {
        showLoading();
        AppService.updateTrip(tripInformation.id, data).then(({data: {message, data}}) => {
            showSuccess(message)
            setAppState({tripInformation: {...tripInformation, ...data}})
        }).catch(catchAuthError).finally(() => {
            hideLoading();
            setAssignModal(false)
        })
    }
    const handleOk = () => update({tp_comment: '', isPaid, status, rider_id});

    const handleCancel = () => setAssignModal(false)

    return (
        <Modal title="Trip Update"
               className={"assign-modal"} visible={assign} onOk={handleOk} okText={'Update'} onCancel={handleCancel}>
                <div className="form-group">
                    <h4>Mark as Paid</h4>
                    <div className="form-col">
                        <div className="spaced aligned">
                            <span>Toggle Switch to mark as paid</span>
                            <Switch onChange={setIsPaid} defaultChecked={isPaid} size={"small"}/>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <h4>Update Status</h4>
                    <div className="form-col">
                        <Select
                            showSearch
                            style={{width: "100%"}}
                            placeholder="Search Tag"
                            defaultValue={tripInformation.status}
                            optionFilterProp="children"
                            onChange={setStatus}
                        >
                            {['NOT_STARTED', 'ACCEPTED', 'IN_TRANSIT', 'COMPLETED', 'CANCELLED', 'REJECTED', 'EN_ROUTE', 'DELIVERED']
                                .map((_) => {
                                    return <Option key={_} value={_.toLowerCase()}
                                                   disabled={['COMPLETED', 'CANCELLED', 'REJECTED', 'DELIVERED'].includes(tripInformation.status)}
                                                   selected={_ === tripInformation.status}>
                                        {_.replace('_', ' ')}
                                    </Option>
                                })}
                        </Select>
                    </div>
                </div>
                <div className="form-group">
                    <h4 className="my-4">Assign Rider</h4>
                    <div className="form-col">
                        <Select showSearch style={{width: "100%"}}
                                placeholder="Assign" onChange={setRiderId}
                                defaultValue={tripInformation.rider_id}
                                optionFilterProp="children">
                            {riders.map(_ => <Option value={_.id} key={_.id}>{_.full_name}</Option>)}
                        </Select>
                    </div>
                </div>
        </Modal>
    );
}
export default TripUpdateModal