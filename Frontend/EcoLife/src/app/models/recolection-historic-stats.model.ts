import { ChartDataModel } from "./chart-data.model";

export interface RecolectionHistoricStats {
  labels: string[],
  finalized: ChartDataModel,
  canceled: ChartDataModel
}