# General future direction
    -adding mobile support. I focused 100% on a desktop view, but I know with a bit of tailwindCSS I could have made it doable for mobile too
    -Adding more customization option for the user. For example, editing, deleting transactions and categories
    -Adding label support for better user experience. All it would take was adding 2 inputs and wiring it to the rest of the component
    -Create a more general transaction. An expense and income are extremely similar in that they are both sums of money, but they are negatives of one another. This feels like they should inherit a general Transaction class, but after doing some research it seems like people don't tend to use polymorphism within TypeScript.
    -Add more graphics to the user design such as a piechart contrasting expenses and incomes.
    -I'd like to add more error trapping, maybe with error boundaries around the components with user input


## Assumptions Made:
    -the task asked for several methods to be implemented such as AddIncome(amount), but given the exercise, I had to change the method signature and name. I changed the method signature to add other information such as ID, date, and label. I also changed the name because the income would be added to the list of all transactions after a button was clicked, so the method name is called handleButton or something along those lines. Similar assumption was made for expenses
    -In terms of GetExpenses and GetIncome, I didn't see where I needed to seperate them. I assumed since I never needed to seperate the two, that I didn't need to write the methods, though the methods would be fairly simplistic to write. I would go through my transactions (via context) and filter for the ones that are of type ExpenseTransaction and IncomeTransaction. 
    -Another consideration was checking that the sum of all expenses did not exceed total income: I chose to allow for expenses to exceed total income to make the application more robust. There's nothing technically wrong about having more expenses than income, maybe you didn't enter your income before entering the expenses. Either way, it's more user friendly to allow them to have a negative balance, but alerting the user that they are negative

## Considerations:
    -Error Trapping: whenever there was user-input involved, there was always some kind of failsafe against bad user input entering the transactions object. For example, if the date was after this moment, or the amount was 0, or some information was not filled out, the user could not submit the form to add their information.
    -User Feedback: whenever the user came across the error trapping, I provided a message saying something about their inputs was not right. Furthermore, I provided feedback whenever their transaction successfully went through
    -Pretty UI: I tried to keep the UI as clean, simple, with as few contrasting colors as possible. The UX flow is self-explanatory in my opinion, everything does what you think it does. The only improvement would be on the number input, it was not working well and I would have liked to make it better so it could display comma-seperators and it didn't bug out if the user entered an incorrect value. 
    -Code maintenance in future: all the code is broken down enough to be reusable and changes to be isolated. Components are not strongly coupled together. 

## Enhancements:
    -I would have thought of a better way to do the Home Page because I am not a fan of how the current balance is sitting as a subheader. I would have taken the header out and spaced it better on the bottom right. 
    -In general, I thought I had a lot of space to work with, and with more features I would have liked to fill in some of that empty space