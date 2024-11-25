export type ClientType = {
  id: number;
  name: string;
  email: string;
  job: string;
  rate: number;
  isactive: boolean;
}

export type NewClientType = Omit<ClientType, 'id'>;