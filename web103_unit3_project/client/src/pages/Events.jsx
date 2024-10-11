import React, { useState, useEffect } from "react";
import { getAllEvents } from "../services/EventsAPI";
import "./Events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all events when the component is mounted
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getAllEvents();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="events-container">
      <h1>All Events</h1>
      <ul className="events-list">
        {events.length > 0 ? (
          events.map((event) => (
            <li key={event.id}>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <p>Event Date: {new Date(event.event_date).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <p>No events available</p>
        )}
      </ul>
    </div>
  );
};

export default Events;
