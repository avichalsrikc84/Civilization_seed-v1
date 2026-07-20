import React from "react";

import useExecution from "../../execution/useExecution";

import ProgressRing from "./ProgressRing";
import ExecutionTimeline from "./ExecutionTimeline";

export default function AthenaHUD() {

    const execution = useExecution();

    return (

        <div
            className="
            fixed
            top-5
            right-5
            w-[470px]
            h-[760px]
            rounded-3xl
            overflow-hidden

            bg-black/55

            backdrop-blur-3xl

            border border-cyan-500/30

            shadow-[0_0_40px_rgba(0,255,255,.15)]

            flex

            flex-col"

        >

            {/* Header */}

            <Header/>

            {/* Progress */}

            <div className="flex justify-center py-8">

                <ProgressRing/>

            </div>

            {/* Status */}

            <Status execution={execution}/>

            {/* Timeline */}

            <div className="flex-1 overflow-hidden">

                <ExecutionTimeline/>

            </div>

            {/* Footer */}

            <Footer execution={execution}/>

        </div>

    )

}

function Header(){

    return(

        <div
            className="

            border-b

            border-cyan-500/20

            px-6

            py-5"

        >

            <div className="text-cyan-400 text-xl font-bold">

                ATHENA OS

            </div>

            <div className="text-gray-400 text-sm">

                Artificial Intelligence Runtime

            </div>

        </div>

    )

}

function Status({execution}){

    return(

        <div className="px-6 pb-6">

            <div className="grid grid-cols-2 gap-5">

                <StatusCard

                    title="Agent"

                    value={

                        execution.currentAgent ||

                        "Idle"

                    }

                />

                <StatusCard

                    title="Tool"

                    value={

                        execution.currentTool ||

                        "--"

                    }

                />

                <StatusCard

                    title="Progress"

                    value={

                        execution.progress+"%"

                    }

                />

                <StatusCard

                    title="Status"

                    value={

                        execution.status

                    }

                />

            </div>

        </div>

    )

}

function StatusCard({title,value}){

    return(

        <div

            className="

            rounded-xl

            border

            border-cyan-500/20

            bg-cyan-500/5

            p-4"

        >

            <div

                className="

                text-gray-400

                text-xs"

            >

                {title}

            </div>

            <div

                className="

                text-white

                font-semibold

                mt-2"

            >

                {value}

            </div>

        </div>

    )

}

function Footer({execution}){

    return(

        <div

            className="

            border-t

            border-cyan-500/20

            p-5"

        >

            <div className="flex justify-between">

                <div>

                    <div className="text-gray-500 text-xs">

                        Events

                    </div>

                    <div className="text-white">

                        {

                            execution.timeline.length

                        }

                    </div>

                </div>

                <div>

                    <div className="text-gray-500 text-xs">

                        Errors

                    </div>

                    <div className="text-red-400">

                        {

                            execution.errors.length

                        }

                    </div>

                </div>

                <div>

                    <div className="text-gray-500 text-xs">

                        Runtime

                    </div>

                    <div className="text-cyan-400">

                        {

                            execution.executionTime

                        } ms

                    </div>

                </div>

            </div>

        </div>

    )

}