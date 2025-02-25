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

// Endpoint to fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// Endpoint to fetch products by user
router.get('/user/:userId', async (req, res) => {
  try {
    const products = await Product.find({ userId: req.params.userId });
    res.json({ products });
  } catch (error) {
    console.error('Error fetching products by user:', error);
    res.status(500).json({ message: 'Error fetching products by user', error: error.message });
  }
});

// Endpoint to add a product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, userId } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !description || !price || !image || !userId) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const product = new Product({ name, price, description, image, userId });
    await product.save();

    res.json({ success: true, product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
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
        user: process.env.EMAIL_USER, // Use environment variables
        pass: process.env.EMAIL_PASS, // Use an App Password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: product.userId, // Ensure this is a valid email
      subject: 'Your product has been bought',
      text: `Your product "${product.name}" has been bought by ${req.body.buyerId}.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email', error: error.message });
      }
      res.json({ success: true, message: 'Product bought successfully' });
    });
  } catch (error) {
    console.error('Error buying product:', error);
    res.status(500).json({ message: 'Error buying product', error: error.message });
  }
});

export default router;
