import "./styles.scss";
import {Drawer} from "antd";
import TabsComponent from "../Tabs/tabs";
import CloseButton from "../closeBotton/closeBotton";
import {useContext} from "react";
import TaskDetails from "./taskDetails/taskDetails";
import TaskHistory from "./taskHistory/taskHistory";
import CustomerDetails from "./customerDetails/customerDetails";
import {AppContext} from "../../context/AppContext";
import {setAppState} from "../../utils/Constants";

const TaskDetailsTab = () => {
    const {showTripDetails,  tripDetails} = useContext(AppContext);

    const dashboardTaskDetailsTabs = [
        {
            tabName: "Details",
            tabContent: <TaskDetails details={tripDetails}/>,
            tabIndex: 1
        },
        {
            tabName: "Customers",
            tabContent: <CustomerDetails details={tripDetails}/>,
            tabIndex: 2
        },
        {
            tabName: "History",
            tabContent: <TaskHistory data={tripDetails?.task_history || []}/>,
            tabIndex: 3
        }
    ];

    // const moreButton = (
    //     <div className="more">
    //         <span className="material-icons more-icon">more_vert</span>
    //         <ul className="dropdown">
    //             <li className="option">Edit stop</li>
    //             <li className="option">Duplicate stop</li>
    //             <li className="option">Export stop</li>
    //             <li className="option">Delete stop</li>
    //             <li className="option">Reassign the delegate</li>
    //             <li className="option">Change stop status</li>
    //         </ul>
    //     </div>
    // );

    return (
        <div className="task-details-tab">
            <div className="details-tab-drawer">
                <Drawer
                    title="Basic Drawer"
                    placement="bottom" closable={true}
                    onClose={() => setAppState({showTripDetails : false})}
                    visible={showTripDetails} getContainer={false}
                    style={{position: "absolute"}}
                >
                    <button onClick={() => setAppState({showTripDetails : false})}
                            className={`close-detalis-btn ${showTripDetails ? "show-btn" : ""}`}>
                        <CloseButton/>
                    </button>

                    <TabsComponent tabItems={dashboardTaskDetailsTabs}/>
                </Drawer>
            </div>
        </div>
    );
};

export default TaskDetailsTab;
