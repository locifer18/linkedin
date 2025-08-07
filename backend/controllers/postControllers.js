import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserModel.js"; 
// Controller for creating a new post
export const createPostController = async (req, res) => {
    try {
        // Ensure content is provided
        if (!req.body.content) {
            return res.status(400).send({ message: "Post content is required" });
        }

        // req.user._id comes from the requireSignIn middleware
        // Find the user to ensure they exist and get their details if needed
        const user = await UserModel.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).send({ message: "Authenticated user not found." });
        }

        const newPost = new PostModel({
            content: req.body.content,
            user: user._id, // Assign the user's ID
        });

        // Await the save operation to ensure the post is saved and the saved document is returned
        const savedPost = await newPost.save();

        // Populate the user field on the newly saved post before sending it back
        // This ensures the frontend receives the user's name/email immediately
        const populatedPost = await PostModel.findById(savedPost._id).populate("user", "name email");

        res.status(201).json(populatedPost); // Send the saved and populated post with 201 Created status
    } catch (error) {
        console.error("Error creating post:", error);
        // Check for specific Mongoose validation errors if needed
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: error.message });
        }
        res.status(500).send({ message: "Error creating post" });
    }
};

// Controller for getting all posts
export const getPostControllers = async (req, res) => {
    try {
        // Find all posts, sort by most recent, and populate user's name and email
        const posts = await PostModel.find({})
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order (most recent first)
            .populate("user", "name email"); // Populate the 'user' field with 'name' and 'email'

        res.status(200).json(posts); // Send the fetched posts with 200 OK status
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).send({ message: "Error fetching posts" });
    }
};

// Controller for getting a single post by ID
export const getSinglePostController = async (req, res) => {
    try {
        // Find post by ID and populate user details
        const post = await PostModel.findById(req.params.id)
            .populate("user", "name email");

        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        }

        res.status(200).json(post); // Send the fetched post with 200 OK status
    } catch (error) {
        console.error("Error fetching single post:", error);
        // Handle invalid ObjectId format specifically
        if (error.kind === 'ObjectId') {
            return res.status(404).send({ message: "Invalid Post ID" });
        }
        res.status(500).send({ message: "Error fetching post" });
    }
};
