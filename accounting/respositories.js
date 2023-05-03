const accounts = [
    {
        "id": "foobar-123",
        "name": "Debtor A Charges",
        "type": "ASSET_RECEIVABLE"
    },
    {
        "id": "foobar-456",
        "name": "Debtor A Charges - Tax",
        "type": "EXPENSE"
    },
    {
        "id": "foobar-859",
        "name": "Debtor A Unearned Revenue (Sales)",
        "type": "LIABILITY"
    },
    {
        "id": "foobar-999",
        "name": "Bank Account",
        "type": "ASSET_CASH"
    }
  ]

const linkedAccounts = [
    {
        id: "foobar-123",
        linkedAccountIds: ["foobar-123", "foobar-456", "foobar-859", "foobar-999"]
    }
]

const journalsEvents = []

function sortAscending(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
}

function sortDescending(a, b) {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
}

class AccountsRepository {
    static findById(id) {
        return accounts.find(a => a.id === id)
    }

    static findAllByIds(ids) {
        return accounts.filter(a => ids.includes(a.id))
    }

    static findLinkedById(id, type = "") {
        const linkedAccountIds = linkedAccounts.find(a => a.id === id).linkedAccountIds

        return type === '' ? this.findAllByIds(linkedAccountIds) : this.findAllByIds(linkedAccountIds).find(a => a.type === type)
    }
}


class JournalRepository {
    static create(events = []) {
        journalsEvents.push(...events)
    }

    static findByType(type) {
        return journalsEvents.find(e => e.eventType === type)
    }

    static findAllByAccountId(id, order = 'asc', at = "2099-12-31") {
        return journalsEvents
                .filter(e => e.accountId === id)
                .sort(order === 'asc' ? sortAscending : sortDescending)
                .filter(e => {
                    const date = new Date(e.date)
                    const cutoff = new Date(at)
                    return date <= cutoff
                })
    }
}

module.exports = {AccountsRepository, JournalRepository}