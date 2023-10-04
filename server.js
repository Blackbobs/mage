require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// const fetch = require("node-fetch");

// const testing = async () => {
//   try {
//     let result = await fetch("https://fakestoreapi.com/products");
//     let products = await result.json();
//     return products;
//   } catch (error) {
//     console.log(error);
//   }
// };
// console.log(testing);
app.listen(3000);
