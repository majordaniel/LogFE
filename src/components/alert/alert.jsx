import "./styles.scss";
import {Alert} from "antd";
import {useEffect} from "react";
import {closeAlert} from "../../utils/Constants";

const AlertModal = ({alertMessage, alertType, closeAble}) => {
    useEffect(() => {
        if(!closeAble) {
            setTimeout(closeAlert, 10000);
        }
    });
    return (
        <div className="alert">
            <Alert message={alertMessage} type={alertType} closable={true}/>
        </div>
    );
};

export default AlertModal;
