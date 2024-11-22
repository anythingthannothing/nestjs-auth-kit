import { tags } from 'typia';

export interface ISignUpReqDto {
  email: string &
    tags.Pattern<'^(?=.{10,254}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'> &
    tags.MinLength<10> &
    tags.MaxLength<60>;
  password: string & tags.MinLength<10> & tags.MaxLength<64>;
}
