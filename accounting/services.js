const {AccountsRepository, JournalEventsRepository} = require('./respositories')
const {sumBy} = require('lodash')

class AccountingService {
    balance(accountId, date = "2099-12-31") {
        const account = AccountsRepository.findById(accountId)
        const events = JournalEventsRepository.findAllByAccountId(accountId, "asc", date)

        const debits = events.filter(e => e.action === 'debit')
        const credits = events.filter(e => e.action === 'credit')

        const calculateDebitAccounts = () => sumBy(debits, 'amount') - sumBy(credits, 'amount')
        const calculateCreditAccounts = () => sumBy(credits, 'amount') - sumBy(debits, 'amount')
        
        const accountType = {
            "ASSET_RECEIVABLE": calculateDebitAccounts,
            "ASSET_CASH": calculateDebitAccounts,
            "EXPENSE": calculateDebitAccounts,
            "LIABILITY":  calculateCreditAccounts
        }

        return accountType[account.type]()
    }
}

class DebtorService {
    charge(amount, accountId) {
        const linkedAccountIds = AccountsRepository.findLinkedById(accountId).linkedAccountIds
        const linkedAccounts = AccountsRepository.findAllByIds(linkedAccountIds)

        const receivableAccount = linkedAccounts.find(a => a.type === "ASSET_RECEIVABLE")
        const expenseTaxAccount = linkedAccounts.find(a => a.type === "EXPENSE")
        const salesAccount = linkedAccounts.find(a => a.type === "LIABILITY")

        const taxRate = 0.1
        const amountTaxExclusive = amount / (1 + taxRate)
        const taxAmount = amount - amountTaxExclusive

        JournalEventsRepository.create([
            {
                "date": "2023-05-01",
                "eventType": "Charges",
                "accountId": receivableAccount.id,
                "amount": amountTaxExclusive,
                "action": "debit"
              },
              {
                "date": "2023-05-01",
                "eventType": "Charges",
                "accountId": expenseTaxAccount.id,
                "amount": taxAmount,
                "action": "debit"
              },
              {
                "date": "2023-05-01",
                "eventType": "Charges",
                "accountId": salesAccount.id,
                "amount": amount,
                "action": "credit"
              }
        ])
    }
}

class CashService {
    receipt(amount, accountId) {
        const linkedAccountIds = AccountsRepository.findLinkedById(accountId).linkedAccountIds
        const linkedAccounts = AccountsRepository.findAllByIds(linkedAccountIds)

        const receivableAccount = linkedAccounts.find(a => a.type === "ASSET_RECEIVABLE")
        const cashAccount = linkedAccounts.find(a => a.type === "ASSET_CASH")
        const expenseTaxAccount = linkedAccounts.find(a => a.type === "EXPENSE")
        const salesAccount = linkedAccounts.find(a => a.type === "LIABILITY")

        const taxRate = 0.1
        const amountTaxExclusive = amount / (1 + taxRate)
        const taxAmount = amount - amountTaxExclusive

        JournalEventsRepository.create([
            {
                "date": "2023-05-31",
                "eventType": "CashReceipt",
                "accountId": cashAccount.id, 
                "amount": amount,
                "action": "debit"
            },
            {
                "date": "2023-05-31",
                "eventType": "CashReceipt",
                "accountId": receivableAccount.id,
                "amount": amountTaxExclusive,
                "action": "credit"
            },
            {
                "date": "2023-05-31",
                "eventType": "CashReceipt",
                "accountId": expenseTaxAccount.id,
                "amount": taxAmount,
                "action": "credit"
            },
            {
                "date": "2023-05-31",
                "eventType": "CashReceipt",
                "accountId": salesAccount.id,
                "amount": amount,
                "action": "debit"
            }
        ])
    }
    
}

module.exports = {
 DebtorService, CashService, AccountingService  
}