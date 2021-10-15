const express = require('express');
const mongoose = require("mongoose");
const multiparty = require('multiparty');
const morgan = require('morgan');
var jwt = require('jsonwebtoken');
const { createHttpTerminator } = require('http-terminator');
const cors = require('cors');
const User = require('./models/user');
const Product = require('./models/product');

const PORT = 4000;
const app = express();

app.use(morgan('tiny'));
app.use(express.static('public'));
app.use(express.json());
app.use(cors());


//For Checking (Server in running or not)

app.get('/', (req, res) => {
    res.send('Home Page...!')
})

// Fetch Products Data 
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (err) {
        res.send({ 'error': err.message });
    }
})

// Fetch Users Data 
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.send({ 'error': err.message });
    }
})

// Filter Products
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.send(product);
    } catch (err) {
        res.send({ 'error': err.message });
    }
});

//Filter Users
app.get('/users/:id', async (req, res) => {
    try {
        const users = await User.findById(req.params.id);
        res.send(users);
    } catch (err) {
        res.send({ 'error': err.message });
    }
});

// Searching...
// app.get('/search', async (req, res) => {
//     console.log(`Search Object String : ${JSON.stringify(req.query)}`);
//     const { q } = req.query;
//     try {
//         const products = await Product.find({
//             $or: [
//                 { title: { $regex: q, $options: "i" } },
//                 { image: { $regex: q, $options: "i" } }
//             ]
//         }).sort({ price: 'desc' }).exec();
//         res.send(products);
//     } catch (err) {
//         res.send({ 'error': err.message });
//     }
// });

// // Add Product
// app.post('/products', async (req, res) => {
//     console.log("new-product request= ", req.body);
//     try {
//         const product = new Product(req.body);
//         const prod = await product.save();
//         res.send(prod);
//     } catch (err) {
//         res.send({ 'error': err.message });
//     }
// });

// //Add User
// app.post('/register-form', async (req, res) => {
//     var form = new multiparty.Form();

//     form.parse(req, async function (err, fields, files) {
//         if (err) return res.send({ 'error': err.message });

//         console.log(`fields = ${JSON.stringify(fields, null, 2)}`);
//         console.log(`files = ${JSON.stringify(files, null, 2)}`);

//         const user = new User({
//             username: fields.username[0],
//             email: fields.email[0],
//             password: fields.password[0]
//         });

//         try {
//             const reg = await user.save(); // SQL insert query
//             console.log(`User = ${JSON.stringify(reg, null, 2)}`);
//             res.send(reg);
//         } catch (err) {
//             res.send({ 'error': err.message });
//         }
//     })
// });

//Login Validation (JWT Token)
// app.post('/login', async (req, res) => {
//     console.log('body', req.body)
// const { email, password } = req.body;
// const user = await User.find({ email: email })
// console.log(user);
// if (!user) {
//     res.status(401).send("User not Found!");
// }
// else if (user.password !== password) {
//     res.status(401).send("Invalid Password");
// }
// else if (user.role !== role) {
//     res.status(401).send("Invalid Role");
// }
// else {
//     res.status(200).send("Login Successfull");
// }
// var token = jwt.sign(user, process.env.jwtKey);
// user.token = token;
// res.status(200).json(user);
// });

//Login
app.post('/login', async (req, res) => {
    console.log('req', req.body);
    const { email, password, role } = req.body;
    User.findOne({ email: email, role: role }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: 'Login Successful!', status: 200, user })
            } else {
                res.send({ message: "Invalid Password!", status: 401 })
            }
        } else {
            res.send({ message: "User not Found!", status: 404 })
        }
    })
});

//Add User
app.post('/register', async (req, res) => {
    const { username, email, password, role } = req.body;
    User.findOne({ email: email, role: role }, (err, user) => {
        if (user) {
            res.send({ message: 'User Already Registered!' })
        } else {
            const user = new User({ username, email, password, role });
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: 'User Registered Successfully!' });
                }
            })
        }
    })
});

//Add Product
app.post('/products', async (req, res) => {
    const { title, price, status } = req.body;
    Product.findOne({ title: title }, (err, product) => {
        if (product) {
            res.send({ message: 'Product Already Exists!', status: 401 })
        } else {
            const product = new Product({ title, price, status });
            product.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: 'Product Added Successfully!', status: 200 });
                }
            })
        }
    })
});

// Delete Product
app.delete('/products/:id', async (req, res) => {
    console.log(req.body);
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        console.log(product);
        res.send(product);
    } catch (err) {
        res.send({ 'error': err.message });
    }
});

//Delete User
app.delete('/users/:id', async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        console.log(user);
        res.send(user);
    } catch (err) {
        res.send({ 'error': err.message });
    }
});

// Update Product
app.put('/products/:id', async (req, res) => {
    console.log(`updating product ${req.params.id} with ${JSON.stringify(req.body)}`);
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(product);
    } catch (err) {
        res.send({ 'error': err.message });
    }
})

// Update User
app.put('/users/:id', async (req, res) => {
    console.log(`updating user ${req.params.id} with ${JSON.stringify(req.body)}`);
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(user);
    } catch (err) {
        res.send({ 'error': err.message });
    }
})

// // Delete Operation
// app.delete('/products/:id', async (req, res) => {
//     try {
//         const product = await Product.findByIdAndDelete(req.params.id);
//         res.send(product);
//     } catch (err) {
//         res.send({ 'error': err.message });
//     }
// });

// User Registration....

// app.post('/register-form', async (req, res) => {
//     try {
//         const user = new User(req.body);
//         const reg = await user.save();
//         res.send(reg);
//     } catch (err) {
//         res.send({ 'error': err.message });
//     }
// });


const server = app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})

// ******************************************************************* //

const httpTerminator = createHttpTerminator({ server });

const db = {
    username: 'Rauf',
    password: 'Rauf%401295',
    database: 'Basic-App'
}

// const uri = `mongodb+srv://${db.username}:${db.password}@cluster0.yo4sl.mongodb.net/${db.database}?retryWrites=true&w=majority`;
const uri = `mongodb+srv://${db.username}:${db.password}@cluster1.4mwyr.mongodb.net/${db.database}?retryWrites=true&w=majority`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    // poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

// Connect and handle initial connection errors
mongoose.connect(uri, options).then(
    () => { console.log('connected to mongodb') },
    err => { console.log('mongodb initial connection error', err) }
);

// To handle errors after initial connection was established
mongoose.connection.on('error', err => {
    console.log('mongodb runtime error', err)
});

function gracefulShutdown() {
    // First argument is [force], see mongoose doc.
    mongoose.connection.close(false, () => {
        console.log('MongoDb connection closed.');
    });
    httpTerminator.terminate();
}

// This will handle process.exit():
process.on('exit', gracefulShutdown);

// This will handle kill commands, such as CTRL+C:
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGKILL', gracefulShutdown);

// This will prevent dirty exit on code-fault crashes:
process.on('uncaughtException', gracefulShutdown);