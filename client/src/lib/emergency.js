// Dependencies are supplied by the UI so failed GPS acquisition cannot dispatch a fictitious location.
export async function dispatchEmergency(message, locate, send) {
  const point = await locate();
  if (!point || point.latitude == null || point.longitude == null || !Number.isFinite(Number(point.latitude)) || !Number.isFinite(Number(point.longitude)) || Math.abs(Number(point.latitude)) > 90 || Math.abs(Number(point.longitude)) > 180) throw new Error('Your live GPS location is unavailable. Enable location access and try again.');
  return send({ latitude: Number(point.latitude), longitude: Number(point.longitude), accuracy: point.accuracy ?? null, message });
}
