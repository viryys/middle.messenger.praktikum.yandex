export type Nullable<T> = T | null;

export type Props = Record<string, any>;
export type Keys<T extends Record<string, unknown>> = keyof T;
export type Values<T extends Record<string, unknown>> = T[Keys<T>];
export type BodyRequest = Record<string, any>;

export type Event = {
  [k: string]: any
};

export interface ValidateMsg {
  validate: boolean,
  message: string
}

export interface SignInProps {
  login: string;
  password: string;
}

export interface SignUpProps {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface ChangeProfileProps {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface ChangePasswordProps {
  oldPassword: string;
  newPassword: string;
}

export interface CreateChatProps {
  title: string;
}

export interface DeleteChatProps {
  chatId: number;
}

export interface AddUsersToChatProps {
  users: number[];
  chatId: number;
}

export interface DeleteUsersFromChatProps {
  users: number[];
  chatId: number;
}

export interface FindUserProps {
  login: string;
}
