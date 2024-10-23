import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { calculateTotalPrice } from "../utilities/validation";
import carsAPI from "../services/carsAPI";

const CreateCar = () => {
  const [car, setCar] = useState({
    name: "",
    isconvertible: false,
    exterior: 0,
    roof: 0,
    wheels: 0,
    interior: 0,
    price: 65000,
    totalPrice: 65000,
  });

  const [options, setOptions] = useState([]);

  const [optionsPrice, setOptionsPrice] = useState({
    exterior: 0,
    roof: 0,
    wheels: 0,
    interior: 0,
  });

  const navigate = useNavigate("/");

  const showOptions = async (item) => {
    const pluralizedItem = item.endsWith("s") ? item : `${item}s`;
    const res = await fetch(`http://localhost:3000/api/${pluralizedItem}`);
    const data = await res.json();
    const updatedData = data.map((option) => ({ ...option, type: item }));
    setOptions(updatedData);
  };

  const handleAddOption = (type, price, color) => {
    console.log(type);
    const option = options.find((option) => option.color === color);
    setCar((prev) => ({ ...prev, [type]: option.id }));
    setOptionsPrice((prev) => {
      const updatedOptionsPrice = { ...prev, [type]: price };
      const totalPrice = calculateTotalPrice(car.price, updatedOptionsPrice);
      setCar((prev) => ({ ...prev, totalPrice }));
      return updatedOptionsPrice;
    });
  };

  const handleToggleConvertible = () => {
    setCar((prev) => {
      const updatedPrice = !prev.isconvertible ? prev.price + 10000 : 65000;
      return {
        ...prev,
        isconvertible: !prev.isconvertible,
        price: updatedPrice,
        totalPrice: updatedPrice,
      };
    });
  };

  const handleNameInput = (e) => {
    setCar((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleCreateCarSubmit = async (e) => {
    e.preventDefault();
    const newCar = { ...car, price: car.totalPrice };
    await carsAPI.createCar(newCar);
    navigate("/customcars");
  };

  return (
    <form onSubmit={handleCreateCarSubmit}>
      <div>
        <input
          type="checkbox"
          onChange={handleToggleConvertible}
          checked={car.isconvertible}
        />
        <label htmlFor="">Convertible</label>
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name..."
          value={car.name}
          onChange={handleNameInput}
        />
      </div>
      <div>
        {["exterior", "roof", "wheels", "interior"].map((item) => (
          <button key={item} type="button" onClick={() => showOptions(item)}>
            {item}
          </button>
        ))}
      </div>
      <ul>
        {options?.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              onClick={() =>
                handleAddOption(option.type, option.price, option.color)
              }
            >
              {option.color} - ${option.price}
            </button>
          </li>
        ))}
      </ul>
      <h3>${car.totalPrice}</h3>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateCar;
