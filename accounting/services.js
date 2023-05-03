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
        const linkedAccounts = AccountsRepository.findLinkedById(accountId)

        const receivableAccount = AccountsRepository.findLinkedById(accountId, "ASSET_RECEIVABLE")
        const expenseTaxAccount = AccountsRepository.findLinkedById(accountId, "EXPENSE")
        const salesAccount = AccountsRepository.findLinkedById(accountId, "LIABILITY")

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
        const receivableAccount = AccountsRepository.findLinkedById(accountId, "ASSET_RECEIVABLE")
        const cashAccount = AccountsRepository.findLinkedById(accountId, "ASSET_CASH")
        const expenseTaxAccount = AccountsRepository.findLinkedById(accountId, "EXPENSE")
        const salesAccount = AccountsRepository.findLinkedById(accountId, "LIABILITY")

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