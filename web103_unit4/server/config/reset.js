import { pool } from "./database.js";
import { cars } from "../data/cars.js";
import { exteriors } from "../data/exteriors.js";
import { interiors } from "../data/interiors.js";
import { roofs } from "../data/roofs.js";
import { wheels } from "../data/wheels.js";

const createCarsTable = async () => {
  const createCarsTableQuery = `
    DROP TABLE IF EXISTS cars;
    
    CREATE TABLE IF NOT EXISTS cars (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      isconvertible BOOLEAN NOT NULL,
      exterior INTEGER NOT NULL,
      roof INTEGER NOT NULL,
      wheels INTEGER NOT NULL,
      interior INTEGER NOT NULL,
      price REAL NOT NULL   
    ); 
  `;
  try {
    await pool.query(createCarsTableQuery);
    console.log("cars table created successfully");
  } catch (err) {
    console.error(`Failed to create cars table: ${err}`);
  }
};

const createExteriorsTable = async () => {
  const createExteriorsTableQuery = `
    DROP TABLE IF EXISTS exteriors;

    CREATE TABLE IF NOT EXISTS exteriors (
      id SERIAL PRIMARY KEY,
      color VARCHAR(255) NOT NULL,
      image TEXT NOT NULL,
      price REAL NOT NULL 
    ); 
  `;
  try {
    await pool.query(createExteriorsTableQuery);
    console.log("exteriors table created successfully");
  } catch (err) {
    console.error(`Failed to create exteriors table: ${err}`);
  }
};

const createRoofsTable = async () => {
  const createRoofsTableQuery = `
    DROP TABLE IF EXISTS roofs;

    CREATE TABLE IF NOT EXISTS roofs (
      id SERIAL PRIMARY KEY,
      color VARCHAR(255) NOT NULL,
      image TEXT NOT NULL,
      price REAL NOT NULL,
      isconvertible BOOLEAN NOT NULL  
    ); 
  `;
  try {
    await pool.query(createRoofsTableQuery);
    console.log("roofs table created successfully");
  } catch (err) {
    console.error(`Failed to create roofs table: ${err}`);
  }
};

const createWheelsTable = async () => {
  const createWheelsTableQuery = `
    DROP TABLE IF EXISTS wheels;

    CREATE TABLE IF NOT EXISTS wheels (
      id SERIAL PRIMARY KEY,
      color VARCHAR(255) NOT NULL,
      image TEXT NOT NULL,
      price REAL NOT NULL 
    ); 
  `;
  try {
    await pool.query(createWheelsTableQuery);
    console.log("wheels table created successfully");
  } catch (err) {
    console.error(`Failed to create wheels table: ${err}`);
  }
};

const createInteriorsTable = async () => {
  const createInteriorsTableQuery = `
    DROP TABLE IF EXISTS interiors;

    CREATE TABLE IF NOT EXISTS interiors (
      id SERIAL PRIMARY KEY,
      color VARCHAR(255) NOT NULL,
      image TEXT NOT NULL,
      price REAL NOT NULL,
      iscombo BOOLEAN 
    ); 
  `;
  try {
    await pool.query(createInteriorsTableQuery);
    console.log("interiors table created successfully");
  } catch (err) {
    console.error(`Failed to create interiors table: ${err}`);
  }
};

const seedDataToCarsTable = async () => {
  try {
    await createCarsTable();

    for (const car of cars) {
      const { name, isconvertible, exterior, roof, wheels, interior, price } =
        car;

      const insertCarQuery = `INSERT INTO cars(name, isconvertible, exterior, roof, wheels, interior, price) VALUES ($1, $2, $3, $4, $5, $6, $7);`;
      const values = [
        name,
        isconvertible,
        exterior,
        roof,
        wheels,
        interior,
        price,
      ];

      await pool.query(insertCarQuery, values);
      console.log(`${name} has been inserted successfully`);
    }
  } catch (err) {
    console.error(`Failed to seed data to cars table: ${err}`);
  }
};

const seedDataToExteriorsTable = async () => {
  try {
    await createExteriorsTable();

    for (const exterior of exteriors) {
      const { color, image, price } = exterior;

      const insertExteriorQuery = `INSERT INTO exteriors(color, image, price) VALUES ($1, $2, $3);`;
      const values = [color, image, price];

      await pool.query(insertExteriorQuery, values);
      console.log(`${color} has been inserted successfully`);
    }
  } catch (err) {
    console.error(`Failed to seed data to exteriors table: ${err}`);
  }
};

const seedDataToInteriorsTable = async () => {
  try {
    await createInteriorsTable();

    for (const interior of interiors) {
      const { color, image, price, iscombo } = interior;

      const insertInteriorQuery = `INSERT INTO interiors(color, image, price, iscombo) VALUES ($1, $2, $3, $4)`;
      const values = [color, image, price, iscombo];

      await pool.query(insertInteriorQuery, values);
      console.log(`${color} has been inserted successfully`);
    }
  } catch (err) {
    console.error(`Failed to seed data to interiors table: ${err}`);
  }
};

const seedDataToRoofsTable = async () => {
  try {
    await createRoofsTable();

    for (const roof of roofs) {
      const { color, image, price, isconvertible } = roof;

      const insertRoofQuery = `INSERT INTO roofs(color, image, price, isconvertible) VALUES ($1, $2, $3, $4)`;
      const values = [color, image, price, isconvertible];

      await pool.query(insertRoofQuery, values);
      console.log(`${color} has been inserted successfully`);
    }
  } catch (err) {
    console.error(`Failed to seed data to roofs table: ${err}`);
  }
};

const seedDataToWheelsTable = async () => {
  try {
    await createWheelsTable();

    for (const wheel of wheels) {
      const { color, image, price } = wheel;

      const insertCarQuery = `INSERT INTO wheels(color, image, price) VALUES ($1, $2, $3)`;
      const values = [color, image, price];

      await pool.query(insertCarQuery, values);
      console.log(`${color} has been inserted successfully`);
    }
  } catch (err) {
    console.error(`Failed to seed data to wheels table: ${err}`);
  }
};

const createAllTables = async () => {
  await createCarsTable();
  await createExteriorsTable();
  await createInteriorsTable();
  await createRoofsTable();
  await createWheelsTable();
};

const seedAllDataToTables = async () => {
  await seedDataToCarsTable();
  await seedDataToExteriorsTable();
  await seedDataToInteriorsTable();
  await seedDataToRoofsTable();
  await seedDataToWheelsTable();
};

createAllTables();
seedAllDataToTables();
