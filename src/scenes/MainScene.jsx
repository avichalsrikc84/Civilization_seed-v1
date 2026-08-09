import Planet from "../components/world/Planet";
import SpaceDust from "../components/world/SpaceDust";
import CameraRig from "../components/effects/CameraRig";
import StageManager from "../components/layers/StageManager";
import CameraFocusRig from "../components/network/CameraFocusRig";

import AthenaPresence from "../components/athena/AthenaPresence";

export default function MainScene() {
  return (
    <>
      <CameraRig />

      <CameraFocusRig />

      <Planet />

      <AthenaPresence />

      <StageManager />

      <SpaceDust />
    </>
  );
}