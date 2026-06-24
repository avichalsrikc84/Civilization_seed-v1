import Planet
  from '../components/world/Planet'

import SpaceDust
  from '../components/world/SpaceDust'

import RealSatellite
  from '../components/world/RealSatellite'

import StarlinkSwarm
  from '../components/world/StarlinkSwarm'

import CivilizationNodes
  from '../components/world/CivilizationNodes'

import CameraRig
  from '../components/effects/CameraRig'

import { useCivilizationStore }
  from '../store/civilizationStore'

import SkillConstellation
from '../components/constellations/SkillConstellation'

export default function MainScene() {
  const stage =
    useCivilizationStore(
      (state) => state.stage
    )

  return (
    <>
      <CameraRig />

      <Planet />

      <SkillConstellation />


      {stage >= 5 && (
        <>
          <RealSatellite />

          <StarlinkSwarm />
        </>
      )}

      <SpaceDust />
    </>
  )
}