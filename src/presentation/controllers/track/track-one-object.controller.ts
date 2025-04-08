import { ITrackOneObjectUseCase } from '@domain/usecases/track-one-object.usecase.interface';
import { TrackingPresenter } from '@presenters/tracking.presenter';
import { FastifyReply, FastifyRequest } from 'fastify';

export class TrackOneObjectController {
  constructor(
    private readonly _trackOneObjectUseCase: ITrackOneObjectUseCase,
  ) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const { trackingCode } = request.params as { trackingCode: string };

      const { package: packageDetails, tracks } =
        await this._trackOneObjectUseCase.execute({
          code: trackingCode,
        });

      return response
        .status(200)
        .send(
          TrackingPresenter.toJSON({ package: packageDetails, tracks }),
        );
    } catch (error) {
      return response.send(error);
    }
  }
}
