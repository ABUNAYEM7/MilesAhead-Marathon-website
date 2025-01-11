import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import UseAxiosSecure, { axiosInstance } from "../Hook/UseAxiosSecure";
import debounce from "lodash/debounce";

const CheckoutForm = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [err,setErr] = useState('')
  const [clientSecret,setClientSecret] = useState('')
  const { user } = useContext(AuthContext);
  const axiosInstance = UseAxiosSecure()

  const stripe = useStripe();
  const elements = useElements();

//   useEffect for fetching clientSecret
    useEffect(()=>{
        if(!donationAmount || donationAmount <= 0){
            return
        }
        const amount = parseInt(donationAmount)
        axiosInstance.post(`/create-paymentIntent`,{amount})
        .then(res=>{
            // console.log(res)
            if(res.data?.clientSecret){
                setClientSecret(res?.data?.clientSecret)
            }
        })
        .catch(err=>{
            // console.log(err)
        })
    },[axiosInstance,donationAmount])

     //   debounce function to handle onchange smoothly
    const debounceChange = debounce((event)=>{
        setDonationAmount(event)
      },1000)
      
    //   onchange handler
      const handleDonationChange =(e) => {
        const value = e.target.value;
        debounceChange(value)
      };

//    submitHandler
  const handleSubmit =async (e) => {
    e.preventDefault()

    if(!stripe || !elements || !clientSecret){
        return
    }

    const card = elements.getElement(CardElement)

    if(card === null){
        return 
    }

    const {error,paymentMethod} = await stripe.createPaymentMethod({
        type : "card",
        card,
    })
    if(error){
        console.log('paymentMethod error -->',error)
        setErr(error.message)
    }else{
        setErr('')
        console.log('payment method-->', paymentMethod)
    }

    // // retrieve data from form
    // const form = e.target
    // const email = form.email.value;
    // const amount = donationAmount
    

    const {error:confirmPaymentErr,paymentIntent} = await stripe.confirmCardPayment(clientSecret,{
        paymentMethod:{
            card :"card",
            billing_details:
            {
                email :user?.email,
            }
        }
    })
    if(confirmPaymentErr){
        console.log('confirmpay.. err-->', confirmPaymentErr)
    }else{
        console.log('paymentIntent-->',paymentIntent)
    }
  };



  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className=" bg-white space-y-6 p-10 shadow-2xl rounded-xl"
      >
        {/* name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            defaultValue={user?.displayName || ""}
            name="name"
            type="text"
            placeholder="Name"
            className="input input-bordered"
            required
            readOnly
          />
        </div>
        {/* email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            defaultValue={user?.email || ''}
            name="email"
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
            readOnly
          />
        </div>
        {/* donation-amount */}
        <div>
          <label className="label">
            <span className="label-text">Donation Amount</span>
          </label>
          <input
            type="number"
            defaultValue={donationAmount}
            onChange={handleDonationChange}
            className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Enter your donation amount"
            min="1"
          />
        </div>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#0091bd",
                    border: "2px solid black",
                    "::placeholder": {
                      color: "#211f1f",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            {err && <p className="text-base font-bold text-red-600 mt-3">{err}</p>}
            <button
              className="btn bg-pinkShade text-white hover:text-highlight duration-100"
              type="submit"
              disabled={!stripe || !clientSecret}
            >
              Donate Now
            </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
