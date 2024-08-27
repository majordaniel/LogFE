import "./style.scss";

import UpdatButton from "../../../../components/generalButton/AcceptButton";

const PreferenceSettings = () => {
  return (
    <div className="preference-settings">
      <div className="form-group">
        <h5 className="page-sub-heading">Default Dashboard View</h5>
        <div className="panel">
          <div className="content">
            <p className="field-label">Default Dashboard View</p>
            <select>
              <option>List view</option>
              <option>Map View</option>
            </select>
          </div>
          <div className="update-button">
            <UpdatButton buttonText="Update" submit />
          </div>
        </div>
      </div>

      <div className="form-group">
        <h5 className="page-sub-heading">Address Update</h5>
        <div className="panel">
          <div className="content">
            <p className="field-label">
              Mark this setting to update the address while moving the pin on
              create and update المهام.
            </p>
            <label>
              <div className="check-box">
                <input type="checkbox" />
                <span className="checkmark"></span>
                <span className="check-label">Enable Address Update</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <h5 className="page-sub-heading">Missions Settings</h5>
        <div className="panel">
          <div className="content">
            <p className="field-label">DEFAULT ACCOUNT SETTINGS</p>
            <select>
              <option>Task view</option>
              <option>Mission View</option>
              <option>Both</option>
            </select>
          </div>
          <div className="update-button">
            <UpdatButton buttonText="Update" submit />
          </div>
        </div>
      </div>

      <div className="form-group">
        <h5 className="page-sub-heading">Date Time Format</h5>
        <div className="panel">
          <div className="content">
            <p className="field-label">DATE FORMAT</p>
            <select>
              <option>DD MMM YYYY (15 DEC 2018)</option>
              <option>MM/DD/YYYY (12/15/2018)</option>
              <option>YYYY/MM/DD (2018/12/15)</option>
            </select>
            <p className="field-label" style={{ marginTop: "20px" }}>
              Time FORMAT
            </p>
            <select>
              <option>12 Hours</option>
              <option>24 Hours</option>
            </select>
          </div>
          <div className="update-button">
            <UpdatButton buttonText="Update" submit />
          </div>
        </div>
      </div>

      <div className="form-group">
        <h5 className="page-sub-heading">Distance Unit</h5>
        <div className="panel">
          <div className="content">
            <p className="field-label">UNIT PREFERENCES</p>
            <select>
              <option>Kilometers</option>
              <option>Miles</option>
            </select>
          </div>
          <div className="update-button">
            <UpdatButton buttonText="Update" submit />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferenceSettings;
