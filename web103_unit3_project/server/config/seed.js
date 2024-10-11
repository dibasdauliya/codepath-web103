import { pool } from "./database.js"; // Import the database connection

const createTables = async () => {
  try {
    // Create locations table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT
      );
    `);

    console.log("Locations table created successfully!");

    // Create events table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        event_date TIMESTAMP,
        location_id INTEGER REFERENCES locations(id)
      );
    `);

    console.log("Events table created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
};

const seedDatabase = async () => {
  try {
    await createTables(); // Ensure tables are created before seeding

    // Insert locations
    await pool.query(`
      INSERT INTO locations (name, description)
      VALUES 
      ('Community Center', 'A large hall for community events'),
      ('City Park', 'An outdoor venue for events in the park'),
      ('Downtown Library', 'An indoor venue for cultural and educational events'),
        ('Sports Stadium', 'A large sports arena for sporting events');
    `);

    console.log("Locations inserted successfully!");

    // Insert events
    await pool.query(`
      INSERT INTO events (title, description, event_date, location_id)
      VALUES 
      ('Music Concert', 'Live music event featuring local bands.', '2024-10-15 18:00:00', 1),
      ('Art Fair', 'An outdoor art exhibition featuring local artists.', '2024-11-01 12:00:00', 2),
      ('Charity Run', 'A 5k run for raising money for local charities.', '2024-10-22 09:00:00', 2),
      ('Book Club Meeting', 'Monthly meeting for book lovers.', '2024-10-17 17:30:00', 1),
      ('Coding Workshop', 'A beginner-friendly coding workshop.', '2024-11-10 10:00:00', 3);
    `);

    console.log("Events inserted successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    pool.end(); // Close the database connection
  }
};

// Call the function to seed the database
seedDatabase();
