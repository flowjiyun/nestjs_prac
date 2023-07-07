// typescript enum
export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}
// typescript interface
export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}