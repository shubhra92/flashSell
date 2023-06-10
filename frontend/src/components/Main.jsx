import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/action/product";
import FilterBar from "./FilterBar";
import ProductCard from "./ProductCard";

const Main = () => {
  const { Products } = useSelector((state) => state.Products);
  const { SearchStr } = useSelector((state) => state.SearchStr);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const _Products = Products.filter((x) =>
      x.title.toLowerCase().includes(SearchStr.toLowerCase())
    );
    setProducts(_Products);
  }, [Products, SearchStr]);

  return (
    <div className="main">
      <div className="w-full bg-slate-200 h-full filter pt-3 px-2">
        <FilterBar />
      </div>
      <div className="products flex flex-wrap gap-7 pt-5 pb-10 px-5 justify-center items-start gap-y-24">
        {products.length ? (
          products.map((doc) => {
            return <ProductCard key={doc._id} data={doc} />;
          })
        ) : (
          <h1>No products found!</h1>
        )}
      </div>
    </div>
  );
};

export default Main;
