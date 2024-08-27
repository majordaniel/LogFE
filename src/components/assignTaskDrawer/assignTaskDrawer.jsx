import './styles.scss'
import CloseButton from '../closeBotton/closeBotton';
import {Drawer} from "antd";


const AssignDrawer = ({assignTaskDrawer, toogleAssignTaskDrawer}) => {

  

  return (
    <div>
      <Drawer
        title="Basic Drawer"
        placement="bottom"
        closable={true}
        onClose={() => toogleAssignTaskDrawer()}
        visible={assignTaskDrawer}
        getContainer={false}
        className="assign-task-drawer"
        style={{ position: 'absolute', }}
      >   
        {assignTaskDrawer && <button onClick={() => toogleAssignTaskDrawer()} className="close-drawer-btn">
          <CloseButton />
        </button>}
      </Drawer>
    </div>
   );
}
 
export default AssignDrawer;