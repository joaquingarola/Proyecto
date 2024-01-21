import { ZoneModel } from "./zone-model";

export interface ContainerModel {
  id?: number,
  latitude: number,
  longitude: number,
  capacity: number,
  address: string,
  wasteType: string,
  lastEmptying: Date,
  status: string,
  zoneId: number,
  zone?: ZoneModel
}