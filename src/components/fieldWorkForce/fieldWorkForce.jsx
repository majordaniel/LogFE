import {useState} from 'react'
import AddTaskBtn from '../addTaskBtn/addTaskBtn'
import {Collapse} from 'antd';
import './styles.scss'
import CreateTaskForm from '../createTaskForm/createTaskForm';

const FieldWorkForce = () => {

  const { Panel } = Collapse;

  const [addField, setAddField] = useState(false)

  const addTask = () => {
    setAddField(true)
  }
  
  const collapseHeader =
    <div className="collapse-header">
      <span>Field WorkForce</span>
      <span className="material-icons remove-task-icon" onClick={()=> setAddField(false) }>
        remove_circle_outline
      </span>
    </div>

  

  return (
    <div className="field-task">
      {addField &&
        <Collapse defaultActiveKey={['1']} >
          <Panel header={collapseHeader} key="1">

          <CreateTaskForm datePicker={true} capacity={true} />
        
        </Panel>
        </Collapse>
      }
      {!addField && <AddTaskBtn taskType="Field WorkForce" addTask={addTask} />}

    </div>
   );
}
 
export default FieldWorkForce;