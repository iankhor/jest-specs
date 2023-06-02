class JournalEntryRepository {

}


class AccountingBalanceService {
    constructor(jeRepository = new JournalEntryRepository()) {
        this.jeRepository = jeRepository
    }

    debtor_account() {
        return 2
    }

}

export default AccountingBalanceService