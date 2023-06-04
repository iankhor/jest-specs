import AccountingBalanceService, {JournalEntryRepository} from "./AccountingBalanceService"
import je from './journal_entries.json'

describe("AccountingBalanceService", () =>{
    function subject(journalEntries) {
        const jeRepository = new JournalEntryRepository(journalEntries)
        const accountingBalanceService = new AccountingBalanceService(jeRepository)

        return {accountingBalanceService}
    }

    describe("debtor_account()", () =>{
        it("given debtor-1, return balance as at 2023-05-01", () =>{
            const {accountingBalanceService}  = subject(je)
            expect(accountingBalanceService.debtor_account("debtor-1", "2023-05-01")).toEqual({
                entry: "DR",
                amount: 1000
            })
        })


        it("given debtor-1, return balance as at 2023-05-02", () =>{
            const {accountingBalanceService}  = subject(je)
            expect(accountingBalanceService.debtor_account("debtor-1", "2023-05-02")).toEqual({
                entry: "DR",
                amount: 3000
            })
        })

        it("given debtor-1, return balance as at 2023-05-03", () =>{
            const {accountingBalanceService}  = subject(je)
            expect(accountingBalanceService.debtor_account("debtor-1", "2023-05-03")).toEqual({
                entry: "DR",
                amount: 2500
            })
        })

        it("given debtor-2, return balance as at 2023-05-01", () =>{
            const {accountingBalanceService}  = subject(je)
            expect(accountingBalanceService.debtor_account("debtor-2", "2023-05-31")).toEqual({
                entry: "DR",
                amount: 0
            })
        })
    })

    describe("invoice()", () =>{
        it("given invooice-1, return invoice balance as at 2023-05-01", () =>{
            const {accountingBalanceService}  = subject(je)
            expect(accountingBalanceService.invoice("invoice-1", "2023-05-01")).toEqual({
                entry: "DR",
                amount: 1000
            })
        })

        it("given invooice-1, return invoice balance as at 2023-05-03", () =>{
            const {accountingBalanceService}  = subject(je)
            expect(accountingBalanceService.invoice("invoice-1", "2023-05-03")).toEqual({
                entry: "DR",
                amount: 500
            })
        })

        it("given invooice-2, return invoice balance as at 2023-05-03", () =>{
            const {accountingBalanceService}  = subject(je)
            expect(accountingBalanceService.invoice("invoice-2", "2023-05-03")).toEqual({
                entry: "DR",
                amount: 2000
            })
        })
    })
})