import { COLLECTION_MODELS } from "./../constansts/index";
require("dotenv").config();
import mongoose, { Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { CloundImage } from "src/interface";

const Schema = mongoose.Schema;

export interface UserSchema extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: CloundImage;
  role: Role;
  phone?: string;
  address?: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  cmnd: string;
}

export enum Role {
  "user",
  "admin",
}

const User = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      minLength: [4, "username > 4"],
      maxLength: [30, "username < 30"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      validate: [validator.isEmail, "email invalid format"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "password >= 8"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: Role,
      default: "user",
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    cmnd: {
      type: String,
    },
    rooms: [
      {
        roomId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: COLLECTION_MODELS.room.document,
        },
        form: Date,
        to: Date,
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true, collection: COLLECTION_MODELS.user.collection }
);

User.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

User.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY_TOKEN as string, {
    expiresIn: process.env.EXPIRES_IN_SECONDS,
  });
};

User.methods.comparePassword = async function (passwordInput: string) {
  return await bcrypt.compare(passwordInput, this.password);
};

User.methods.getResetPasswordToken = async function () {
  const resetToken = await crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = await crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

export default mongoose.model<UserSchema>(
  COLLECTION_MODELS.user.document,
  User
);
