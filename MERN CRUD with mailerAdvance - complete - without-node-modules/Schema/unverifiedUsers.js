import mongoose from "mongoose";

const mySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: "12h", // Document will automatically delete 12 hours after creation
        },
    },
    {
        timestamps: true,
    }
);

const unverifiedUserModel = mongoose.model("unverifiedUser", mySchema);

export default unverifiedUserModel;
