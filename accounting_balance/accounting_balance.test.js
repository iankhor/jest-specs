import AccountingBalanceService, {JournalEntryRepository} from "./AccountingBalanceService"
import example1 from './journal_entries_example1.json'

describe("AccountingBalanceService", () =>{
    function subject(journalEntries) {
        const jeRepository = new JournalEntryRepository(journalEntries)
        const accountingBalanceService = new AccountingBalanceService(jeRepository)

        return {accountingBalanceService}
    }

    describe("debtorAccount()", () =>{
        test.each`
        documentId    |  asAt            | entry   | amount
        ${"debtor-1"} | ${"2023-05-01"}  | ${"DR"} | ${1000}
        ${"debtor-1"} | ${"2023-05-02"}  | ${"DR"} | ${3000}
        ${"debtor-1"} | ${"2023-05-03"}  | ${"DR"} | ${2500}
        ${"debtor-2"} | ${"2023-05-31"}  | ${"DR"} | ${0} 
        `('given $documentId, returns balance of $entry: $amount as at $asAt', ({documentId, asAt, entry, amount}) => {
            const {accountingBalanceService}  = subject(example1)
            expect(accountingBalanceService.debtorAccount(documentId, asAt)).toEqual({
                entry,
                amount
            })
        });
    })

    describe("invoice()", () =>{
        test.each`
            documentId    |  asAt            | entry   | amount
            ${"invoice-1"} | ${"2023-05-01"} | ${"DR"} | ${1000}
            ${"invoice-1"} | ${"2023-05-03"} | ${"DR"} | ${1000}
            ${"invoice-1"} | ${"2023-05-04"} | ${"DR"} | ${500}
            ${"invoice-2"} | ${"2023-05-01"} | ${"DR"} | ${0}
            ${"invoice-2"} | ${"2023-05-02"} | ${"DR"} | ${2000}
            ${"invoice-2"} | ${"2023-05-03"} | ${"DR"} | ${2000}
        `('given $documentId, returns balance of $entry: $amount as at $asAt', ({documentId, asAt, entry, amount}) => {
            const {accountingBalanceService}  = subject(example1)
            expect(accountingBalanceService.invoice(documentId, asAt)).toEqual({
                entry,
                amount
            })
        });
    })

    describe("cashReceipt()", () =>{
        test.each`
            documentId    |  asAt           | entry   | amount
            ${"cash-1"}   | ${"2023-05-01"} | ${"DR"} | ${0}
            ${"cash-1"}   | ${"2023-05-03"} | ${"CR"} | ${500}
            ${"cash-1"}   | ${"2023-05-04"} | ${"DR"} | ${0}

        `('given $documentId, returns balance of $entry: $amount as at $asAt', ({documentId, asAt, entry, amount}) => {
            const {accountingBalanceService}  = subject(example1)
            expect(accountingBalanceService.cashReceipt(documentId, asAt)).toEqual({
                entry,
                amount
            })
        });
    })
})