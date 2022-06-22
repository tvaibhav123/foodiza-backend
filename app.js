const { application } = require('express');
const express = require('express');
const { connectToCluster } = require('./Mongo/mongoConnection');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

/* console.log("users currently in the system", users) */
app.get("/", (request,response) => {
    
    response.send("Hello From Backend")
})

app.get('/menu',(req,res)=>{
    res.status(200).json(menuItems)
})

app.post("/login",async (req,res)=>{
    console.log(req.body.email, req.body.password);
    //const selectedUser  = users.filter(user => user.email === req.body.email && user.password === req.body.password);
    try {
        mongoClient = await connectToCluster();
        const db = mongoClient.db('FoodOrder');
        const collection = db.collection('registered_users');
        const found_user = await collection.findOne({email: req.body.email, password:req.body.password})
            if(found_user){
                res.status(200).json({message:"user found",user:found_user});
            }else {
                res.status(404).json({message: "Invalid username or password"});
            }
        }
        catch {
            res.status(420).json({message : "Error Occured while Loggin In user.", user: req.body});
        }
        finally {
            await mongoClient.close();
        }
   
})


app.post('/register', async (req,res)=>{ //localhost:4009/register
    console.log("Req.body", req.body)
    if(req.body.user){
        let mongoClient;
        try {
            mongoClient = await connectToCluster();
            const db = mongoClient.db('FoodOrder');
            const collection = db.collection('registered_users');
            const found_user = await collection.findOne({email: req.body.user.email})
            if(found_user){
                res.status(420).json({message : "User Already Exists in the Db. Please try loggin In", user: req.body.user});
            }else {
                const insertedDocument = await collection.insertOne(req.body.user);
                res.json({message : "user has been added successfully", user: req.body.user});
            }
        }
        catch {
            res.status(420).json({message : "Error Occured while inserting user.", user: req.body.user});
        }
         finally {
            await mongoClient.close();
        }
    }
})

app.post('/order',async (req,res) => {
    console.log("Order Body", req.body);
    const order = {
        orderID : parseInt(Math.random()*1000000000),
        userEmail : req.body.user.email,
        items: req.body.items,
        cartTotal: req.body.cartTotal
    }
    /* orders.push(order); */
    let mongoClient;
        try {
            mongoClient = await connectToCluster();
            const db = mongoClient.db('FoodOrder');
            const collection = db.collection('orders');
            const insertedDocument = await collection.insertOne(order);
            res.json({message: "order created successfully"})
        }
        catch {
            res.status(420).json({message : "Error Occured while Creating Order.", order: req.body});
        }
         finally {
            await mongoClient.close();
        }
    
})

app.post('/getOrders',async (req,res)=>{
    let filteredOrders = [] 
    /* if(orders.length > 0) {
       filteredOrders = orders.filter(order => order.userEmail === req.body.email)
       
    }
    res.json({orders: filteredOrders}) */

    let mongoClient;
        try {
            mongoClient = await connectToCluster();
            const db = mongoClient.db('FoodOrder');
            const collection = db.collection('orders');
            const found_orders = await collection.find({userEmail: req.body.email}).toArray();
            res.json({message: "Orders", orders: found_orders})
        }
        catch {
            res.status(420).json({message : "Error Occured while fetching orders.", order: req.body});
        }
         finally {
            await mongoClient.close();
        }
})






app.listen(4009);
console.log("Server is running on port ", 4009);