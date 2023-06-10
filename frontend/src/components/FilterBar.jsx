import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SERVER } from "../config";
import { getAllProducts } from "../redux/action/product";

const FilterBar = () => {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchCategories() {
      const { data } = await axios.get(SERVER + "/products/categories");
      setCategories(["all", ...data]);
    }
    fetchCategories();
  }, []);

  const onClikHandler = (e) => {
    const _category =
      e.target.value && e.target.value !== "all" ? e.target.value : null;
    dispatch(getAllProducts({ category: _category }));
    console.log(_category);
  };

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex pl-3 bg-white py-3 rounded-t-sm">
        <h1 className="font-semibold text-xl">Filters</h1>
      </div>
      <div className="flex pl-3 bg-white py-3 rounded-t-sm flex-col">
        <h3 className="text-sm font-medium">CATEGORIES</h3>
        <div className="pl-2 pt-2">
          {categories.map((v, i) => {
            return (
              <div key={i} className="flex items-center justify-start gap-2">
                <input
                  id={v}
                  type="radio"
                  name="category"
                  value={v}
                  className="hover:cursor-pointer"
                  onClick={onClikHandler}
                />
                <label htmlFor={v} className="hover:cursor-pointer">
                  {v}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
