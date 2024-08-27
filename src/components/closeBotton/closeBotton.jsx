import "./styles.scss";

const CloseButton = ({ onClick }) => {
  return (
    <span className="material-icons close-btn" onClick={onClick}>
      close
    </span>
  );
};

export default CloseButton;
