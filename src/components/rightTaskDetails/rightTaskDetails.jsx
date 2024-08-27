import './styles.scss'

import {Drawer} from 'antd';
import PaneHeader from '../PaneHeader/PaneHeader'
import TabsComponent from "../Tabs/tabs";
import TaskDetails from '../taskDetailsTab/taskDetails/taskDetails'
import CustomerDetails from '../taskDetailsTab/customerDetails/customerDetails';
import CustomerHistory from '../taskDetailsTab/taskHistory/taskHistory';


const CustomerTaskDetails = ({visibility, onClose, taskDetails}) => {

    const customerTaskDetailsTabs = [
        {
            tabName: 'Details',
            tabContent: <TaskDetails details={taskDetails}/>,
            tabIndex: 1
        },
        {
            tabName: 'Customers',
            tabContent: <CustomerDetails details={taskDetails}/>,
            tabIndex: 2
        },
        {
            tabName: 'History',
            tabContent: <CustomerHistory/>,
            tabIndex: 3
        }
    ]

    return (
        <Drawer
            headerStyle={{display: 'none'}}
            placement="right"
            closable={false}
            onClose={onClose}
            maskClosable={false}
            mask={true}
            visible={visibility}
            width={370}
            className="half-drawer customer-task-details"
        >

            <PaneHeader tabName="task" taskDetails={taskDetails} showid={visibility} shwobackBtn={true}
                        backBtnClick={onClose}/>
            <TabsComponent tabItems={customerTaskDetailsTabs}/>

        </Drawer>
    );
}

export default CustomerTaskDetails;