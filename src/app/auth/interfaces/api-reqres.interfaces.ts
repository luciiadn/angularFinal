export interface LogginForm {
  email: string;
  password: string;
  rol: string;
}
export interface LogginSuccessful {
  token: string;
}
export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
  telephone_number: string;
  rol: string;
  created_at?: number;
  id?: string;
}

export interface UserDto {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    fullname?: string;
  };
  support: {
    url: string;
    text: string;
  };
}
