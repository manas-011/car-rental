const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel.jsx") ;
const Car = require("../models/carModel.jsx") ;
const { v4: uuidv4 } = require("uuid");

const stripe = require("stripe")(
    "sk_test_51NHOozSD4ucIx9MSq2Q9jrnmDJmOASjoc3K0i6LsbPS4MskakgTyvosFCO2VEehDgx6faSUX4klwswRXjlNr61cv00duKndLGd"
  );


router.post("/bookcar" , async (req , res) => {

    const { token } = req.body;

    try {
  
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
            //payment_method: paymentMethodId ,
        });

        let price = req.body.totalAmount ;
        price = price * 100 ;

        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: price,
        //     currency: 'inr',
        //     payment_method: 'pm_card_visa',
        //     //automatic_payment_methods: {enabled: true},
        // });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: price,
            currency: 'inr',
            payment_method_types: ['card'],
           // capture_method: 'manual',  
        });
          
        
        console.log('payment intent') ;
        console.log(paymentIntent) ;

        if (paymentIntent) {

            req.body.transactionId = token.card.id ;
            //let vari = req.body ; vari.transactionId = token.id ;
            console.log('request body is:') ;
            console.log(req.body) ;

            const newbooking = new Booking(req.body) ;

            console.log('newBooking is:') ;
            console.log(newbooking) ;

            await newbooking.save() ;


            const car = await Car.findOne({ _id: req.body.car }) ;
            car.bookedTimeSlots.push(req.body.bookedTimeSlots) ;
            await car.save() ;
            res.send("Your booking is successfull") ;

        } else {
            return res.status(400).json(error) ;
        }
    }
     catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }

});

router.get("/getallbookings", async(req, res) => {

    try {
        const bookings = await Booking.find().populate('car') ;
        res.send(bookings) ;
        
    } catch (error) {
        return res.status(400).json(error) ;
    }
  
});


module.exports = router ;