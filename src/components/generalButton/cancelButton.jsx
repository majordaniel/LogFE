import './styles.scss'

const CancelButton = ({buttonText, buttonClick, submit}) => {
  return (
    <button type={submit ? 'submit' : 'button'} className="general-btn cancel" onClick={submit ? null : buttonClick}>{ buttonText }</button>
   );
}
 
export default CancelButton;