const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
testDataForOrder :    {
    email : "peter.lukic@gmail.com",
    password : "12345",
    productName :"ADIDAS ORIGINAL"
    
    }

}

)
