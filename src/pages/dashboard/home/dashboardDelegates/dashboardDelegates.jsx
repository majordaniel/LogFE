import PaneHeader from '../../../../components/PaneHeader/PaneHeader'
import TabsComponent from '../../../../components/Tabs/tabs'
import './styles.scss'
import {useContext} from 'react'
import {AppContext} from "../../../../context/AppContext";
import {CompanyList, UserList} from "../../../../components/common";


const DashboardDelegates = () => {
    const {companies, users, admins} = useContext(AppContext)
    const dashboardDelegateTabs = [
        {
            tabName: 'Companies',
            tabContent: <CompanyList/>,
            tabValue: companies?.length || 0,
            tabIndex: 1
        },
        {
            tabName: 'Users',
            tabContent: (<UserList data={users}/>),
            tabValue: users?.length || 0,
            tabIndex: 2
        },
        {
            tabName: 'Admins',
            tabContent: (<UserList data={admins}/>),
            tabValue: admins?.length || 0,
            tabIndex: 3
        }
    ]

    return (
        <div className="dashboard-delegate">
            <PaneHeader tabName="Delegates" animateSearh={false} showSearch={true} taskId={''}/>
            <TabsComponent tabItems={dashboardDelegateTabs}/>
        </div>
    );
}

export default DashboardDelegates;