import test from 'node:test';
import assert from 'node:assert/strict';
import { dispatchEmergency } from '../../../client/src/lib/emergency.js';

test('Panic dispatch never submits invented coordinates after GPS failure', async () => {
  let sent = 0;
  const send = async () => { sent++; };
  await assert.rejects(dispatchEmergency('Help', async () => { throw new Error('Location permission denied'); }, send), /permission denied/);
  for (const point of [null, {}, { latitude: null, longitude: null }, { latitude: 91, longitude: 3 }]) await assert.rejects(dispatchEmergency('Help', async () => point, send), /live GPS/);
  assert.equal(sent, 0);
  const result = await dispatchEmergency('Help', async () => ({ latitude: 0, longitude: 0, accuracy: 0 }), async payload => payload);
  assert.deepEqual(result, { latitude: 0, longitude: 0, accuracy: 0, message: 'Help' });
  const unknownAccuracy = await dispatchEmergency('Help', async () => ({ latitude: 6, longitude: 3 }), async payload => payload);
  assert.equal(unknownAccuracy.accuracy, null);
  await assert.rejects(dispatchEmergency('Help', async () => ({ latitude: 6, longitude: 3 }), async () => { throw new Error('Network unavailable'); }), /Network unavailable/);
});
