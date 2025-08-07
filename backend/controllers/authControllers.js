import { comparePassword, hashPassword } from "../helper/authHelper.js";
import UserModel from "../models/UserModel.js";
import PostModel from "../models/PostModel.js";
import JWT from "jsonwebtoken";

//register sign
export const registerController = async (req, res) => {
    try {
        const { name, email, password, bio } = req.body;
        //validation
        if (!name) {
            return res.status(400).send({ message: "Name is Required" });
        }
        if (!email) {
            return res.status(400).send({ message: "Email is Required" });
        }
        if (!password) {
            return res.status(400).send({ message: "Password is Required" });
        }
        if (!bio) {
            return res.status(400).send({ message: "Bio is Required" });
        }

        //check user
        const existingUser = await UserModel.findOne({ email })

        //exisiting user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            })
        }

        //register user
        const hashedPassword = await hashPassword(password);

        //save
        const user = await new UserModel({ name, email, bio, password: hashedPassword }).save();
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Register Controller",
            error
        })
    }
}

//login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Email and password are required"
            });
        }

        //check user
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Invalid password"
            })
        }

        // Update last login time
        user.lastLogin = new Date();
        await user.save();

        //token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error during login",
            error: error.message
        })
    }
}

//user
export const userController = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user._id).select("-password");
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error fetching user",
            error
        })
    }
}

//user profile
export const userProfileController = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const posts = [];
        try {
            const userPosts = await PostModel.find({ user: user._id })
                .populate("user", "name email bio")
                .sort({ createdAt: -1 });
            posts.push(...userPosts);
        } catch (postError) {
            console.log('Error fetching posts:', postError.message);
        }

        res.status(200).send({
            success: true,
            message: "User profile fetched successfully",
            user,
            posts
        });
    } catch (error) {
        console.log('Profile error:', error.message);
        res.status(500).json({
            message: "Error fetching user profile",
            error: error.message
        })
    }
}

