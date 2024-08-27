import './styles.scss'

const RegularButton = ({buttonText, buttonClick, submit}) => {
  return (
    <button type={submit ? 'submit' : 'button'} className="general-btn regular" onClick={submit ? null : buttonClick}>{ buttonText }</button>
   );
}
 
export default RegularButton;