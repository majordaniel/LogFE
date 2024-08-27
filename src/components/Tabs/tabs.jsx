import {Tabs} from "antd";
import "./styles.scss";

const {TabPane} = Tabs;
const TabsComponent = ({tabItems, activeTabKey = 1, onChange,extraButton}) => {
    return (
        <div className="tab-component">
            <Tabs
                tabBarStyle={{backgroundColor: "#eaedf0"}}
                defaultActiveKey={activeTabKey}
                onChange={onChange && onChange}
                tabBarExtraContent={extraButton}
            >
                {tabItems?.map(tabItem => (
                    <TabPane tab={<span>{" "}{tabItem.tabValue} {tabItem.tabName}</span>} key={tabItem.tabIndex}>
                        {tabItem.tabContent}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
};

export default TabsComponent;
