import { motion } from "framer-motion";
import {
  Paperclip,
  Mic,
  ArrowUp,
  Sparkles,
} from "lucide-react";

export default function CommandDock() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      className="
      absolute

      left-1/2
      bottom-12

      -translate-x-1/2

      w-[760px]

      pointer-events-auto

      z-50
      "
    >
      <div
        className="
        rounded-[32px]

        border
        border-white/10

        bg-slate-900/45

        backdrop-blur-3xl

        shadow-[0_25px_80px_rgba(0,0,0,.45)]

        px-7
        py-5
        "
      >
        <div className="flex items-center gap-5">

          {/* AI */}

          <div
            className="
            flex

            h-12
            w-12

            items-center
            justify-center

            rounded-2xl

            bg-cyan-500/10

            border

            border-cyan-400/20
            "
          >
            <Sparkles
              className="text-cyan-300"
              size={20}
            />
          </div>

          {/* Input */}

          <input
            type="text"
            placeholder="Ask Athena anything..."
            className="
            flex-1

            bg-transparent

            text-lg

            text-white

            placeholder:text-slate-500

            outline-none
            "
          />

          {/* Shortcuts */}

          <Shortcut>
            ⌘ K
          </Shortcut>

          {/* Attach */}

          <IconButton>

            <Paperclip size={18}/>

          </IconButton>

          {/* Mic */}

          <IconButton>

            <Mic size={18}/>

          </IconButton>

          {/* Send */}

          <motion.button

            whileHover={{
              scale:1.08
            }}

            whileTap={{
              scale:.95
            }}

            className="
            h-12
            w-12

            rounded-2xl

            bg-gradient-to-br

            from-cyan-400

            to-blue-500

            text-white

            flex

            items-center

            justify-center
            "
          >

            <ArrowUp size={18}/>

          </motion.button>

        </div>

      </div>

    </motion.div>
  );
}

function IconButton({children}){

  return(

    <motion.button

    whileHover={{
      scale:1.08
    }}

    whileTap={{
      scale:.95
    }}

    className="
    h-11
    w-11

    rounded-xl

    bg-white/5

    border

    border-white/10

    text-slate-300

    flex

    items-center

    justify-center

    hover:text-cyan-300
    "
    >

      {children}

    </motion.button>

  )

}

function Shortcut({children}){

  return(

    <div
    className="
    rounded-xl

    border

    border-white/10

    bg-white/5

    px-3

    py-2

    text-xs

    tracking-wider

    text-slate-400
    "
    >

      {children}

    </div>

  )

}