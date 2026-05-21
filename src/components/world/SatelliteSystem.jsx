import Satellite from './Satellite'

export default function SatelliteSystem() {
  return (
    <>
      <Satellite
        radius={3.4}
        speed={0.25}
        offset={0}
      />

      <Satellite
        radius={3.8}
        speed={0.18}
        offset={2}
        color="#38bdf8"
      />

      <Satellite
        radius={4.2}
        speed={0.12}
        offset={4}
        color="#818cf8"
      />
    </>
  )
}