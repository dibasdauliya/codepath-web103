import React, { useEffect, useState } from "react";
import "../App.css";
import carsAPI from "../services/carsAPI";
import optionsAPI from "../services/optionsAPI";
import Option from "../components/Option";
import { Link } from "react-router-dom";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [options, setOptions] = useState({
    exteriors: [],
    roofs: [],
    wheels: [],
    interiors: [],
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [carsData, exteriorsData, roofsData, wheelsData, interiorsData] =
          await Promise.all([
            carsAPI.getAllCars(),
            optionsAPI.fetchExteriors(),
            optionsAPI.fetchRoofs(),
            optionsAPI.fetchWheels(),
            optionsAPI.fetchInteriors(),
          ]);
        setCars(carsData);
        setOptions({
          exteriors: exteriorsData,
          roofs: roofsData,
          wheels: wheelsData,
          interiors: interiorsData,
        });
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchAllData();
  }, []);

  const findOptionColor = (car, type) => {
    const convertedTypeToPlural = type.endsWith("s") ? type : `${type}s`;

    const foundOption = options[convertedTypeToPlural].find(
      (option) => option.id === car[type]
    );

    return foundOption?.color || "None";
  };

  return (
    <main className="car__group">
      {cars.map((car) => (
        <article key={car.id} className="car__card">
          <header className="car__header">
            {car.isconvertible ? "🏎️" : "🚗"}
            <h3>{car.name}</h3>
          </header>
          <div className="car__content">
            <div className="card-summary">
              <Option
                emoji="🖌️"
                type="exterior"
                findOptionColor={findOptionColor}
                car={car}
              />
              <Option
                emoji="🛞"
                type="roof"
                findOptionColor={findOptionColor}
                car={car}
              />
              <Option
                emoji="😎"
                type="wheels"
                findOptionColor={findOptionColor}
                car={car}
              />
              <Option
                emoji="💺"
                type="interior"
                findOptionColor={findOptionColor}
                car={car}
              />
            </div>
            <div className="car__footer">
              <p>${car.price}</p>
              <Link to={`/customcars/${car.id}`}>Details</Link>
            </div>
          </div>
        </article>
      ))}
    </main>
  );
};

export default ViewCars;
