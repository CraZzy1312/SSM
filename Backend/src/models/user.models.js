import mongoose from "mongoose";

import bycrypt from "bcryptjs";


export const userSchema = new mongoose.Schema({
    nombre: { type: String },
    correo: {  type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("contraseña")) {
        return next();
    }
    try {
        const salt = await bycrypt.genSalt(10);
        this.contraseña = await bycrypt.hash(this.contraseña, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bycrypt.compare(candidatePassword, this.contraseña);
};

export const User = mongoose.model("User", userSchema);