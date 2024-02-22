const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv=require('dotenv')
const app = express();
dotenv.config()
app.use(cors());

app.use(bodyParser.json());

mongoose.connect(process.env.Mongo_url, { useNewUrlParser: true, useUnifiedTopology: true });

const componentSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Component = mongoose.model('Component', componentSchema);

let addCount = 0;
let updateCount = 0;

app.post('/api/add', async (req, res) => {
  try {
    const { title, description } = req.body;
    await Component.create({ title, description });
    addCount++;
    res.json({ message: 'Data added successfully', addCount });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/update/:id', async (req, res) => {
  try {
    const { title, description } = req.body;
    const updatedComponent = await Component.findByIdAndUpdate(req.params.id, { title, description }, { new: true });
    updateCount++;
    res.json({ message: 'Data updated successfully', updateCount, updatedComponent });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/delete/:id', async (req, res) => {
    try {
      const deletedComponent = await Component.findByIdAndDelete(req.params.id);
      res.json({ message: 'Data deleted successfully'});
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/api/count', async(req, res) => {
    try {
       const data=  await Component.find({})
        res.json({ addCount, updateCount,data });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

});

app.get('/api', async(req, res) => {
  try {
      res.json({message:'Hellooo'});
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }

});

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
