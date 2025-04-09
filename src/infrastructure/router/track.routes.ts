import { makeTrackOneObjectController } from '@factories/controllers';
import { FastifyInstance } from 'fastify';

export const trackRoutes = async (app: FastifyInstance) => {
  app.get('/track/:trackingCode', async (request, reply) => {
    const trackOneObjectController = makeTrackOneObjectController();

    return trackOneObjectController.handle(request, reply);
  });
};
