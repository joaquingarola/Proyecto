import { ZoneModel } from "./zone-model";

export interface ContainerModel {
  id?: number,
  latitude: number,
  longitude: number,
  capacity: number,
  wasteType: string,
  lastEmptying: Date,
  status: string,
  zoneId: number,
  zone?: ZoneModel
}