import { ContainerModel } from "./container-model";
import { RecolectionModel } from "./recolection-model";

export interface RecolectionContainerModel {
  id?: number,
  routeId?: number,
  containerId?: number,
  order?: number;
  empty?: boolean,
  container?: ContainerModel,
  recolection?: RecolectionModel
}