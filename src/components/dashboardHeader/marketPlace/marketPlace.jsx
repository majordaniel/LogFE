import {useState} from "react";
import "./styles.scss";

const MarketPlace = () => {
  const [modal, setModal] = useState(false);

  const closeModal = e => {
    if (e.target === e.currentTarget) {
      setModal(false);
    }
  };

  return (
    <div className="market-place">
      <span className="material-icons icon" onClick={e => setModal(true)}>
        apps
      </span>

      {modal && (
        <div className="date-time-modal">
          <div className="backdrop" onClick={e => closeModal(e)}></div>
          <div className="modal">Comming soon</div>
        </div>
      )}
    </div>
  );
};

export default MarketPlace;
