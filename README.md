# LOAN APPLICATION PORTAL

## Overview: 
This is a application basically designed for managing loan application.

## Key Features:
a. Add a new loan applicantion with entire details of applicant and pricing.
b. Edit existing loan application.
c. Delete loan application.
d. view the details of individual applicant along with its loan & pricing details showing EMI/tenureMonth.
e. Search option to filter the table.
f. Basic UI design to look organised with input form validations

## Design Decision:
a. Angular standalone component: each major feature (loan-form, loan-list, loan-details, pricing-form-> nested in loan-form) is     implemented as standalone component.
b. NGXS State management: application's state is managed via ngxs, allowing easy state tracking and updates. action like addLoan, Updateloan, RemoveLoan, LoadInitial
c. Signals are used to handle reactive UI updates, that includes EMI Computations and filtered lists.
d. Input form validators: it ensures that all fields are correctly field before submitting form.
e. The data persists in local storage.
f. Basic Styling to look organized where card layout for laon-details and table/grid type to show data and buttons for navigation.

## How you can run it locally?

1. Clone the repository using : git clone https://github.com/Aastha-41/Loan-Application-Portal.git
                                cd Loan-Application-Portal

2. Now, install the required dependencies using : npm install

3. Then, Run the angular server using : ng serve

4. In Browser you can visit http://localhost:4200/ to access the application.




