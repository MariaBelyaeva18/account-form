export interface Errors {
    type: boolean,
    login: boolean,
    password: boolean,
}
export interface Account {
    id: string | null,
    labels: { text: string | null }[],
    type: string | null,
    login: string | null,
    password: string | null,
    errors: Errors,
}
export interface AccountState {
    data: Account[]
}
