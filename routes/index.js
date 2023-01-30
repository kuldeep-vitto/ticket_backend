import express from "express";
import authRoutes from './auth.js';
import theaterRoutes from './theaters.js';
import showRoutes from './shows.js';
import ticketRoutes from './tickets.js';
const app = express();
app.get("/", (req, res) => {
  res.send("Movie Ticket Booking API v1.0.0!");
});
app.use('/auth', authRoutes);
app.use('/theaters', theaterRoutes);
app.use('/shows', showRoutes);
app.use('/tickets', ticketRoutes);

export default app;