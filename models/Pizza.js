import mongoose from 'mongoose';

const PizzaSchema = new mongoose.Schema({
    id: String,
    imageUrl: String,
    title: String,
    types: Array,
    sizes: Array,
    price: Number,
    category: Number,
    rating: Number,
});

export default mongoose.model('PizzaModel', PizzaSchema);
