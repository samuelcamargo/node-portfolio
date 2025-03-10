export interface AuthRequestDTO {
    username: string;
    password: string;
}

export interface AuthResponseDTO {
    token: string;
    expire_in: number;
} 