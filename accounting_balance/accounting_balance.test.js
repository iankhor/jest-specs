import AccountingBalanceService, {JournalEntryRepository} from "./AccountingBalanceService"
import example1 from './journal_entries_example1.json'

describe("AccountingBalanceService", () =>{
    function subject(journalEntries) {
        const jeRepository = new JournalEntryRepository(journalEntries)
        const accountingBalanceService = new AccountingBalanceService(jeRepository)

        return {accountingBalanceService}
    }

    describe("debtorAccount()", () =>{
        it("given debtor-1, return balance as at 2023-05-01", () =>{
            const {accountingBalanceService}  = subject(example1)
            expect(accountingBalanceService.debtorAccount("debtor-1", "2023-05-01")).toEqual({
                entry: "DR",
                amount: 1000
            })
        })


        it("given debtor-1, return balance as at 2023-05-02", () =>{
            const {accountingBalanceService}  = subject(example1)
            expect(accountingBalanceService.debtorAccount("debtor-1", "2023-05-02")).toEqual({
                entry: "DR",
                amount: 3000
            })
        })

        it("given debtor-1, return balance as at 2023-05-03", () =>{
            const {accountingBalanceService}  = subject(example1)
            expect(accountingBalanceService.debtorAccount("debtor-1", "2023-05-03")).toEqual({
                entry: "DR",
                amount: 2500
            })
        })

        it("given debtor-2, return balance as at 2023-05-01", () =>{
            const {accountingBalanceService}  = subject(example1)
            expect(accountingBalanceService.debtorAccount("debtor-2", "2023-05-31")).toEqual({
                entry: "DR",
                amount: 0
            })
        })
    })

    describe("invoice()", () =>{
        it("given invoice-1, return balance as at 2023-05-01", () =>{
            const {accountingBalanceService}  = subject(example1)
            expect(accountingBalanceService.invoice("invoice-1", "2023-05-01")).toEqual({
                entry: "DR",
                amount: 1000
            })
        })

        it("given invoice-1, return balance as at 2023-05-03", () =>{
            const {accountingBalanceService}  = subject(example1)
            expect(accountingBalanceService.invoice("invoice-1", "2023-05-03")).toEqual({
                entry: "DR",
                amount: 1000
            })
        })

        it("given invoice-1, return balance as at 2023-05-04", () =>{
            const {accountingBalanceService}  = subject(example1)
            expect(accountingBalanceService.invoice("invoice-1", "2023-05-04")).toEqual({
                entry: "DR",
                amount: 500
            })
        })

        it("given invoice-2, return invoice balance as at 2023-05-03", () =>{
            const {accountingBalanceService}  = subject(example1)
            expect(accountingBalanceService.invoice("invoice-2", "2023-05-03")).toEqual({
                entry: "DR",
                amount: 2000
            })
        })
    })

    describe("cashReceipt()", () =>{
        it("given cash-1, return balance as at 2023-05-01", () =>{
            const {accountingBalanceService}  = subject(example1)
            expect(accountingBalanceService.cashReceipt("cash-1", "2023-05-01")).toEqual({
                entry: "DR",
                amount: 0
            })
        })

        it("given cash-1, return balance as at 2023-05-03", () =>{
            const {accountingBalanceService}  = subject(example1)
            expect(accountingBalanceService.cashReceipt("cash-1", "2023-05-03")).toEqual({
                entry: "CR",
                amount: 500
            })
        })

        it("given cash-1, return balance as at 2023-05-04", () =>{
            const {accountingBalanceService}  = subject(example1)
            expect(accountingBalanceService.cashReceipt("cash-1", "2023-05-04")).toEqual({
                entry: "DR",
                amount: 0
            })
        })

    })
})