import "./styles.scss";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const PaneHeader = ({tabName, showSearch, shwobackBtn, backBtnClick, animateSearch, taskDetails, showid}) => {
    return (
        <div className="pane-header">
            <div className="head-tab">
                {shwobackBtn && (
                    <span className="material-icons back-arrow" onClick={backBtnClick}>arrow_back</span>
                )}
                {showid && <span>{taskDetails.order_id}/</span>}
                {tabName}
            </div>
            {showSearch && (
                <div className="search-icon">
                    <FontAwesomeIcon
                        icon={faSearch}
                        className={`icon ${animateSearch ? "hide" : ""}`}
                    />
                </div>
            )}
        </div>
    );
};

export default PaneHeader;
