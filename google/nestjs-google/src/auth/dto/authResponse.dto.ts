import { User } from "../../user/entities/user.entity";

export class AuthResponseDto {
    user: User;
    token: string;
}