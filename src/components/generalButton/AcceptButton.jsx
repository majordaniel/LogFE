import './styles.scss'

const AcceptButton = ({buttonText, buttonClick, submit}) => {
  return (
    <button type={submit ? 'submit' : 'button'} className="general-btn accept" onClick={submit ? null : buttonClick}>{ buttonText }</button>
   );
}
 
export default AcceptButton;