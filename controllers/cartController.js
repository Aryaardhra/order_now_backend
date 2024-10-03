import { response } from "express";
import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
 try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] = 1;
    } else {
        cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, {cartData});
    res.json({ success : "true", message : "Added To Cart"});
 } catch (error) {
    console.log(error);
    response.json({ success : false, message : "no items is added to the cart"})
 }
};

const removeFromCart = async (req, res) => {

    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0 ){
            cartData[req.body.itemId] -= 1;
        } 
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({ success : "true",  message : "remove from the cart"})
    } catch (error) {
        console.log("error")
        res.json({ success : "false",  message : " not remove from the cart"})
    }
};

//fetch from cart
const getCart = async (req, res) => {
try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success : "true", cartData});
} catch (error) {
    console.log("error");
    res.json({ success : "false", message: "something went wrong while fetching the data from cart"})
}
};

export {addToCart, removeFromCart, getCart};