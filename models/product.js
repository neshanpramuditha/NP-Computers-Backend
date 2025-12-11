import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        productID : {
            type:String,
            required:true,
            unique:true
        },
        name : {
            type:String,
            required:true
    },
    description : {
        type:String,
        required:true
    },
    altNames:{ // නම් ගොඩක් තියෙන්න පුලුවන් නිසා මේක array එකක් කරා
        type:[String],
        default:[]
    },
    price:{
        type:Number,
        required:true
    },
    labledPrice:{ // ලේබල් එකේ තියෙන price එක
        type:Number,
    },
    category:{
        type:String,
        default:"Others"
    },
    images:{
        type:[String], // image URLs
        default:["/images/default_product_image-1.png", "/images/default_product_image-2.png"]
    },
    isVisible:{
        type:Boolean,
        default:true,
        required:true
    },
    brand:{
        type:String,
        default:"Generic"
    },
    model:{
        type:String,
        default:"Standard"
    }
}
)
const Product = mongoose.model('Product', productSchema);
export default Product;