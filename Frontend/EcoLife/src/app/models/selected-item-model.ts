export enum SelectedItemType {
  Container,
  ContainerDisabled,
  VehicleCenter,
  VehicleCenterDisabled,
  WasteCenter,
  wasteCenterDisabled
}

export interface SelectedItem {
  itemCoords?: L.LatLngTuple,
  type: SelectedItemType
}

export interface OtherItems {
  itemsCoords?: Array<L.LatLngTuple>,
  type: SelectedItemType
}