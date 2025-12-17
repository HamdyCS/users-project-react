import UserDto from "./UserDto";

export default interface LoginResponseDto {
  data: {
    user: UserDto;
    token: string;
  };
}

