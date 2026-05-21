import * as satellite from 'satellite.js'

const tleLine1 =
  '1 25544U 98067A   24130.51884259  .00016717  00000+0  30289-3 0  9990'

const tleLine2 =
  '2 25544  51.6416 153.0953 0003580  70.4894  47.0065 15.49815369452124'

const satrec = satellite.twoline2satrec(
  tleLine1,
  tleLine2
)

export function getISSPosition(date = new Date()) {
  const positionAndVelocity =
    satellite.propagate(satrec, date)

  const positionEci =
    positionAndVelocity.position

  if (!positionEci) return null

  const gmst = satellite.gstime(date)

  const positionGd =
    satellite.eciToGeodetic(
      positionEci,
      gmst
    )

  const latitude =
    satellite.degreesLat(positionGd.latitude)

  const longitude =
    satellite.degreesLong(positionGd.longitude)

  const altitude =
    positionGd.height

  return {
    latitude,
    longitude,
    altitude,
  }
}