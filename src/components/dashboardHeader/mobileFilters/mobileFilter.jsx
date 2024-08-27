import "./styles.scss";
import FilterTeam from "../filterTeams/filterTeams";
import FilterDate from "../FilterDateTime/FilterDateTime";
import MarketPlace from "../marketPlace/marketPlace";
import React, {useContext, useState} from "react";
import {useLocation} from "react-router-dom";
import RegularButton from "../../generalButton/RegularButton";
import {CustomerContext} from "../../../context/customerContext/customerContext";
import DropdownFilter from "../../dropdownFilter/dropdownFilter";
import {PostsContext} from "../../../context/postContext/postContext";
import {CharityContext} from "../../../context/charityContext/charityContext";
import {DonationsContext} from "../../../context/donationsContext/donationContext";
import {ADMINS, CUSTOMERS, LOGISTICS, RIDERS} from "../../../routes";

const MobileFilters = () => {
  const location = useLocation();
  const {
    setAddCustomerModal,
    headerFilter,
    setHeaderFilter,
    setAddCustomerAnimation
  } = useContext(CustomerContext);

  const { setAddPostModal, setAddPostAnimation } = useContext(PostsContext);

  const { setAddCharityModal, setAddCharityModalAnimation } =
    useContext(CharityContext);

  const { setAddDonationsModal, setAddDonationModalAnimation } =
    useContext(DonationsContext);

  const [modal, setModal] = useState(false);

  return (
    <div className="mobile-filter-dropdown">
      <div className="filter-btn" onClick={() => setModal(!modal)}>
        <span className="material-icons-outlined">filter_alt</span>
      </div>

      {modal && (
        <React.Fragment>
          {/* DASHBOARD */}
          {location.pathname === "/dashboard" ||
          location.pathname === "/dashboard/" ? (
            <div className="filter-dropdown">
              <div className="date">
                <FilterDate />
              </div>
              <div className="team">
                <FilterTeam />
              </div>
              <div className="market-place-wrapper">
                <MarketPlace />
              </div>
            </div>
          ) : (
            ""
          )}

          {/* COSTOMERS */}
          {location.pathname === CUSTOMERS ||
          location.pathname === `${CUSTOMERS}/` ? (
            <div className="filter-dropdown">
              <DropdownFilter
                options={["All Customers", "Form Users Only"]}
                selectOption={e => setHeaderFilter(e.target.innerText)}
                backdrop={false}
                optionSelected={headerFilter}
              />
              <RegularButton
                buttonText="Add Customer"
                buttonClick={() => {
                  setAddCustomerAnimation(true);
                  setAddCustomerModal(true);
                }}
              />
            </div>
          ) : (
            ""
          )}

          {/* POSTS */}
          {location.pathname === LOGISTICS || location.pathname === `${LOGISTICS}/` ? (
            <div className="filter-dropdown">
              <RegularButton
                buttonText="Add New Post"
                buttonClick={() => {
                  setAddPostModal(true);
                  setAddPostAnimation(true);
                }}
              />
            </div>
          ) : (
            ""
          )}

          {/* CHARITY */}
          {location.pathname === RIDERS ||
          location.pathname === `${RIDERS}/` ? (
            <div className="filter-dropdown">
              <RegularButton
                buttonText="Add New Charity"
                buttonClick={() => {
                  setAddCharityModal(true);
                  setAddCharityModalAnimation(true);
                }}
              />
            </div>
          ) : (
            ""
          )}

          {/* DONATION */}
          {location.pathname === ADMINS ||
          location.pathname === `${ADMINS}/` ? (
            <div className="filter-dropdown">
              <RegularButton
                buttonText="Add New Donation"
                buttonClick={() => {
                  setAddDonationsModal(true);
                  setAddDonationModalAnimation(true);
                }}
              />
            </div>
          ) : (
            ""
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default MobileFilters;
