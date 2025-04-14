import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from './../src/app';

describe('TrackOneObject (E2E)', () => {
  beforeAll(async () => {
    app.ready();
  });

  afterAll(async () => {
    app.close();
  });

  it('should be able to track one object', async () => {
    const trackingCode = 'NM768198985BR';

    const response = await app.inject({
      method: 'GET',
      url: `/track/${trackingCode}`,
    });

    const body = response.json();

    expect(response.statusCode).toEqual(200);
    expect(body).toHaveProperty('code');
    expect(body).toHaveProperty('type');
    expect(body).toHaveProperty('tracks');

    expect(body.code).toEqual(trackingCode);
    expect(body.type).toEqual('PACKET STANDARD IMPORTAÇÃO');
    expect(body.tracks).toBeInstanceOf(Array);
    expect(body.tracks.length).toBeGreaterThan(0);
  });

  it('should not be able to track one object', async () => {
    const trackingCode = 'NM879209096BR'; // Non-existent tracking code

    const response = await app.inject({
      method: 'GET',
      url: `/track/${trackingCode}`,
    });

    const body = response.json();

    expect(response.statusCode).toEqual(404);
    expect(body).toHaveProperty('message');
    expect(body).toHaveProperty('error');

    expect(body.message).toEqual(
      'Ainda não há informações disponíveis sobre esse objeto no sistema dos Correios.',
    );

    expect(body.error).contains(
      'os dados de rastreio podem ainda não estar disponíveis',
    );
  });
});
