import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Ensure 'User' is correctly referenced in your schema for relational data
    required: true,
  },
}, { timestamps: true });  // Added timestamps to track createdAt and updatedAt

// Export the model
export default mongoose.model('Product', productSchema);
