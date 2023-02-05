import { transactionType } from "./transaction"

export type userType = {
    username: string;
    password: string;
    accountValue: number;
    transactions: Array<transactionType>;
}

export const buildNewUser = (username: string, password: string) => {
    let newUser = {} as userType;
    newUser.username = username;
    newUser.password = password;
    newUser.accountValue = 0;
    newUser.transactions = [];
    return newUser;
}