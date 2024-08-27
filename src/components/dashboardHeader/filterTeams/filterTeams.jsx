import {useState} from 'react'
import DropdownFilter from '../../dropdownFilter/dropdownFilter'
import './styles.scss'

const FilterTeams = () => {


  const teams = ['All Team', 'Team 1', 'Team 2', 'Team 3', 'Team 4','Team 5','Team 6','Team 7', 'Team 8',]
  const [teamSelected, setTeamselected] = useState('All Team')
  

  return (
    <DropdownFilter options={teams} selectOption={(e)=> setTeamselected(e.target.innerText)} optionSelected={teamSelected} backdrop={true} />
  );
}
 
export default FilterTeams;