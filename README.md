# Monefy Test Plan Sample:

## Introduction:
I will take a top-down approach in order to identify and prioritize test cases needed to test the Monefy App.

## Testing Logic:

Each `user` has 1 or more `accounts`, and each account has a `balance` that is affected by the initial balance amount and the accumalation of `transactions`. `Transactions`  are classified according to whether they are `incomes` or `expenses` and then according to their `category`, `date` and `currency`

A user must be able to view all accounts or single account for certain period of time and manage expenses/incomes by adding transactions and viewing their balance accordingly. 


Since the app consists Basic Users who should be able to do a subset of what Member Users can do, I will split test cases into 2 main criteria:

## 1) Basic Users Scenarios: (Flows that affect both basic users and member users and sorted by priority)	
### Highest Priority:
	- Test ability to add accounts
	- Test ability to add initial account balance
	- Test that user balance matches accumilation of account balances
	- Test ability to view single account or all accounts
	- Test ability to add/delete transactions
	- Test that transactions reflect correctly on balance (incomes vs expenses) for account
	- Test that transactions are categorized correctly
	- Test that no transactions outside selected time period are shown (example: transactions outside current week when viewing weekly balance)
	- Test that basic users can't access member user features
	- Test ability to change currency
	- Test ability to switch from normal account to member account

### Medium Priority:
	- Test that multiple transactions with same category are grouped together in certain period of time
	- Test ability export data to file
	- Test ability to add transactions in different currencies
	- Test ability to edit/add expense categories
	- Test ability to edit/add income categories
	- Make sure graph correctly shows breakdown of transactions

### Low Priority: 
	- Test ability to edit first day of the week
	- Test ability to edit first day of the month



## 2) Member Users Flows:
### Highest Priority:
	- Test ability to create and track multi-currency accounts
	- Test account synchronization across multiple device
	- Test adding a passcode for the account
	- Test cases where wrong passcodes are added
	- Test widgets functionality
		- Data correctness
		- Customization
		- Widget Appearance