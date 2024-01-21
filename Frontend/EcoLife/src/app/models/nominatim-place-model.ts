import { NominatimAddressModel } from './nominatim-address-model';
import { NominatimExtratagsModel } from './nominatim-extratags-model';

export interface NominatimPlaceModel {
  place_id: string,
  licence: string,
  osm_type: string,
  osm_id: string,
  boundingbox: string[],
  lat: string,
  lon: string,
  display_name: string,
  class: string,
  type: string,
  importance: number,
  icon: string,
  address: NominatimAddressModel,
  extratags: NominatimExtratagsModel
}