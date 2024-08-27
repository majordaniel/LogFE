import {useState} from 'react'
import AddTaskBtn from '../addTaskBtn/addTaskBtn'
import {Collapse} from 'antd';
import './styles.scss'
import CreateTaskForm from '../createCompany';

const Appointment = () => {

  const { Panel } = Collapse;

  const [addAppointment, setAddAppointment] = useState(false)

  const addTask = () => {
    setAddAppointment(true)
  }
  
  const collapseHeader =
    <div className="collapse-header">
      <span>Appointment</span>
      <span className="material-icons remove-task-icon" onClick={()=> setAddAppointment(false) }>
        remove_circle_outline
      </span>
    </div>

  

  return (
    <div className="appointment-task">
      {addAppointment &&
        <Collapse defaultActiveKey={['1']} >
          <Panel header={collapseHeader} key="1">

          <CreateTaskForm datePicker={true} capacity={true} />
        
        </Panel>
        </Collapse>
      }
      {!addAppointment && <AddTaskBtn taskType="Appointment" addTask={addTask} />}

    </div>
   );
}
 
export default Appointment;