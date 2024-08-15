export interface CitizenCommentModel {
  id?: number,
  name: string,
  email: string,
  city: string,
  address: string,
  comment: string,
  date?: Date,
}