import mongoose from "mongoose";
const Schema = mongoose.Schema;
const CouponSchema = new Schema({
    code:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required:true
    },
    discount:{
        type: Number,
        required:true,
        default:0
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
},{
    timestamps: true,
    toJSON:{virtuls:true}
}
);

// Coupon is Exptred
CouponSchema.virtual("isEpired").get(function(){
    return this.endDate < Date.now()
})
CouponSchema.virtual("daysLeft").get(function(){
    const daysLeft = Math.ceil((this.endDate - Date.now()) / (1000 * 60 * 60 * 24)) +
    " " +
    "Days Left";
    return daysLeft;
})
// Complete Schema to model
const Coupon = mongoose.model('Coupon', CouponSchema);
export default Coupon;