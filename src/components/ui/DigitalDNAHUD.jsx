import {
  useDigitalDNAStore,
} from '../../store/digitalDNAStore'

export default function DigitalDNAHUD() {
  const profile =
    useDigitalDNAStore(
      (s) => s.profile
    )

  const weaknesses =
    useDigitalDNAStore(
      (s) => s.weaknesses
    )

  return (
<div
  className="
absolute
bottom-10
left-6
z-50

w-[190px]

backdrop-blur-xl
bg-black/35

border
border-cyan-500/20

rounded-2xl

p-4
"
>
      <div
        className="
        text-cyan-300
        text-[11px]
        tracking-[0.25em]
      "
      >
        DIGITAL TWIN
      </div>

      <div
        className="
        mt-2
        text-white
        text-lg
        font-semibold
      "
      >
        {profile.name}
      </div>

      <div
        className="
        text-white/60
        text-xs
      "
      >
        {profile.role}
      </div>

      <div className="mt-4">
        <div
          className="
          flex
          justify-between
          text-xs
          text-white/80
        "
        >
          <span>
            Readiness
          </span>

          <span>
            {profile.readiness}%
          </span>
        </div>

        <div
          className="
          mt-2
          h-1.5
          bg-white/10
          rounded-full
          overflow-hidden
        "
        >
          <div
            className="
            h-full
            bg-cyan-400
          "
            style={{
              width: `${profile.readiness}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-4">
        <div
          className="
          text-[10px]
          uppercase
          tracking-wider
          text-white/40
        "
        >
          Next Focus
        </div>

        <div
          className="
          mt-1
          text-sm
          text-cyan-200
        "
        >
          {weaknesses?.[0] ||
  'Keep Learning'}
        </div>
      </div>
    </div>
  )
}