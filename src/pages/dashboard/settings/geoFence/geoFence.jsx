import "./styles.scss";

import React, {useContext, useEffect, useState} from "react";
import {catchError, showSuccess} from "../../../../utils";

import AcceptButton from "../../../../components/generalButton/AcceptButton";
import CancelButton from "../../../../components/generalButton/cancelButton";
import Mapper from "./MapGeofence";
import Moment from "react-moment";
import {AppService} from "../../../../services";
import {AppContext} from "../../../../context/AppContext";
import {hideLoading, showLoading} from "../../../../utils/Constants";

function Region({region, onDelete, index, onEdit}) {
    return (
        <div className="geo-fence-card">
            <div className="card-name">
                <span>{region.name}</span>
                <div className="more">
                    <span className="material-icons">more_horiz</span>
                    <ul className="drop-down">
                        <li onClick={() => onEdit(index)}>
                            <span>Edit</span>{" "}
                            <span className="material-icons icon">edit</span>
                        </li>
                        <li onClick={() => onDelete(region.id)}>
                            <span>Delete</span>
                            <span className="material-icons icon">delete</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="card-last-updated">
                Last Updated <Moment date={region.updated_at} fromNow/>
            </div>
        </div>
    );
}

const GeoFenceSettings = () => {
    const [regions, setRegions] = useState([]);
    const {setLoading} = useContext(AppContext);
    const [addGeofence, setAddGeofence] = useState(false);
    const [editGeofence, setEditGeofence] = useState(false);
    const [index, setEdit] = useState(null);
    const [isFencing, setFencing] = useState(true);
    // const [coordinates, setCoordinates] = useState("");
    const [geofenceTypealert, setGeofenceTypealert] = useState(false);

    const changeMap = (e) => {
        setGeofenceTypealert(true);
        setFencing(e.target.value === "geofence");
    };

    const onEdit = (id) => {
        setAddGeofence(false);
        setEdit(id);
        setEditGeofence(true);
    };

    const onDelete = (id) => {
        setLoading(true);
        AppService.delete(id)
            .then(() => {
                showSuccess("Successfully deleted");
                loadRegions();
            })
            .catch(catchError);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // if (!coordinates) {
        //     return showAlert("error", "Select a region on the map");
        // }
        const formData = new FormData(e.target);
        // formData.append("data", coordinates);
        showLoading();
        if (!regions.length || addGeofence) {
            AppService.create(formData)
                .then(() => {
                    showSuccess("Region added successfully");
                    resetForm();
                    loadRegions();
                })
                .catch((error) => {
                    hideLoading();
                    catchError(error);
                });
        } else {
            AppService.update(regions[index].id, formData)
                .then(() => {
                    showSuccess("Region updated successfully");
                    resetForm();
                    loadRegions();
                })
                .catch((error) => {
                    hideLoading()
                    catchError(error);
                });
        }
    };

    function loadRegions(search = "") {
        hideLoading()
        AppService.all(1, search)
            .then(({data}) => setRegions(data.data))
            .catch(catchError)
            .finally(hideLoading);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(loadRegions, []);
    useEffect(() => {
        if (index !== null && editGeofence) {
            const {days, name, description} = regions[index];
            days?.forEach((day) => {
                const checker = document.getElementById("checker-" + day);
                checker.checked = true;
            });
            document.getElementById("region_name").value = name;
            document.getElementById("region_description").value = description;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editGeofence, index]);

    function resetForm() {
        document.getElementById("region-form").reset();
        setLoading(false);
        setAddGeofence(false);
        setEditGeofence(false);
    }

    return (
        <div className="geofence-settings">
            {!editGeofence && !addGeofence ? (
                <React.Fragment>
                    <h5 className="page-sub-heading">Geo-fence</h5>
                    <p className="description">
                        It allows you to categorize المندوب and simplifies the process of
                        task assignment by letting you create virtual boundaries.
                    </p>
                    <span className="add-btn">
            <AcceptButton
                buttonText="Add Geo-fence"
                buttonClick={() => {
                    setAddGeofence(true);
                    setEditGeofence(false);
                }}
            />
          </span>
                    <div className="search-input">
                        <input
                            type="search"
                            onKeyDown={(e) => {
                                const value = e.target.value;
                                if (value.length > 2) {
                                    return loadRegions(value);
                                }
                                loadRegions();
                            }}
                            placeholder="Search Geo-fence"
                        />
                        <span className="icon">
              <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    d="M5.66634 11C6.84966 10.9998 7.99888 10.6036 8.93101 9.87467L11.8617 12.8053L12.8043 11.8627L9.87368 8.932C10.603 7.99978 10.9994 6.85029 10.9997 5.66667C10.9997 2.726 8.60701 0.333336 5.66634 0.333336C2.72567 0.333336 0.333008 2.726 0.333008 5.66667C0.333008 8.60734 2.72567 11 5.66634 11ZM5.66634 1.66667C7.87234 1.66667 9.66634 3.46067 9.66634 5.66667C9.66634 7.87267 7.87234 9.66667 5.66634 9.66667C3.46034 9.66667 1.66634 7.87267 1.66634 5.66667C1.66634 3.46067 3.46034 1.66667 5.66634 1.66667Z"
                    fill="#8EA2BA"
                />
              </svg>
            </span>
                    </div>
                </React.Fragment>
            ) : null}

            {addGeofence && <h5 className="page-sub-heading">Add Geo-fence</h5>}
            {editGeofence && <h5 className="page-sub-heading">Edit Geo-fence</h5>}

            {(editGeofence || addGeofence) && (
                <div className="geo-fence-type">
                    <label className="geofence-type-label">Select Geo-fence type</label>
                    <select onChange={changeMap}>
                        <option value="geofence">Geo-fence</option>
                        <option value="cityBoundary">City Boundary</option>
                    </select>
                </div>
            )}

            <div className="geo-fence">
                {!editGeofence && !addGeofence ? (
                    <div className="avialable-geo-fence">
                        {regions?.map((region, index) => (
                            <Region
                                key={"region" + index}
                                index={index}
                                region={region}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}

                        {!regions.length && (
                            <p style={{padding: 10, margin: 5}}>NO REGION FOUND</p>
                        )}
                    </div>
                ) : null}
                {(addGeofence || editGeofence) && (
                    <div className="add-geo-fence">
                        <form onSubmit={onSubmit} id={"region-form"}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    type="text"
                                    id="region_name"
                                    name="name"
                                    required
                                    placeholder="Name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <input
                                    required
                                    id="region_description"
                                    type="text"
                                    name="description"
                                    placeholder="New Region Description"
                                />
                            </div>

                            <div className="form-group">
                                <label>Teams</label>
                                <div className="teams">
                                    All Teams <input checked type="checkbox"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Select Available Days</label>
                                <hr
                                    style={{
                                        margin: "3px 0 5px",
                                        border: "1px solid rgba(0, 0, 0, .11)",
                                    }}
                                />
                                <div className="form-group  checkbox">
                                    <div>
                                        <input
                                            name="days[]"
                                            value={1}
                                            id="checker-1"
                                            type="checkbox"
                                        />
                                        <label htmlFor="checker-1">Sunday</label>
                                    </div>
                                    <div>
                                        <input
                                            name="days[]"
                                            id="checker-2"
                                            value={2}
                                            type="checkbox"
                                        />
                                        <label htmlFor="checker-2">Monday</label>
                                    </div>
                                    <div>
                                        <input
                                            name="days[]"
                                            id="checker-3"
                                            value={3}
                                            type="checkbox"
                                        />
                                        <label htmlFor="checker-3">Tuesday</label>
                                    </div>
                                    <div>
                                        <input
                                            name="days[]"
                                            id="checker-4"
                                            value={4}
                                            type="checkbox"
                                        />
                                        <label htmlFor="checker-4">Wednesday</label>
                                    </div>
                                    <div>
                                        <input
                                            name="days[]"
                                            id="checker-5"
                                            value={5}
                                            type="checkbox"
                                        />
                                        <label htmlFor="checker-5">Thursday</label>
                                    </div>
                                    <div>
                                        <input
                                            name="days[]"
                                            id="checker-6"
                                            value={6}
                                            type="checkbox"
                                        />
                                        <label htmlFor="checker-6">Friday</label>
                                    </div>
                                    <div>
                                        <input
                                            name="days[]"
                                            id="checker-7"
                                            value={7}
                                            type="checkbox"
                                        />
                                        <label htmlFor="checker-7">Saturday</label>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <CancelButton
                                    buttonText="Cancel"
                                    buttonClick={() => {
                                        resetForm();
                                    }}
                                />
                                <span style={{marginRight: "10px"}}></span>
                                <AcceptButton
                                    submit
                                    buttonText={editGeofence ? "Update" : "Save"}
                                />
                            </div>
                        </form>
                    </div>
                )}

                <div className="geo-fence-map">
                    <Mapper
                        drawable={!regions.length || addGeofence || editGeofence}
                        isFencing={isFencing}
                        onChange={() => {
                        }}
                        data={regions}
                    />
                </div>
            </div>
            {geofenceTypealert && (
                <div className="modal-wrapper">
                    <div className="backdrop"></div>
                    <div className="modal">
                        <div className="modal-body">
                            By selecting this option you may lose the previous drawn geofence
                        </div>
                        <div className="modal-footer">
              <span style={{marginRight: "10px"}}>
                <CancelButton
                    buttonText="Cancel"
                    buttonClick={() => setGeofenceTypealert(false)}
                />
              </span>
                            <AcceptButton buttonText="Confirm" submit/>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GeoFenceSettings;
