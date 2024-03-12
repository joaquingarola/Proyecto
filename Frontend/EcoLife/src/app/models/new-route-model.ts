import { ContainerModel } from "./container-model";
import { RouteModel } from "./route-model";

export interface NewRouteModel {
  route?: RouteModel,
  containers: ContainerModel[],
  containersWithoutRoute: Array<L.LatLngTuple>
}