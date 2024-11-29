import { tags } from 'typia';

export interface IGoogleLoginReqDto {
  googleId: string & tags.MinLength<1> & tags.MaxLength<60>;
  email: string &
    tags.Pattern<'^(?=.{10,254}$)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'> &
    tags.MinLength<10> &
    tags.MaxLength<60>;
  picture: string & tags.MinLength<10> & tags.MaxLength<1024>;
  givenName?: string & tags.MinLength<1> & tags.MaxLength<30>;
  familyName?: string & tags.MinLength<1> & tags.MaxLength<30>;
}
