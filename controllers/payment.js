// const { request } = require("http");
// const https = require("https");
// const historyModel = require("../Models/historyModel");
// const { response } = require("express");
// const MySecretKey = process.env.secretKey;
// const Paystack = require("paystack")(MySecretKey);

// const payStack = {
//   acceptPayment: async (request, response) => {
//     try {
//       // request body from the clients
//       const courseDetails = JSON.stringify(request.body.courseDatails)
//       console.log(courseDetails)
//       const email = request.body.email;
//       const amount = request.body.amount;
//       const first_name = request.body.firstName;
//             const last_name = request.body.lastName;




//       // params
//       const params = JSON.stringify({
//         email: request.body.email,
//         amount: amount * 100,
//         first_name: first_name,
//         last_name: last_name,
//       });
//       // options
//       const options = {
//         hostname: "api.paystack.co",
//         port: 443,
//         path: "/transaction/initialize",
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ` + process.env.secretKey, // where you place your secret key copied from your dashboard
//           "Content-Type": "application/json",
//         },
//       };
//       // client request to paystack API
//       const clientReq = https
//         .request(options, (apiRes) => {
//           let data = "";
//           apiRes.on("data", (chunk) => {
//             data += chunk;
//             return data;
//           });

//           apiRes.on("end", () => {
//             console.log(JSON.parse(data));
//             const yy = JSON.parse(data);
//             const newData = {
//               courseDetails: request.body.courseDetails,
//               userEmail: email,
//               status: false,
//               reference: yy.data.reference,
//             };
//             historyModel.create(newData).then((result) => {
//               console.log(result);
//             });
//             return response.send({body: yy});
//           });
//         })
//         .on("error", (error) => {
//           console.error(error);
//         });
//       clientReq.write(params);
//       clientReq.end();
//     } catch (error) {
//       // Handle any errors that occur during the request
//       console.error(error);
//       response.status(500).json({ error: "An error occurred" });
//     }
//   },
// };

// const initializePayment = payStack;

// const verifyPayment = async (req, res) => {
//   console.log("Verifying...");
//   const reference = req.params.reference;
//   try {
//     const options = {
//       hostname: "api.paystack.co",
//       port: 443,
//       path: `/transaction/verify/${reference}`,
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ` + process.env.secretKey,
//       },
//     };

//     const apiReq = https.request(options, (apiRes) => {
//       let data = "";

//       apiRes.on("data", (chunk) => {
//         data += chunk;
//       });

//       apiRes.on("end", () => {
//         console.log(JSON.parse(data));
//         const yy = JSON.parse(data);
//         if (yy.status == true) {
//           if (yy.data.status == "success") {
//             historyModel
//               .findOneAndUpdate({ reference: reference }, { status: true })
//               .then((result) => {
//                 console.log(result);
//                 return res.status(200).json(data);
//               })
//           } else {
//             return res.status(400).json(data);
//           }
//         }
//         else {
//           return res.status(400).json(data);
//         }
//       })
//     });

//     apiReq.on("error", (error) => {
//       console.error(error);
//       res.status(500).json({ error: "An error occurred" });
//     });

//     // End the request
//     apiReq.end();
//   } catch (error) {
//     // Handle any errors that occur during the request
//     console.error(error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// };
// module.exports = { verifyPayment, initializePayment };