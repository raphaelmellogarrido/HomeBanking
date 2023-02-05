export type transactionType = {
    id: string,
    value: number,
    date: Date,
    type: "deposit" | "withdrawal"
}

export const buildNewTransaction = (value: number, type: "deposit" | "withdrawal") => {
    let transaction = {} as transactionType;
    transaction.id = crypto.randomUUID();
    transaction.value = value;
    transaction.date = new Date();
    transaction.type = type;
    return transaction;
}