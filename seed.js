const Product = require('./modules/product');

const products =[
    {
        name: 'Iphone',
        price:2000,
        img:'https://images.unsplash.com/photo-1510878933023-e2e2e3942fb0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGlwaG9uZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60',
        desc: 'These is a nice good phone'
    },
    {
        name: 'Laptop',
        price:20000,
        img:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60',
        desc: 'These is a nice Laptop'
    },
    {
        name: 'Shoes',
        price:500,
        img:'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60',
        desc: 'These is a good pair of shoes'
    },
    {
        name: 'Camera',
        price:9999,
        img:'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2FtZXJhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60',
        desc: 'These is a camera with good quality lens'
    },
    {
        name: 'T-shirt',
        price:1500,
        img:'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHNoaXJ0fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60',
        desc: 'These is a Gucci T-shirt'
    },
    {
        name: 'Vegetables',
        price:50,
        img:'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnZXRhYmxlc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        desc: 'These is are the fresh vegies'
    }
];

const seedDB = async()=>{
  
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log("DB seeded Successfully");
   

}

module.exports = seedDB;