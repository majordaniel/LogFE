import React, {useState} from 'react';
import './styles.scss'
import DashboardMap from '../../pages/dashboard/home/dashboardMap/dashboardMap'
import CancelButton from '../generalButton/cancelButton';
import AcceptButton from '../generalButton/AcceptButton';

const CustomerForm = ({formHeading, cancelBtn, customer}) => {
    const [showLongitude, setShowLongitude] = useState(false)
    const [formUser, setFormUser] = useState(false)
    return (
        <div className="customer-form">
            <div className="form-header fs-30">
                <h3>{formHeading || 'Edit Profile'}</h3>
            </div>
            <form>
                <div className="form-row">
                    <div className="form-col">
                        <label className="required">Name:</label>
                        <input type="text" name="name"/>
                    </div>
                    <div className="form-col">
                        <label className="required">Phone:</label>
                        <input type="tel" placeholder="9037399392" name="phone"/>
                        <select name="countryCode" id="">
                            <option value="">+234</option>
                            <option value="">+1</option>
                            <option value="">+223</option>
                            <option value="">+423</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-col">
                        <label>Email:</label>
                        <input name="email" type="email"/>
                    </div>
                    <div className="form-col">
                        <label>Address:</label>
                        <input name="address" type="text"/>
                        <span className="material-icons logi-lati" onClick={() => setShowLongitude(!showLongitude)}>
            language
          </span>
                    </div>
                </div>

                {showLongitude &&
                <div className="form-row">
                    <div className="form-col">
                        <label>Logitude:</label>
                        <input name="longitude" type="text"/>
                    </div>
                    <div className="form-col">
                        <label>Latitude:</label>
                        <input name="latitude" type="text"/>
                    </div>
                </div>
                }

                <div className="form-row">
                    <div className="form-col">
                        <label className="tags-label">Tags:</label>
                        <input name="tags" type="text" placeholder="Tags"/>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-col">
                        <input type="checkbox"
                               onChange={(e) => e.target.checked ? setFormUser(true) : setFormUser(false)}/>
                        <span className="checkmark"></span>
                        <span className="form-user">Form User</span>
                    </div>
                </div>


                {formUser &&
                <React.Fragment>
                    <div className="form-row">
                        <div className="form-col">
                            <label className="required">Password:</label>
                            <input name="password" type="password"/>
                        </div>
                        <div className="form-col">
                            <label>Company:</label>
                            <input name="company" type="text"/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-col">
                            <label>Description:</label>
                            <input name="description" type="text"/>
                        </div>
                    </div>
                </React.Fragment>
                }
                <div className="map">
                    <DashboardMap/>
                </div>


                <div className="form-footer">
                    <span style={{marginRight: '10px'}}>
                        <CancelButton buttonText="Cancel" buttonClick={cancelBtn}/></span>
                    <AcceptButton buttonText="Add" submit/>
                </div>

            </form>

        </div>
    );
}

export default CustomerForm;