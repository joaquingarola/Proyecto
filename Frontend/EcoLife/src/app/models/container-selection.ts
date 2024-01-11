import { ContainerModel } from "./container-model";

export interface ContainerSelection {
  selectedContainer?: ContainerModel,
  othersContainers?: Array<ContainerModel>
}