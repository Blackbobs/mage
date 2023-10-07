// require("dotenv").config();
// const cookieParser = require("cookie-parser");
// const cors = require("cors");

// const express = require("express");
// const app = express();
// app.use(cookieParser());
// app.use(express.json());
// app.use(cors());

// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

// app.post("/create-checkout-session", async (req, res) => {
//   try {
//     const session = await stripe.checkout.seesions.create({
//       payment_method_types: [card],
//       mode: "payment",
//       line_items: req.body.map((item) => {
//         const storeItem = JSON.parse();
//         return {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: storeItem.title,
//             },
//             unit_amount: storeItem.price,
//           },
//           quantity: 1,
//         };
//       }),
//       success_url: `${process.env.SERVER_URL}/success.html`,
//       cancel_url: `${process.env.SERVER_URL}/cancel.html`,
//     });
//     res.json({ url: session.url });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.listen(3000);
