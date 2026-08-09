import FloatingBadge from "../ui/FloatingBadge";
import AnimatedDot from "../ui/AnimatedDot";

export default function StatusPills() {
  return (
    <div
      className="
      absolute
      bottom-4
      left-1/2
      -translate-x-1/2

      flex
      gap-3

      pointer-events-none
      "
    >
      <FloatingBadge>
        <div className="flex items-center gap-2">
          <AnimatedDot />
          Online
        </div>
      </FloatingBadge>

      <FloatingBadge>
        GitHub Connected
      </FloatingBadge>

      <FloatingBadge>
        3 Agents Active
      </FloatingBadge>
    </div>
  );
}