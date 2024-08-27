import {useState} from 'react';
import {DatePicker, Slider} from 'antd';
import './styles.scss'
import Moment from "react-moment";


const FilterDate = () => {

  const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [modal, setModal] = useState(false)
  const [time, setTime] = useState([1, 24]);
  const [date, setDate] = useState(String(new Date().getDate()).padStart(2, '0'))
  const [month, setMonth] = useState(monthNames[new Date().getMonth() + 1])
  const today = new Date().getDate();
  const timeChange = (value) => {
    setTime(value)
  }

  function onChange(date) {
    setDate(date.date())
    setMonth(date._locale._monthsShort[date.month()])
  }

  const closeModal = (e) => {
    if(e.target === e.currentTarget) {
      setModal(false)
    }
  }

  return (
    
    <div className="filter-date" >
      <div className="date-time-select-btn" onClick={ ()=> setModal(true)}>
        
        <div className="date-time-selected">
          {date}, {month} <Moment add={{hour:time[0]}} format="hh:mm A">{today}</Moment> -
          <Moment add={{hour:time[1]}} format="hh:mm A">{today}</Moment>
        </div>
        
        <div className="caret-icon">
          <i className={`fa fa-caret-down 
          ${modal === true ? 'caret-rotate' : '' }
          `}></i>
        </div>
      
      </div>

      {modal &&
        <div className="date-time-modal">
        <div className="backdrop" onClick={(e) => closeModal(e)}></div>
          <div className="modal">
            <p style={{ textAlign: 'center' }}>Time Range: <Moment add={{hour:time[0]}} format="hh:mm A">{today}</Moment> -
              <Moment add={{hour:time[1]}} format="hh:mm A">{today}</Moment></p>
            <Slider range defaultValue={[1, 24]} reverse={false} max={24} min={1} onChange={timeChange} />
            <DatePicker onChange={onChange} open={true} showNow={false} dropdownClassName="filter-date-picker" />
          </div>
        </div>
      }
    </div>
   );
}
 
export default FilterDate;