const {DebtorService, CashService, AccountingService} = require('./services')

const debtor = new DebtorService()
const cash = new CashService()
const accounting = new AccountingService()

const chargeAmount = 1000
const cashReceived = 500

console.log(`charge ${chargeAmount}`)
debtor.charge(chargeAmount, "foobar-123")
console.log('debtor account balance excluding tax', accounting.balance("foobar-123"))
console.log('debtor account balance tax component', accounting.balance("foobar-456"))

console.log("\n")

console.log(`receive cash  ${cashReceived}`)
cash.receipt(cashReceived, "foobar-123")
console.log('account balance excluding tax', accounting.balance("foobar-123"))
console.log('debtor account balance tax component', accounting.balance("foobar-456"))
