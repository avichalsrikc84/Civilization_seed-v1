import { useUniverseStore } from "../../store/universeStore";

import SkillConstellation from "../constellations/SkillConstellation";
import KnowledgeNodes from "../world/KnowledgeNodes";

export default function KnowledgeLayer() {
  const stage = useUniverseStore(
    (s) => s.stage
  );

  return (
    <group visible={stage === 2}>
      <KnowledgeNodes />
      <SkillConstellation />
    </group>
  );
}