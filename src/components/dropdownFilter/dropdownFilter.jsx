import {useState} from 'react';
import './styles.scss'


const DropdownFilter = ({ options, backdrop, selectOption, optionSelected }) => {


  const [modal, setModal] = useState(false)

  return (
    <div className="dropdown-filter" >
      <div className="options-select-btn" onClick={ ()=> setModal(!modal)}>
        
        <div className="option-selected">
          {optionSelected}
        </div>
        
        <div className="caret-icon">
          <i className={`fa fa-caret-down 
          ${modal === true ? 'caret-rotate' : '' }
          `}></i>
        </div>
    
      </div>

      {modal &&
        <div className="option-modal">
          {backdrop && <div className="backdrop" onClick={(e) => setModal(false)}></div>}
          <div className="modal">
            
            <ul className="options-select">
              {/*<li teamvalue="Team 1" >Team 1</li> */}
              {options?.map(option => (
                <li key={option} onClick={(e) => {
                  selectOption(e)
                  setModal(false)
                }}>{option}</li>
              ))}

            </ul>
                  

          </div>
          
        </div>
      }
    </div>
   );
}
 
export default DropdownFilter;