const express = require('express');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
require('./db/config')
const cors = require('cors');
const axios = require('axios');
const Product = require('./db/Admin/Product');
const Crop = require('./db/User/CropSchema');
const User = require('./db/User/UserSchema');
const UserBooking = require('./db/User/MyBookings');
const Farm = require('./db/User/FarmSchema');
const Admin = require('./db/Admin/AdminSchema');
const app = express();
  
app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));

                                              //  Admin  //
// Login Api
app.post('/alogin', (req, resp) => {
  const { email, password } = req.body;

  Admin.findOne({ email: email })
      .then(user => {
          if (user) {
              if (user.password === password) {
                  return resp.json({ Status: "Success", user: { id: user.id, name: user.name, email: user.email } })
              } else {
                  resp.json("incorrect password")
              }
          } else {
              resp.json("no user")
          }
      })
})

// singup Api 
app.post('/asignup', (req, resp) => {
  const { name, email, password } = req.body;
  Admin.findOne({ email: email })
      .then(use => {
          if (use) {
              resp.json("Already have an account")
          } else {
              Admin.create({ email: email, name: name, password: password })
                  .then(result => resp.json("  Account Created"))
                  .catch(err => resp.json(err))
          }
      }).catch(err => resp.json("failed "))
})


                                                //  User  //
// Login Api
app.post('/ulogin', (req, resp) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    return resp.json({ Status: "Success", user: { id: user.id, name: user.name, email: user.email } })
                } else {
                    resp.json("login fail")
                }
            } else {
                resp.json("no user")
            }
        })
})

// singup Api 
app.post('/usignup', (req, resp) => {
    const { name, email, password } = req.body;
    User.findOne({ email: email })
        .then(use => {
            if (use) {
                resp.json("Already have an account")
            } else {
                User.create({ email: email, name: name, password: password })
                    .then(result => resp.json("  Account Created"))
                    .catch(err => resp.json(err))
            }
        }).catch(err => resp.json("failed "))
})

   
app.get('/users',(req,res)=>{
        User.find()
        .then((user)=>{
            res.status(200).json(user)
        })
        .catch(() => {
            res.sendStatus(500)
        })
    })
    
    app.get('/users/:id',(req,res)=>{
        const id =req.params.id;
        User.findById({_id:id})
        .then((user)=>{
            res.status(200).json(user)
        })
        .catch(() => {
            res.sendStatus(500)
        })
    })
    
    app.put('/useredit/:id',(req,res)=>{
        const id =req.params.id;
        const { name, email, password } = req.body;
        User.findByIdAndUpdate(id, { name, email, password }, { new: true })
        .then(updatedUser => {  
            res.json(updatedUser);
          })
          .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
          });
    })
    
    app.delete('/userdelete/:id',(req,res)=>{
        let id=req.params.id;
           User.deleteOne({ _id: id })
           .then((user)=>{
            res.status(200).json(user)
             })
           .catch(() => {
            res.sendStatus(500)
           })
    }) 



                                               // crop data //
// Endpoint to get all crop data
app.get('/cropsdata', (req, res) => {
  fs.readFile(path.join(__dirname, './db/crops.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading file' });
    }
    res.json(JSON.parse(data));
  });
});


app.get('/cropsdata/:name', (req, res) => {
  fs.readFile(path.join(__dirname, './db/crops.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading file' });
    }
    const crops = JSON.parse(data);
    const crop = crops.find(crop => crop.name.toLowerCase() === req.params.name.toLowerCase());
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    res.json(crop);
  });
});

                                               // Products Data  //
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/products', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    imgUrl:req.body.imgUrl
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }

    if (req.body.name != null) {
      product.name = req.body.name;
    }
    if (req.body.category != null) {
      product.category = req.body.category;
    }
    if (req.body.price != null) {
      product.price = req.body.price;
    }
    if (req.body.description != null) {
      product.description = req.body.description;
    }
    if (req.body.inStock != null) {
      product.inStock = req.body.inStock;
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/deleteproduct/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



                                           // Book Product 
app.post('/orderproduct', async (req, res) => {
  try {
      const booking = new UserBooking(req.body);
      await booking.save();
      res.status(201).json({ message: 'Booked successfully' });
  } catch (error) {
      console.error('Error creating booking:', error);
      res.status(500).json({ message: 'Failed to create booking' });
  }
})



app.get('/getbookings/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
      const tasks = await UserBooking.find({ userId }).sort('position');
      res.json(tasks);
  } catch (err) {
      res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});
