const mysql = require('mysql');
const inq = require('inquirer')
const cTable = require('console.table')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});


function bamazonCustomer(){
    connection.query('SELECT * FROM products', (e, res) => {
        if (e) throw e;
        console.table(res);
        inq.prompt(
            {
                name: 'selection',
                type: 'input',
                message: 'What item ID would you like to purchase?',

                validate: (input) => {
                    for(let i = 0; i<res.length; i++){
                        if(input == res.id){
                            return true;
                        }
                        return 'Please make pick item id from table above.';
                    }
                }
            },
            {
                name: 'amount',
                type: 'input',
                message: 'How many would you like to purchase?',
            }
        ).then(answer => {
            connection.query('SELECT * FROM products WHERE ?', {id: answer.selection}, (e, res) => {
                if (e) throw e;
                const itemName = res[0].name;
                const itemPrice = res[0].price;

                if(res[0].stock < answer.amount){
                    console.log(`Insufficient stock of ${res[0].name}. \n`)
                    checkRestart();
                }else{
                    const newStock = res[0].stock - answer.amount
                    connection.query('UPDATE products SET ? WHERE ?', [{stock: newStock}, {id: answer.selection}], (e, res) => {
                        if (e) throw e;
                        const cost = itemPrice * answer.amount;
                        console.log(`You bought ${answer.amount} of ${itemName} \n Total cost: ${cost}`);
                        checkRestart();
                    })
                }
            })
        })
    })
}
function checkRestart(){
    inq.prompt(
        {
            name: 'reply',
            type: 'confirm',
            message: 'Would you like to order another item?',
        }
    ).then(answer => {
        if(answer.reply){
            bamazonCustomer();
        }else{
            console.log('Thank you for shopping with us.');
        }
    })                
}
                            


// connection.connect((e) => {
//     if (e) throw e;
//     console.log(`connected with id ${connection.threadId}`);
//     cTableTest();
//     // bamazonCustomer();
// })