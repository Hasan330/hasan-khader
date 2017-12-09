# Monefy Test Plan Sample:

## Introduction:
I will take a top-down approach in order to identify and prioritize test cases needed to test the Monefy App.

## Testing Logic:

Each `user` has 1 or more `accounts`, and each account has a `balance` that is affected by the initial balance amount and the accumalation of `transactions`. `Transactions`  are classified according to whether they are `incomes` or `expenses` and then according to their `category`, `date` and `currency`

A user must be able to view all accounts or single account for certain period of time and manage expenses/incomes by adding transactions and viewing their balance accordingly. 


Since the app consists Basic Users who should be able to do a subset of what Member Users can do, I will split test cases into 2 main criteria:

1) Basic Users Flows:
Are flows that affect both basic users and member users and they work as follows:
	- Since



2) Membr Users FLows:
Are the subset of test cases that are related to member users which basic users shouln't be able to access unless they become members



