import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { BsStarFill } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SERVER } from "../config";

const orderUrl = {
  create: `${SERVER}/order`,
};

const Order = () => {
  const { Order } = useSelector((state) => state.Order);
  const { User } = useSelector((state) => state.User);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const [city, setCity] = useState({
    data: User?.address?.city || "",
    color: "",
    err: "",
  });
  const [zipcode, setZipcode] = useState({
    data: User?.address?.zipcode || "",
    color: "",
    err: "",
  });
  const [street, setStreet] = useState({
    data: User?.address?.street || "",
    color: "",
    err: "",
  });
  const [address, setAddress] = useState({
    data: User?.address?.address || "",
    color: "",
    err: "",
  });
  const [quantity, setQuantity] = useState(1);

  const totalPrice = (Order?.price || 0) * quantity;

  if (!Order) {
    setTimeout(() => navigate("/"), 500);
    return null;
  }

  const orderPlaceHandler = () => {
    let countErr = 0;

    //validation
    if (!validationFunc(city, setCity, "city")) countErr++;
    if (!validationFunc(zipcode, setZipcode, "zipcode")) countErr++;
    if (!validationFunc(street, setStreet, "street")) countErr++;
    if (!validationFunc(address, setAddress, "address")) countErr++;

    if (countErr === 0) {
      async function createOrderfunc() {
        try {
          const Address = {
            address: address.data,
            city: city.data,
            zipcode: zipcode.data,
            street: street.data,
          };
          await axios.post(
            orderUrl.create,
            {
              address: Address,
              quantity,
              totalPrice,
              product_Id: Order?.id,
            },
            { headers: { Authorization: `Bearer ${cookies?.token}` } }
          );
          alert("Order placed successfull!");
          setTimeout(() => navigate("/"), 500);
        } catch (error) {
          console.log(error.message);
        }
      }
      createOrderfunc();
    }
  };

  const ratigBadColor =
    Order?.rating?.rate >= 2 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="main order">
      <div className="border-2 flex items-center leftSideBar">
        <img
          src={Order.image}
          alt=""
          className="object-contain aspect-[3/2] flex items-center"
        />
      </div>
      <div className="rightSideBar px-5 pt-4">
        <div className="w-full border-2 rounded-md px-4 py-2">
          <h1 className="font-semibold">Product Detail</h1>
          <h2 className="font-normal mb-3">{Order.title}</h2>
          <div className="flex gap-3">
            <span
              className={`px-2 py-px text-white font-semibold rounded-md text-sm ${
                Order?.rating?.rate >= 3 ? "bg-green-600" : ratigBadColor
              }`}
            >
              {Order?.rating?.rate}
              <BsStarFill
                size={10}
                className="inline-block relative bottom-[2px] ml-1"
              />
            </span>
            <span className="text-sm font-semibold text-gray-400">
              {Order.rating.count} Rating
            </span>
          </div>
          <div className="text-2xl font-semibold mt-3 flex gap-1">
            <span>$</span>
            <span>{Order.price}</span>
          </div>
          <div className="flex gap-3 text-xs mt-5">
            <span className="text-gray-500 font-semibold">Description</span>
            <p className="border border-gray-100 rounded px-1 py-1">
              {Order.description}
            </p>
          </div>
        </div>
        <div className="border-2 rounded-md px-4 py-2 flex justify-between mt-2">
          <div className="font-semibold text-sm">
            <span className="flex gap-2 flex-wrap h-full items-center">
              Buying Quantity{" "}
              <span className="select-none">
                <span>
                  <span
                    className="font-mono border-2 rounded-md px-2 py-1 cursor-pointer"
                    onClick={() => {
                      setQuantity((curr) => (curr > 1 ? curr - 1 : curr));
                    }}
                  >
                    -
                  </span>{" "}
                  <span className="font-mono border-2 rounded-md px-2 py-1">
                    {quantity}
                  </span>{" "}
                  <span
                    className="font-mono border-2 rounded-md px-2 py-1 cursor-pointer"
                    onClick={() =>
                      setQuantity((curr) =>
                        curr < Order?.quantity ? +curr + 1 : curr
                      )
                    }
                  >
                    +
                  </span>
                </span>
              </span>
            </span>
          </div>
          <div className="font-semibold text-sm">
            <span className="flex items-center gap-2 flex-wrap justify-center">
              Stock Quantity{" "}
              <span className="font-mono border-2 rounded-md px-2 py-1">
                {Order?.quantity || 1}
              </span>
            </span>
          </div>
        </div>
        <div className="border-2 rounded-md px-4 py-2 mt-2">
          <h1 className="font-semibold">Price Detail</h1>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex justify-between text-sm font-medium">
              <span>
                Price &#x28; {quantity} item{quantity > 1 ? "s" : ""} &#x29;
              </span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm font-medium">
              <span>Delivery Charges</span>
              <span className="text-green-600">FREE DELIVERY</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-700 border-t-2 border-dashed py-3">
              <span>Total Price</span>
              <span>${totalPrice}</span>
            </div>
          </div>
        </div>
        <div className="border-2 rounded-md px-4 py-2 mt-2">
          <h1 className="font-semibold">Delivery Address</h1>
          <div className="mt-4">
            <div className="text-sm font-medium flex gap-2 relative">
              <label htmlFor="address">Address :</label>
              <textarea
                value={address?.data}
                className={`w-full border-2 rounded flex-1 h-10 text-start resize-none focus:outline-none py-1 px-2 font-normal text-xs transition ${address.color} z-30`}
                id="address"
                onChange={(e) =>
                  setAddress({
                    ...address,
                    data: e.target.value,
                    color: "",
                    err: "",
                  })
                }
              />
              {address?.err && (
                <span className="absolute -top-3 left-[75px] text-[11px] text-red-600 bg-white z-30">
                  <RiErrorWarningLine className="inline-block" size={10} />{" "}
                  {address?.err}
                </span>
              )}
            </div>
            <div className="flex gap-2 mt-3 text-sm font-medium flex-wrap">
              <div className="flex-1 flex gap-2 relative">
                <label htmlFor="city">City :</label>
                <input
                  className={`flex-1 border-2 rounded-md focus:outline-none py-1 px-2 font-normal text-xs transition ${city.color} z-20`}
                  id="city"
                  value={city?.data}
                  onChange={(e) =>
                    setCity({
                      ...city,
                      data: e.target.value,
                      color: "",
                      err: "",
                    })
                  }
                />
                {city?.err && (
                  <span className="absolute -top-3 left-[50px] text-[11px] text-red-600 bg-white z-20">
                    <RiErrorWarningLine className="inline-block" size={10} />{" "}
                    {city?.err}
                  </span>
                )}
              </div>
              <div className="flex-1 flex gap-2 relative">
                <label htmlFor="street">Street :</label>
                <input
                  className={`flex-1 border-2 rounded-md focus:outline-none py-1 px-2 font-normal text-xs transition ${street.color} z-10`}
                  id="street"
                  value={street?.data}
                  onChange={(e) =>
                    setStreet({
                      ...street,
                      data: e.target.value,
                      color: "",
                      err: "",
                    })
                  }
                />
                {street?.err && (
                  <span className="absolute -top-3 left-16 text-[11px] text-red-600 bg-white z-10">
                    <RiErrorWarningLine className="inline-block" size={10} />{" "}
                    {street?.err}
                  </span>
                )}
              </div>
              <div className="flex-1 flex gap-2 relative">
                <label htmlFor="zipcode">Zipcode :</label>
                <input
                  className={`flex-1 border-2 rounded-md focus:outline-none py-1 px-2 font-normal text-xs transition ${zipcode.color}`}
                  id="zipcode"
                  value={zipcode?.data}
                  type="tel"
                  onChange={(e) =>
                    setZipcode({
                      ...zipcode,
                      data: e.target.value,
                      color: "",
                      err: "",
                    })
                  }
                />
                {zipcode?.err && (
                  <span className="absolute -top-3 left-[76px] text-[11px] text-red-600 bg-white">
                    <RiErrorWarningLine className="inline-block" size={10} />{" "}
                    {zipcode?.err}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="border-2 rounded-md px-4 py-2 mt-10 flex justify-between items-center flex-wrap">
          <span className="font-bold text-2xl">$ {totalPrice}</span>
          <div className="flex gap-2 flex-wrap">
            <button
              className="font-semibold rounded-md px-10 py-2 bg-yellow-400"
              onClick={() => orderPlaceHandler()}
            >
              Place Order
            </button>
            <Link to={"/"}>
              <button className="font-semibold rounded-md px-10 py-2 text-white bg-gray-400">
                Cancel Order
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

function validationFunc(value, setValue, name) {
  if (value?.data && typeof value.data === "string" && value.data.length > 0) {
    if (name === "zipcode" && !/^[0-9-]+$/.test(value.data)) {
      setValue({
        ...value,
        color: "border-red-400",
        err: `${name} should only contain (0-9,-)`,
      });
      return false;
    }
    return true;
  }
  setValue({ ...value, color: "border-red-400", err: `${name} is required!` });
  return false;
}
