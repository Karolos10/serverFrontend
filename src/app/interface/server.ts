import { Status } from "../enum/status.enum";

export interface Server{
  id: number;
  ipAddress: string;
  name: string;
  memory: number;
  type: string;
  imageUrl: string;
  status: Status;
}
