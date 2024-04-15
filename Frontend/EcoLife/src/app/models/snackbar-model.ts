export enum SnackbarType {
  Success = 'success',
  Error = 'error'
}

export interface SnackbarModel {
  type: SnackbarType,
  text: string
}