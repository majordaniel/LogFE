import './styles.scss'

const AddTaskBtn = ({taskType, addTask}) => {
  return (
    <div className="add-task-btn" onClick={addTask}>
      <span className="material-icons">
        add
      </span>
      <span>
        {taskType}
      </span>
    </div>
   );
}
 
export default AddTaskBtn;