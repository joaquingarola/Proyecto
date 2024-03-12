import { RecolectionModel } from "./recolection-model";
import { RouteModel } from "./route-model";
import { VehicleCenterModel } from "./vehicle-center-model";
import { WasteCenterModel } from "./waste-center-model";

export interface NewRecolectionModel {
  route?: RouteModel,
  recolection?: RecolectionModel[],
  vehicleCenters?: Array<L.LatLngTuple>,
  wasteCenters?: Array<L.LatLngTuple>
}