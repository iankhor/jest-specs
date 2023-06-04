import { isBefore, isEqual } from "date-fns"
import {sumBy} from 'lodash'

class JournalEntryRepository {
    constructor(je) {
        this.je = je
    }

    findCreatedAtTillDate(date) {
        return this.je.filter(je => {
            return isBefore(new Date(je.createdAt), new Date(date)) || isEqual(new Date(je.createdAt), new Date(date))
        })
    }

    findByDocument(id) {
        return this.je.find(je => je.document === id)
    }
}

function sumByDebit(journalLines) {
    return journalLines.entryType === "DR" ? journalLines.amount : 0
}

function sumByCredit(journalLines) {
    return journalLines.entryType === "CR" ? journalLines.amount : 0
}

function calculateBalance(journalLines) {
    const debits = sumBy(journalLines, sumByDebit)
    const credits = sumBy(journalLines, sumByCredit)
    const outstanding = debits - credits

    return {
        entry: outstanding >= 0 ? "DR" : "CR",
        amount: outstanding
    }
}

class AccountingBalanceService {
    constructor(jeRepository = new JournalEntryRepository()) {
        this.jeRepository = jeRepository
    }

    debtor_account(accountId, date) {
        const journalEntries = this.jeRepository.findCreatedAtTillDate(date)
        const journalLines = journalEntries
                                .flatMap(je => je.lines)
                                .filter(jl => jl.accountId === accountId)

        return calculateBalance(journalLines)
    }

    invoice(id, date) {
        const invoiceJournalEntry = this.jeRepository.findByDocument(id)
        const journalId = invoiceJournalEntry.id

        const journalEntries = this.jeRepository.findCreatedAtTillDate(date)
        const journalLines = journalEntries
                                .flatMap(je => je.lines)
                                .filter(jl => jl.referenceJournalId === journalId)

        return calculateBalance(journalLines)
    }

}

export default AccountingBalanceService
export { JournalEntryRepository }