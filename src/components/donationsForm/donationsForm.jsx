import React, {useState} from "react";
import "./styles.scss";
import CancelButton from "../generalButton/cancelButton";
import AcceptButton from "../generalButton/AcceptButton";

const DonationForm = ({
  formTitle,
  btnText,
  onFormSubmit,
  closeModal,
  initialName,
  initialAvailability
}) => {
  const submit = e => {
    e.preventDefault();
    if (donationName) {
      onFormSubmit(e);
    } else {
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 2500);
    }
  };
  let [donationName, setDonationName] = useState(initialName || "");
  let [availability, setAvailability] = useState(initialAvailability || "1");
  let [acceptability, setAcceptability] = useState(initialAvailability || "1");
  let [formError, setFormError] = useState(false);

  return (
    <React.Fragment>
      <div className="post-form">
        <div className="form-header fs-30">
          <h3>{formTitle}</h3>
        </div>
        {formError && (
          <p style={{ color: "red", fontSize: "12px" }}>
            Fill all required field
          </p>
        )}
        <form onSubmit={submit} method="post" encType="multipart/form-data">
          <div className="form-row">
            <div className="form-col">
              <label className="required">Name: </label>
              <input
                name="name"
                type="text"
                value={donationName}
                onChange={e => setDonationName(e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <label>Available: </label>
              <select
                name="is_available"
                value={availability}
                onChange={e => setAvailability(e.target.value)}
              >
                <option value="1">Available</option>
                <option value="0">Not available</option>
              </select>
            </div>
            <div className="form-col">
              <label>Variation:</label>
              <select
                name="is_acceptable"
                value={acceptability}
                onChange={e => setAcceptability(e.target.value)}
              >
                <option value="1">Acceptable</option>
                <option value="0">Not acceptable</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-col">
              <label>Select Image</label>
              <input type="file" accept="image/*" name="icon" required />
            </div>
          </div>

          <div className="form-footer">
            <span style={{ marginRight: "10px" }}>
              <CancelButton buttonText="Cancel" buttonClick={closeModal} />
            </span>
            <AcceptButton buttonText={btnText} submit />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default DonationForm;
