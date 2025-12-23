import UserDto from "./UserDto";

export default interface RefreshTokenResponseDto {
  user: UserDto;
  token: string;
}
