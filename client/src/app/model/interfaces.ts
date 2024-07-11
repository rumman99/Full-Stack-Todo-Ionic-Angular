export interface TodoResponse{
  statusCode: number;
  data: Todos[];
  message: string;
  success: boolean;
}

export interface Todos {
  _id: string;
  task: string;
  status: string;
  assignTo: string;
  __v: number;
}