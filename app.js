const { application } = require('express');
const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const users =[
    {
        name: "Vaibhav", 
        password: "123456789",
        email: "vaibhav@gmail.com",
        phoneNumber: 9123456789,
    }
];

const menuItems = [
    {
        id: 1,
        name: "Biryani", 
        cost: 250,
        pic: "/images/biryani.jpg"
    },
    {
        id: 2,
        name: "Halwa", 
        cost: 100,
        pic: "/images/halwa.jpg"
    },
    {
        id: 3,
        name: "idli", 
        cost: 250,
        pic: "/images/idli.jpg"
    },{
        id: 4,
        name: "thali", 
        cost: 250,
        pic: "/images/thali.jpg"
    },
    {
        id: 5,
        name: "Marathi Thali", 
        cost: 400,
        pic: "/images/thali.jpg"
    }
]

const orders = [
    
];

console.log("users currently in the system", users)
app.get("/", (request,response) => {
    
    response.send("Hello From Backend")
})

app.get('/menu',(req,res)=>{
    res.status(200).json(menuItems)
})

app.post("/login", (req,res)=>{
    console.log(req.body.email, req.body.password);
    const selectedUser  = users.filter(user => user.email === req.body.email && user.password === req.body.password);
    if(selectedUser.length>0) {
        res.status(200).json({message:"user found",user:selectedUser});
    }else {
        res.status(404).json({message: "Invalid username or password"});
    }
})


app.post('/register',(req,res)=>{ //localhost:4009/register
    console.log("Req.body", req.body)
    if(req.body.user){
        users.push(req.body.user)
    }
    res.json({message : "user has been added successfully", user: req.body.user});
})

app.post('/order', (req,res) => {
    console.log("Order Body", req.body);
    const order = {
        orderID : parseInt(Math.random()*1000000000),
        userEmail : req.body.user.email,
        items: req.body.items,
        cartTotal: req.body.cartTotal
    }
    orders.push(order);
    console.log("Order ", orders)
    res.json({message: "order created successfully"})
})

app.post('/getOrders',(req,res)=>{
    let filteredOrders = [] 
    if(orders.length > 0) {
       filteredOrders = orders.filter(order => order.userEmail === req.body.email)
    }
    res.json({orders: filteredOrders})
})






app.listen(4009);
console.log("Server is running on port ", 4009);