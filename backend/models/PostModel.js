import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true,});

export default mongoose.model('posts', postSchema);