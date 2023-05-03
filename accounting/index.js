const {DebtorService, CashService, AccountingService} = require('./services')

const debtor = new DebtorService()
const cash = new CashService()
const accounting = new AccountingService()

console.log("pre-payment")
console.log(`receive cash 1000`)
cash.receipt(1000, "foobar-123")

console.log('debtor account balance excluding tax', accounting.balance("foobar-123"))
console.log('debtor account balance tax component', accounting.balance("foobar-456"))

console.log("\n")


console.log(`charge 1000`)
debtor.charge(1000, "foobar-123")

console.log('debtor account balance excluding tax', accounting.balance("foobar-123"))
console.log('debtor account balance tax component', accounting.balance("foobar-456"))

console.log("-----------------------\n")


console.log("normal payment")
console.log(`charge 1000`)
debtor.charge(1000, "foobar-123")

console.log('debtor account balance excluding tax', accounting.balance("foobar-123"))
console.log('debtor account balance tax component', accounting.balance("foobar-456"))

console.log("\n")

console.log(`receive cash 1000`)
cash.receipt(1000, "foobar-123")

console.log('account balance excluding tax', accounting.balance("foobar-123"))
console.log('debtor account balance tax component', accounting.balance("foobar-456"))

console.log("-----------------------\n")

console.log("over payment")
console.log(`charge 1000`)
debtor.charge(1000, "foobar-123")

console.log('debtor account balance excluding tax', accounting.balance("foobar-123"))
console.log('debtor account balance tax component', accounting.balance("foobar-456"))

console.log("\n")

console.log(`receive cash 5000`)
cash.receipt(5000, "foobar-123")
console.log('account balance excluding tax', accounting.balance("foobar-123"))
console.log('debtor account balance tax component', accounting.balance("foobar-456"))

console.log("-----------------------\n")

