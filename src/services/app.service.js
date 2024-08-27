import {hideLoading, setAppState, showLoading, USER_TYPE_HASH,} from "../utils/Constants";

import Request from "../utils/Request";
import {catchAuthError} from "../utils";

class AppService {
  type = localStorage.getItem(USER_TYPE_HASH) === "company" ? "company" : "admin";
  all = (page = 1, search = "") =>
    Request().get(`?page=${page}${search && "&search=" + search}`);
  //GET SINGLE
  single = (id) => Request().get(`/${id}`);
  singleTrip = (id) => Request().get(`/${id}`);
  singleAdmin = (id) => Request().get(`auth/${this.type}/users/${id}`);
  singleUser = (id) => Request().get(`auth/${this.type}/users/${id}`);
  singleCompany = (id) => Request().get(`auth/company/view/${id}`);
  singleRider = (id) => Request().get(`/${id}`);

  //CREATE
  addRider = (form_data) =>
    Request().post(`auth/company/onboard/rider`, form_data);
  addUser = (form_data) => Request().post(`auth/user/register`, form_data);
  createCompany = (form_data) =>
    Request().post(`auth/admin/onboard/company`, form_data);
  addAdmin = (form_data) => Request().post(`auth/${this.type}/users/add`, form_data);

  //UPDATE
  updateAdmin = (id, form_data) => Request().post(`auth/${this.type}/users/${id}`, form_data);

  updateRider = (id, form_data) => Request().post(`auth/${this.type}/riders/${id}`, form_data);
  updateTrip = (id, form_data) => Request().post(`ride/trip/request/${id}`, form_data);
  updateCompany = (id, form_data) =>
    Request().post(`auth/company/update/${id}`, form_data);

  //DELETE
  deleteAdmin = (id) => {
    showLoading()
    return Request().delete(`auth/${this.type}/users/${id}`).catch(catchAuthError).finally(hideLoading);
  }
  deleteRider = (id) => Request().delete(`/${id}`);
  deleteUser = (id) => Request().delete(`/${id}`);
  deleteCompany = (id) => Request().delete(`auth/admin/company/${id}`);

  //GET LIST
  listCompanyTrips = (id) => Request().get(`ride/trip/company/${id}`);
  showTrip = (id) => Request().get(`/ride/trip/request/${id}`);
  updateTrip = (id) => Request().post(`/ride/trip/request/${id}`);
  listCompanyRiders = (id) => Request().get(`report/company/${id}/riders`);
  listUserTrips = (id) => Request().get(`ride/trip/user/${id}`);
  listRiderTrips = (id) => Request().get(`report/trip/rider/${id}`);
  listStats = () => Request().get(`report/trip/stats`);
  listCompanies = (page = 1, search = "") => Request().get(`report/company/list?page=${page}${search && "&search=" + search}`);
  listUsers = (page = 1, search = "") => Request().get(`report/user/list?page=${page}${search && "&search=" + search}`);
  listAdmins = (page = 1, search = "") => Request().get(`auth/${this.type}/users?page=${page}${search && "&search=" + search}`);
  getVehicleType = () => Request().get("ride/carrier");
  listTrips = (page = 1, perPage = 10) =>
    Request().get(`report/trip/list?perPage=${perPage}&page=${page}`);

  fetchAllData = () => {
    showLoading();
    this.listCompanies().then(({ data }) =>
      setAppState({ companies: data?.data?.companies || [] })
    );
    this.listAdmins().then(({ data }) =>
      setAppState({ admins: data?.data?.users || [] })
    );
    this.listUsers().then(({ data }) =>
      setAppState({ users: data?.data?.users || [] })
    );
    this.listTrips()
      .then(({ data }) => setAppState({ trips: data?.data?.trips || [] }))
      .catch(catchAuthError)
      .finally(hideLoading);
  };
}


const appServiceInstance = new AppService();

// Export the instance as default
export default appServiceInstance;

// export default new AppService();
