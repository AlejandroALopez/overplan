
export interface IRegisterInput {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export interface IRegisterOutput {
    success: boolean,
    message?: string,
    token: string | null,
}