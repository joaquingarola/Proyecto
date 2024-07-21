import { RecolectionContainerModel } from "./recolection-container-model";
import { VehicleCenterModel } from "./vehicle-center-model";
import { WasteCenterModel } from "./waste-center-model";

export interface RecolectionView {
  vehicleCenter: VehicleCenterModel,
  wasteCenter: WasteCenterModel,
  status: string,
  containers: RecolectionContainerModel[]
}