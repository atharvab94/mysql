var mysql = require("mysql");
var inquirer = require("inquirer");
var inStock = 0;
var totalPrice = 0;


var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    user: "root",
    password: "root",
    database: "bamazon_DB"
});


connection.connect(function (err) {
    if (err) throw err;

   
    showProducts();
});

function showProducts() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.log('');
        console.log('--Inventory--');
        console.log('');


        for (var i = 0; i < res.length; i++) {
            console.log('Item ID: ' + res[i].id + '      Product: ' + res[i].product + '      Department: ' + res[i].department);
            console.log('Price: ' + res[i].price + '      Quanity Left: ' + res[i].quanity);
            console.log(' ');

        }
        
        manageStore();
    });
}


                
function manageStore() {
    connection.query("SELECT * FROM products", function (err, res) {
            if (err) throw console.log("connection error:" + err);
            inquirer
                .prompt([
                    {
                        name: 'selectId',
                        type: 'list',
                        message: 'Choose an option below to manage inventory:',
                        choices: ["Add inventory", "Add a new product", "Remove a product", "Quit"]

        }
                

            ]).then(function (answers) {
                    if (answers.selectId === "Add inventory") {
                        addInventory()
                    } else if (answers.selectId === "Add a new product") {
                        newProduct()
                    } else if (answers.selectId === "Remove a product") {
                        deleteProduct()
                    } else if (answers.selectId === "Quit") {
                        quit()
                    } else {
                        console.log("Please choose one of the options");
                    }
                });

                
            function addInventory() {
              inquirer.prompt([

        {
            name: "ID",
            type: "input",
            message: "What is the item number you wish to restock?"
        }, {
            name: 'Quantity',
            type: 'input',
            message: "How many would you like to add?"
        },

                  ]).then(function(answers) {
 
        var quantityAdded = answers.Quantity;
        var IDOfProduct = answers.ID;
        restockDatabase(IDOfProduct, quantityAdded);
    });
}; 

        function restockDatabase(id, quant) {
   
    connection.query('SELECT * FROM products WHERE id = ' + id, function(error, response) {
        if (error) { console.log(error) };
        connection.query('UPDATE products SET quanity = Quanity + ' + quant + ' WHERE id = ' + id);
      
        showProducts();
    });
}; 
    
        
         function newProduct() {
              inquirer.prompt([

         {
            name: 'name',
            type: 'input',
            message: "Name of new product?"
        },
                {
            name: 'department',
            type: 'input',
            message: "Department?"
        },
                  {
            name: 'price',
            type: 'input',
            message: "Price?"
        },
                  {
            name: 'quanity',
            type: 'input',
            message: "quanity?"
        },
                  
                  ]).then(function(answers) {

        var name = answers.name;
        var department = answers.department;
        var price = answers.price;
        var quanity = answers.quanity;
                  
        addNewItemtoDB(name, department, price, quanity);
    });
}; 

        function addNewItemtoDB(name, department, price, quanity) {

  connection.query('INSERT INTO products (product, department, price, quanity) VALUES("' + name + '","' + department + '",' + price + ',' + quanity +  ')');
            
    
        showProducts();
  
};
        
 
        function deleteProduct(){
            inquirer.prompt([{
                name: "ID",
                type: "input",
                message: "Enter the ID number for the item you wish to remove?"
            }]).then(function(answer){
                var id = answer.ID;
                deleteFromDB(id);
            });
        };
        
        function deleteFromDB(id){
            connection.query("DELETE FROM products WHERE id =" + id);
            showProducts();
        }
        

               
            });
    } 