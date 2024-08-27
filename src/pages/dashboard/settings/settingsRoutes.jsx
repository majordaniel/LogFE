import {SURGE} from "../../../routes";
import Surge from "./surge/surge";

export const settingsRoute = [
  // {
  //   name: "Geo Fence",
  //   path: GEO_FENCE,
  //   component: GeoFence,
  //   exact: true
  // },
  // {
  //   name: "Auto Allocation",
  //   path: AUTO_ALLOCATION,
  //   component: AutoAllocation,
  //   exact: true
  // },
  // {
  //   name: "Access Controls",
  //   path: ACCESS_CONTROL,
  //   component: AccessControls,
  //   exact: true
  // },
  {
    name: "Surge",
    path: SURGE,
    component: Surge,
    exact: true
  }
];
