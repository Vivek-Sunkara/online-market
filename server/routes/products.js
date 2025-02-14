import express from 'express';
import multer from 'multer';
import Product from '../models/Product.js'; // Ensure you have a Product model
import nodemailer from 'nodemailer';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Endpoint to fetch products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Endpoint to fetch products by user
router.get('/user/:userId', async (req, res) => {
  try {
    const products = await Product.find({ userId: req.params.userId });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Endpoint to add a product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, userId } = req.body;
    const image = req.file ? req.file.path : null;

    if (!name || !description || !price || !image || !userId) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const product = new Product({ name, price, description, image, userId });
    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Endpoint to buy a product
router.post('/buy/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.status = 'Sold';
    await product.save();

    // Send email notification to the product owner
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: product.userId,
      subject: 'Your product has been bought',
      text: `Your product "${product.name}" has been bought by ${req.body.buyerId}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.json({ success: true, message: 'Product bought successfully' });
    });
  } catch (error) {
    res.status(500).json({ message: 'Error buying product' });
  }
});

export default router;