export interface RecolectionTopStats {
  topEmployees: TopEmployee[],
  topVehicles: TopVehicle[]
}

export interface TopEmployee {
  name: string,
  quantity: number,
}

export interface TopVehicle {
  patent: string,
  description: string,
  quantity: number,
}
