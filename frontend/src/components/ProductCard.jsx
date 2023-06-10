import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { GiElectric } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOrder } from "../redux/action/order";

const ProductCard = ({ data }) => {
  data = data || {};
  const { User } = useSelector((state) => state.User);
  const rating = ["*", "*", "*", "*", "*"];
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const onClikHandler = () => {
    dispatch(setOrder(data));
    if (User?.type === "admin") {
      nevigate("/admin/edit");
    } else {
      nevigate("/order");
    }
  };

  return (
    <div className="w-64 border border-solid border-gray-100 rounded">
      <div className="w-full h-48 flex items-center justify-center bg-gray-50">
        <img
          src={data?.image}
          alt="no logo"
          className="object-contain aspect-[3/2]"
        />
      </div>
      <div>
        <h2 className="pl-2 pr-1 pt-1">{data.title}</h2>
        <div className="flex justify-start items-center gap-1 pl-2">
          {rating.map((v, i) => {
            const diff = data?.rating.rate - i;
            if (diff >= 1) {
              return <BsStarFill key={i} className="text-yellow-400" />;
            } else if (diff > 0) {
              return <BsStarHalf key={i} className="text-yellow-400" />;
            } else {
              return <BsStar key={i} className="text-yellow-400" />;
            }
          })}
          <span className="ml-1 font-semibold">{data?.rating.rate}</span>
          <span className="ml-2 text-[#007185] font-semibold">
            {data.rating.count}
          </span>
        </div>
        <div className="flex items-start gap-1 pl-2">
          <span className="mt-1 font-semibold">$</span>
          <span className="text-3xl font-semibold">{data?.price}</span>
        </div>
        <div className="flex items-center justify-center mt-2 mb-1 gap-1 mx-1">
          <button
            className="text-sm font-semibold bg-[#fb641b] py-3 rounded text-white w-full flex items-center justify-center gap-1"
            onClick={onClikHandler}
          >
            <GiElectric size={15} />{" "}
            {User?.type === "admin" ? "Edit" : "BUY NOW"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
