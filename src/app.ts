import { TrackingError } from '@errors/tracking.error';
import fastify from 'fastify';
import { ZodError } from 'zod';

export const app = fastify();

// Define the error handler
app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation Env's Error",
      error: error.format(),
    });
  }

  if (error instanceof TrackingError) {
    return reply.status(400).send({
      message: error.message,
      error: error.note,
    });
  }

  return reply.status(500).send({
    message: 'Internal Server Error',
    error: error.message,
  });
});
