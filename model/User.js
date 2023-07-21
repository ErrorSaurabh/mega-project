import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    wishlists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist"
    }],
    isAdmin: {
        type: Boolean,
        default: false
    },
    hasShipppingAddrress: {
        type: Boolean,
        default: false
    },
    shippingAddress: {
       
        firstName: {
            type: String,
            
        },
        lastName: {
            type: String,
           
        },
        address: {
            type: String,
            
        },
        city: {
            type: String,
            
        },
        country: {
            type: String,
            
        },
        postalCode: {
            type: String,
           
        },
        phone: {
            type: String,
            
        }
        
    }
},
{
    timestamps:true
}
);

// complete schema to model
const User = mongoose.model('user', userSchema);

export default User;

