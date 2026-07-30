const { type } = require("os");
const readline = require("readline");

const rl = readline.createInterface({
    input: process. stdin,
    output: process.stdout
});

let accounts_array = [];

function showMenu(){
    console.log("====Bank Management System");
    console.log("1: Craete Account");
    console.log("2: View Account");
    console.log("3: Deposit Money");
    console.log("4: Withdraw Money");
    console.log("5: Check balance");
    console.log("6: Transaction history");
    console.log("7: Exit");
}
let accountnumber = 1001;
    function createAccount(){
        
        rl.question("Enter Your Name" , (name) =>{
            let username = name;
            rl.question("Enter your intial balance" , (balance) => {
                let initial_balance = Number(balance);
                if(isNaN(initial_balance) || initial_balance < 0){
                    console.log("You cannot create account with no balance");
                    showMenu();
                    recallApi();
                    return;
                }else{
                    let accounts_Object = {
                        Acc_num : accountnumber,
                        Acc_name : username,
                        Acc_balance : initial_balance,
                        Acc_transactions : []
                    };

                        accounts_array.push(accounts_Object);
                        accountnumber++;
                        console.log("Your Account is created succesfully");
                        showMenu();
                        recallApi();
                    }
                

            })
        })
    }



    function viewAccount(){
        rl.question("Enter Account Number" , (input) =>{
            let found = false;
            let input_num = Number(input);
            if(isNaN(input_num)){
                console.log("Please enter numbers only");
                viewAccount();
                return;
            }
            for(let account of accounts_array){
                if(input_num == account.Acc_num){
                    found = true;
                    console.table(account);
                    showMenu();
                    recallApi();
                    return;
                }
            }
                if(found == false){
                    console.log("No account found");
                    showMenu();
                    recallApi();
                }
        })
    }
    
    
    
    
    function depositMoney(){
        rl.question("Enter Your Account Number" , (input)=>{
            let found = false;
            let accountinput = Number(input);
            if(isNaN(accountinput)){
                console.log("Enter account number in numbers only");
                depositMoney();
                return;
            }
            rl.question("Enter amount to deposit" , (input)=>{
                let depositamount = Number(input);
                if(isNaN(depositamount) || depositamount <=0){
                    console.log("Enter amount greater than zero");
                    depositMoney();
                    return;
                }
                for(let account of accounts_array){
                    if(accountinput == account.Acc_num){
                        found = true;
                        account.Acc_balance += depositamount;
                        console.log("Money Deposited successfully");
                        
                        account.Acc_transactions.push({
                            type: "deposit",
                            amount: depositamount
                        });
                        console.log(account);
                        showMenu();
                        recallApi();
                        return;
                    }
                }  
                if(found == false){
                    console.log("The account number you enter is not existed");
                    depositMoney();
                    return;
                }
            })
        })
    }
    function withdrawMoney(){
        rl.question("Enter Account number" , (input)=>{
            let found = false;
            let accountinput = Number(input);
            if(isNaN(accountinput)){
                console.log("Enter account number in numbers only");
                withdrawMoney();
                return;
            }
            rl.question("Enter WithDraw Amount" , (input)=>{
                let withdrawamount = Number(input);
                if(isNaN(withdrawamount) || withdrawamount <=0){
                    console.log("Please enter numbers greater than zero");
                    withdrawMoney();
                    return;
                }
                for(let account of accounts_array){
                    if(accountinput == account.Acc_num){
                        if(withdrawamount > account.Acc_balance){
                            console.log("Insufficient Balance");
                            withdrawMoney();
                            return;
                            
                        }else{
                            found = true;
                            account.Acc_balance -= withdrawamount;
                            account.Acc_transactions.push({
                                type : "Withdraw",
                                amount: withdrawamount
                            });
                            console.log("Amount withdrawn successfully");
                            console.table(account.Acc_transactions);
                            console.log(`Your remaining balance is ${account.Acc_balance}`);
                            showMenu();
                            recallApi();
                            return;
                        }
                        
                    }
                }
                if(found == false){
                    console.log("No Account found");
                    withdrawMoney();
                    return;
                }
            })
        })
    }
    function checkBalance(){
        rl.question("Enter your account number" , (input)=>{
            let found = false;
            let accountinput = Number(input);
            if(isNaN(accountinput)){
                console.log("Enter account number in numbers only");
                checkBalance();
                return;
            }
            for(let account of accounts_array){
                if(accountinput == account.Acc_num){
                    found = true;
                    console.log(`Your Current balance is : ${account.Acc_balance}`);
                    showMenu();
                    recallApi();
                    return;   
                }
            }
            if(found == false){
                console.log("No Account found");
                checkBalance();
                return;
            }
            
        })
    }
    function transactionHistory(){
        rl.question("Enter your account number" , (input)=>{
            let found = false;
            let accountinput = Number(input);
            if(isNaN(accountinput)){
                console.log("Enter account number in numbers only");
                transactionHistory();
                return;
            }
            for(let account of accounts_array){
                if(accountinput == account.Acc_num){
                    found = true;
                    if(account.Acc_transactions.length == 0){
                        console.log("No Transactions Yet");
                    }else{
                        console.table(account.Acc_transactions);
                    }
                    showMenu();
                    recallApi();
                    return;   
                }
                
            }
            if(found == false){
                console.log("No Account found");
                transactionHistory();
                return;
            }
        })
    }

    function recallApi(){
        rl.question("Choose an option" , (input) =>{
            let number = Number(input);
            if(isNaN(number)){
                console.log("Enter numbers only");
                recallApi();
            }else if(number > 7){
                console.log("Please enter number between 1 and 7");
                recallApi();
            }

            switch (input) {
                case "1":
                    console.log("You selected create account");
                    createAccount();
                break;
                case "2":
                    console.log("You selected View Account");
                    viewAccount();
                break;
                case "3":
                    console.log("You selected Deposit Money");
                    depositMoney();
                break;
                case "4":
                    console.log("You selected WithDraw Money");
                    withdrawMoney();
                break;
                case "5":
                    console.log("You selected Check Balance");
                    checkBalance();
                break;
                case "6":
                    console.log("You selected Transaction History");
                    transactionHistory();
                break;
                case "7":
                    console.log("Exit");
                    rl.close();
                break;
            }
        })
    }
showMenu();
recallApi();