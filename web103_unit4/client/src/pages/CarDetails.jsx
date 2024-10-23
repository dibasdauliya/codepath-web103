import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import carsAPI from "../services/carsAPI";
import optionsAPI from "../services/optionsAPI";

const CarDetails = () => {
  const [car, setCar] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarById = async () => {
      try {
        const data = await carsAPI.getCarById(id);
        const [exteriorData, roofData, wheelsData, interiorData] =
          await Promise.all([
            optionsAPI.fetchExteriorById(data.exterior),
            optionsAPI.fetchRoofById(data.roof),
            optionsAPI.fetchWheelsById(data.wheels),
            optionsAPI.fetchInteriorById(data.interior),
          ]);

        const exteriorColor = exteriorData?.color || "none";
        const roofColor = roofData?.color || "none";
        const wheelsColor = wheelsData?.color || "none";
        const interiorColor = interiorData?.color || "none";

        setCar({
          ...data,
          exterior: exteriorColor,
          roof: roofColor,
          wheels: wheelsColor,
          interior: interiorColor,
        });
      } catch (err) {
        console.error(`Failed to fetch a car data`, err);
      }
    };

    fetchCarById();
  }, [id]);

  const handleDeleteCar = async () => {
    try {
      await carsAPI.deleteCar(car.id);
      navigate("/customcars");
    } catch (err) {
      console.error("Failed to delete a car", err);
    }
  };

  return (
    <article className="car-full-details">
      <header>
        <img src="" alt="" />
        {car?.name}
      </header>
      <div className="details-content">
        <div className="car-details-price">
          <p>${car?.price}</p>
        </div>
      </div>
      <div>
        <p>Exterior: {car?.exterior}</p>
        <p>Roof: {car?.roof}</p>
        <p>Wheels: {car?.wheels}</p>
        <p>Interior: {car?.interior}</p>
      </div>
      <div>
        <Link to={`/edit/${car?.id}`}>Edit</Link>
        <button onClick={handleDeleteCar}>Delete</button>
      </div>
    </article>
  );
};

export default CarDetails;
