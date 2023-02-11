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
  rol: string;
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
