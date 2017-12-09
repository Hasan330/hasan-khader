# Steps to run the project

1) Make sure you have node installed
2) Install mocha
3) Run `npm test`


# Testing Approach:
The approach will be split into 2 main criteria:

## a. Testing data-related endpoints, this includes testing the following: 
1) Checking API endpoints sanity (up and running)
2) Ensuring data retrieval ability
3) Ensuring data schema matches proposed schema
4) Checking ability to manipulate data
This will be done in a `build-up` then `teardown` fashion to ensure we don't flood the database with testing data (The data that is added will be deleted by the end of the test-case)
	- Add a field and check it was added
	- Update a field and make sure it was updated
	- Delete a field and make sure it no longer exists
5) Checking data validity

I will apply this approach to the `Products` route, the same approach can be replicated for `Categories, Stores and Services` routes.

## b. Testing application health:
1) Making sure app is up and running
2) Checking `health-check` schema
3) Checking consistency of data displayed (by checking that it matches the total number of data in the endpoints)
