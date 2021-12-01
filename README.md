# This is Automatic Testing Project using Testcafe

## Website I test is coolmate.me
## List of feature that have already been test
- Cart
- Payment
- Search (not done yet)

## Here is the way to setup the environment 

### 1. Install Node
### 2. Install needed dependency
```
$ npm install
```

## After finishing the installation, project is ready to use

## Let me explain a little it about how this project is organized
### 1. File Directory
- All the code file it in test-coolmate.me file
- Data file contains all the data that gonna type on the website
- Helper file contains the common function that been use on the whole project
- Model file contains website elements 
- Report file contains result of a test
- Testcase file contains testcase list that this project test
- Tests file contains all the testing code using Testcafe

### 2. How to run the project
- To run the project 
```
$ npm run entry -- --feature <cart | payment | search>
```
- After finishing the test, to print the report we gonna use .json file in /reports/json
```
$ npm run report -- --feature <cart | payment | search> --report <report file directory> // Drag .json file into terminal, it will auto type file's directory
```
- The report gonna generate at /reports/excel/

# Testcafe is pretty easy to use and I highly recommend it
# Enjoy and have fun!
