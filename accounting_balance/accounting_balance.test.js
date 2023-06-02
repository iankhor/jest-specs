import AccountingBalanceService from "./AccountingBalanceService"

describe("AccountingBalanceService", () =>{
    it("debtor_account()", () =>{
        const accountingBalance = new AccountingBalanceService()
        expect(accountingBalance.debtor_account("debtor-1")).toEqual({
            entry: "DR",
            amount: "2500"
        })
    })
})