//                                          Farm Management  

// Add Farm
app.post('/addfarm', async (req, res) => {
    const { name, location, areaSize, cropType, createdAt, userId, userName } = req.body;
    const farm = new Farm({ name, location, areaSize, cropType, createdAt, userId, userName });
    try {
      const newFarm = await farm.save();
      console.log('Saved farm:', newFarm);
      res.status(201).json(newFarm);
    } catch (err) {
      console.error('Error saving farm:', err.message);
      res.status(400).json({ message: err.message });
    }
  });
  

  // Get a specific farm by ID
app.get('/getfarm/:id', async (req, res) => {``
    try {
      const farm = await Farm.findById(req.params.id);
      if (!farm) return res.status(404).json({ message: 'Farm not found' });
      res.status(200).json(farm);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

app.get('/farms', async (req, res) => {``
  try {
    const farm = await Farm.find();
    if (!farm) return res.status(404).json({ message: 'Farm not found' });
    res.status(200).json(farm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});  
  
  // Get crops By UserId
app.get('/getfarms/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
      const crop = await Farm.find( {userId})
        res.json(crop);        
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch crops' });
    }
});
  
  // Update a farm by ID
app.put('/editfarm/:id', async (req, res) => {
    try {
      const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!farm) return res.status(404).json({ message: 'Farm not found' });
      res.status(200).json(farm);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Delete a farm by ID
app.delete('/deletefarm/:id', async (req, res) => {
    try {
      const farm = await Farm.findByIdAndDelete(req.params.id);
      if (!farm) return res.status(404).json({ message: 'Farm not found' });
      res.status(200).json({ message: 'Farm deleted successfully' });
    } catch (error) {
      res.status(400).json({ error:error.message });
    }
  });
  
  
//                                     Crop Management                

// Get crops by  ID
app.get('/getcrop/:id', async (req, res) => {
    try {
        const id = req.params.id;
      const crop = await Crop.findById(id); 
      console.log(crop);
      if (crop == null) {
        return res.status(404).json({ message: 'Crop not found' });
      }
      res.json(crop);
    } catch (err) {
      res.status(500).json({ message: err.message });            
    }           
  });

// Get crops By UserId
  app.get('/getcrops/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const crop = await Crop.find( {userId})
        res.json(crop);        
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch crops' });
    }
});
  
// Add Crop
app.post('/addcrop', async (req, res) => {
    const {name,variety,quantity,plantedDate,estimatedHarvestDate,userId,userName}= req.body;
    console.log(name,variety,quantity,plantedDate,estimatedHarvestDate)
    const crop = new Crop({name,variety,quantity,plantedDate,estimatedHarvestDate,userId,userName});
    try {
      const newCrop = await crop.save();
      console.log(newCrop)
      res.status(201).json(newCrop);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
// Update a crop
app.put('/editcrop/:id', async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (crop == null) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    if (req.body.name != null) {
      crop.name = req.body.name;
    }    
    // Update other fields as needed
    if (req.body.variety != null) {
      crop.variety = req.body.variety;
    }
    if (req.body.quantity != null) {
      crop.quantity = req.body.quantity;
    }
    if (req.body.plantedDate != null) {
      crop.plantedDate = req.body.plantedDate;
    }
    if (req.body.estimatedHarvestDate != null) {
      crop.estimatedHarvestDate = req.body.estimatedHarvestDate;
    }
    const updatedCrop = await crop.save();
    res.json(updatedCrop);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a crop
app.delete('/deletecrop/:id', async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (crop == null) {
      return res.status(404).json({ message: 'Crop not found' });
    }
    await crop.deleteOne()
    res.json({ message: 'Crop deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Weather API Endpoint (Backend -> OpenWeather)
app.get('/api/weather/:city', async (req, res) => {
  const city = req.params.city;
  const API_KEY = process.env.OPENWEATHER_API_KEY;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Weather API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});
app.get('/crop-of-the-day', async (req, res) => {
  try {
    const crops = await Crop.find();
    const randomCrop = crops[Math.floor(Math.random() * crops.length)];
    res.json(randomCrop);
  } catch (error) {
    console.error("Error fetching crop of the day:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get('/seasonal-crops/:season', async (req, res) => {
  const { season } = req.params;
  try {
    const seasonalCrops = await Crop.find({ season: { $regex: new RegExp(season, "i") } });
    res.json(seasonalCrops);
  } catch (error) {
    console.error("Error fetching seasonal crops:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.listen(7000, () => {
  console.log("Server is running on port 7000");
});

