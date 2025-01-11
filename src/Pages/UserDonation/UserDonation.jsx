import React, { useContext, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../../components/CheckOutForm/CheckoutForm";

// todo-need to place pk
const stripePromise = loadStripe(`${import.meta.env.VITE_PUBLIC_KEY}`);

const UserDonation = () => {


  return (
    <section className="min-h-screen flex flex-col md:flex-row gap-5 bg-blue-100 mt-32 sm:mt-16 p-4">
      <div className="w-full md:w-1/2 text-center p-4">
        <h2 className="text-3xl font-bold text-secondary my-3">
          Support MilesAhead Marathon
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Your donation helps us make a difference. Join us in supporting a
          great cause!
        </p>
        {/* checkout form container */}
        <div className="max-w-md mx-auto">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
      {/* left-container */}
      <div className="w-full md:w-1/2 p-4">payment process</div>
    </section>
  );
};

export default UserDonation;
