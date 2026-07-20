import React, { useEffect, useRef } from "react";

import useExecution from "../../execution/useExecution";

export default function ExecutionTimeline() {

  const { timeline } = useExecution();

  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth",

    });

  }, [timeline]);

  return (

    <div className="absolute bottom-6 right-6 w-[420px] h-[420px]
                    rounded-2xl
                    bg-black/70
                    backdrop-blur-xl
                    border border-cyan-500/30
                    shadow-2xl
                    overflow-hidden">

      {/* Header */}

      <div className="px-5 py-4 border-b border-cyan-500/20">

        <h2 className="text-cyan-400 text-lg font-bold">

          ATHENA EXECUTION

        </h2>

        <p className="text-gray-400 text-sm">

          Live Runtime Timeline

        </p>

      </div>

      {/* Timeline */}

      <div className="overflow-y-auto h-[340px] px-5 py-4">

        {

          timeline.length === 0 && (

            <div className="text-gray-500">

              Waiting for execution...

            </div>

          )

        }

        {

          timeline.map(event => (

            <TimelineEvent

              key={event.id}

              event={event}

            />

          ))

        }

        <div ref={bottomRef}/>

      </div>

    </div>

  );

}

function TimelineEvent({ event }) {

  const time = new Date(

    event.timestamp

  ).toLocaleTimeString();

  return (

    <div className="flex gap-4 mb-5">

      {/* Dot */}

      <div className="mt-2">

        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"/>

      </div>

      {/* Content */}

      <div>

        <div className="text-white font-medium">

          {event.event}

        </div>

        <div className="text-gray-500 text-xs">

          {time}

        </div>

      </div>

    </div>

  );

}