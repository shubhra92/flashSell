import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { BsStarFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SERVER } from "../config";

const Edit = () => {
  const { Order } = useSelector((state) => state.Order);
  const { User } = useSelector((state) => state.User);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();

  const [price, setPrice] = useState(Order?.price || 0);
  const [title, setTitle] = useState(Order?.title || "");
  const [quantity, setQuantity] = useState(Order?.quantity || 0);
  const [description, setDescription] = useState(Order?.description || "");
  const [image, setImage] = useState(Order?.image || "");
  const initialValue = [
    { label: "Price", data: price, setData: setPrice, style: "h-8 w-20" },
    { label: "Title", data: title, setData: setTitle, style: "h-16 w-full" },
    {
      label: "Stock Quantity",
      data: quantity,
      setData: setQuantity,
      style: "h-8 w-20",
    },
    {
      label: "Description",
      data: description,
      setData: setDescription,
      style: "h-28 w-full",
    },
    {
      label: "Image Link",
      data: image,
      setData: setImage,
      style: "h-20 w-full",
    },
  ];
  const style = [
    "h-8 w-20",
    "h-16 w-full",
    "h-8 w-20",
    "h-28 w-full",
    "h-20 w-full",
  ];
  const [editable, setEditable] = useState(initialValue);
  const [currnt, setCerrnt] = useState(0);

  if (User?.type !== "admin" || !Order) {
    setTimeout(() => navigate("/"), 500);
    return null;
  }

  const ratigBadColor =
    Order?.rating?.rate >= 2 ? "bg-yellow-500" : "bg-red-500";

  const applyClickHandler = () => {
    editable.forEach((obj) => {
      obj.setData(obj.data);
    });
  };
  const updateClickHandler = () => {
    async function updateCall() {
      try {
        await axios.put(
          `${SERVER}/product`,
          {
            price,
            title,
            quantity,
            description,
            image,
            product_Id: Order._id,
          },
          { headers: { Authorization: `Bearer ${cookies?.token}` } }
        );
        alert("product update successful!");
      } catch (error) {
        alert("error:", error.message);
      }
    }
    updateCall();
  };

  return (
    <div className="main order">
      <div className="border-2 flex items-center leftSideBar">
        <img
          src={image}
          alt="not found"
          className="object-contain aspect-[3/2] flex items-center"
        />
      </div>
      <div className="rightSideBar px-5 pt-4">
        <div className="w-full border-2 rounded-md px-4 py-2">
          <h1 className="font-semibold">Product Detail</h1>
          <h2 className="font-normal mb-3">{title}</h2>
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
            <span>{price}</span>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <span className="text-sm font-semibold">Stock Quantity</span>
            <span className="border-2 py-0 px-2 rounded-md font-serif">
              {quantity}
            </span>
          </div>
          <div className="flex gap-3 text-xs mt-5">
            <span className="text-gray-500 font-semibold">Description</span>
            <p className="border border-gray-100 rounded px-1 py-1">
              {description}
            </p>
          </div>
        </div>
        <div className="mt-3 border-2 rounded-md px-4 py-2">
          <ul className="flex justify-between">
            {editable.map((v, i) => {
              const style =
                currnt === i ? "bg-green-400" : "hover:bg-slate-100";
              return (
                <li
                  key={i}
                  onClick={() => setCerrnt(i)}
                  className={`text-sm font-medium rounded-md py-1 px-2 border-2 transition cursor-pointer ${style}`}
                >
                  {v.label}
                </li>
              );
            })}
          </ul>
          <div className="mt-7">
            <div className="flex items-start gap-2">
              <label htmlFor={editable[currnt].label} className="font-semibold">
                {editable[currnt].label}
              </label>
              <textarea
                id={editable[currnt].label}
                value={editable[currnt].data}
                className={`focus:outline-none text-sm font-medium border-2 rounded-md px-3 py-1 resize-none transform transition ${style[currnt]}`}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    editable[currnt].label === "Price" &&
                    (value === "" || Number(value))
                  ) {
                    const _editable = [...editable];
                    _editable[currnt] = {
                      ..._editable[currnt],
                      data: +value || 0,
                    };
                    setEditable(_editable);
                  } else if (
                    editable[currnt].label === "Stock Quantity" &&
                    (value === "" || /^[0-9]+$/.test(value))
                  ) {
                    const _editable = [...editable];
                    _editable[currnt] = {
                      ..._editable[currnt],
                      data: +value || 0,
                    };
                    setEditable(_editable);
                  } else if (
                    editable[currnt].label !== "Price" &&
                    editable[currnt].label !== "Stock Quantity"
                  ) {
                    const _editable = [...editable];
                    _editable[currnt] = { ..._editable[currnt], data: value };
                    setEditable(_editable);
                  }
                }}
              />
            </div>
            <div className="flex gap-2 justify-center mt-7 mb-3">
              <button
                onClick={applyClickHandler}
                className="w-52 h-10 bg-orange-500 rounded text-gray-100 font-semibold"
              >
                Apply
              </button>
              <button
                onClick={updateClickHandler}
                className="w-52 h-10 bg-green-500 rounded text-gray-100 font-semibold"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
