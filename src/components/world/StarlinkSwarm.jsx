import StarlinkSatellite from './StarlinkSatellite'

export default function StarlinkSwarm() {
  const satellites = []

  for (let i = 0; i < 60; i++) {
    satellites.push(
      <StarlinkSatellite
        key={i}
        radius={
          4.8 + Math.random() * 1.2
        }
        speed={
          0.12 + Math.random() * 0.12
        }
        offset={i * 0.4}
        inclination={i * 0.2}
      />
    )
  }

  return <>{satellites}</>
}