import { ChartDataModel } from "./chart-data.model";

export interface DamageStatsModel {
  labels: string[],
  vehicle: ChartDataModel,
  container: ChartDataModel
}