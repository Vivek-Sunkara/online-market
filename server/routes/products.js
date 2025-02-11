import express from 'express';
import Product from '../models/Product.js';  // Corrected import
import nodemailer from 'nodemailer';

const router = express.Router();

// Endpoint to fetch products
router.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Endpoint to fetch products by user
router.get('/api/products/user/:userId', async (req, res) => {
  try {
    const products = await Product.find({ username: req.params.userId });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// Endpoint to add a product
router.post('/api/products', async (req, res) => {
  try {
    const { name, price, description, image, username } = req.body;
    const product = new Product({ name, price, description, image, username });
    await product.save();
    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Endpoint to buy a product
router.post('/api/products/buy/:productId', async (req, res) => {
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
      to: product.username,
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

export { router as productsRoute };
