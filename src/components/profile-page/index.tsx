import {Icon, Icons} from "../icon";
import {Loader}                             from "../loader";
import React, {FunctionComponent, useState} from "react";
import {NavigationBar}                      from "../navigation-bar";
import {ProgressBar}                        from "../progress-bar";
import {Wing}                               from "../wing";

/**
 * Configurable properties for ProfilePage component
 */
export interface ProfilePageProps {
    /**
     * Given name for profile
     */
    givenName: string

    /**
     * Family name for profile
     */
    familyName: string

    /**
     * Profile avatar
     */
    avatar?: string

    /**
     * Impact statement
     */
    statement: string

    /**
     * Time account was created
     */
    createdAt: string

    /**
     * City of the user
     */
    city: string

    /**
     * State of the user
     */
    state: string

    /**
     * Community of the user
     */
    community: string


    /**
     * Badges earned
     */
    badges: number

    /**
     * Events attended
     */
    events: number

    /**
     * Milestones completed
     */
    milestones: number

    /**
     * Experience
     */
    xp: number

    /**
     * Current stage
     */
    stage: number

    /**
     * Next level Experience
     */
    nextXP: number

    /**
     * Pathways
     */
    pathways: Pathway[]

    /**
     * Registered events
     */
    registered?: RegisteredEvent[]

    /**
     * Page is loading
     */
    isLoading?: boolean
}

/**
 * ProfilePage component
 */
export const ProfilePage: FunctionComponent<ProfilePageProps> = (props) => {
    const avatar = props.avatar || "https://cdn.localcivics.io/dashboard/avatar.jpg"
    const [currentScreen, setCurrentScreen] = useState("")
    const [previousScreen, setPreviousScreen] = useState("")

    const setScreen = (cur: string) => {
        setPreviousScreen(currentScreen)
        setCurrentScreen(cur)
    }

    return (
        <Loader isLoading={props.isLoading}>
            <div className="h-screen bg-white font-proxima">
                <NavigationBar page="profile"/>
                <div className="px-4 md:px-24">
                    {/* Avatar Header */}
                    <div className="flex w-full">
                        <div className="h-48 w-full border-l-2 border-r-2 border-b-2 rounded-b-md">
                            <div className="h-3/5 w-full bg-gray-200"/>

                            <div className="ml-40">
                                <h4 className="font-semibold capitalize text-2xl text-neutral-700">{props.givenName} {props.familyName}</h4>
                                <p className="text-gray-400">Member since {new Date(props.createdAt).getFullYear()}</p>
                            </div>
                        </div>
                        <div className="absolute">
                            <div className="relative ml-2 mt-3">
                                <img src={avatar} alt="avatar" className="border-4 w-36 h-36 rounded-full object-cover"/>
                                <span className="animate-pulse absolute h-5 w-5 top-3 right-3 rounded-full bg-green-500 border-4 border-white top-0 right-0" />
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="lg:flex w-full mt-5">
                        {/* Left Panel */}
                        <div className="flex lg:flex-col w-full md:w-56">
                            {/* About */}
                            <Wing className="border-gray-200 border-2 rounded-md min-h-48 w-full">
                                <div className="flex items-center">
                                    <div className="flex-grow">
                                        <Icon className="w-5 h-5 stroke-neutral-700 fill-neutral-700 inline-block" icon="user"/>
                                        <h4 className="ml-2  align-middle font-semibold text-neutral-700 inline-block">About</h4>
                                    </div>
                                    <Icon className="w-4 h-4 -mt-0.5 align-middle cursor-pointer stroke-neutral-500 fill-neutral-500 hover:stroke-neutral-700 hover:fill-neutral-700 inline-block" icon="edit"/>
                                </div>

                                <p className="line-clamp-10 mt-3 text-sm text-gray-400">{props.statement}</p>
                                <div className="mt-2">
                                    <Icon className="w-4 h-4 stroke-neutral-700 fill-neutral-700 inline-block" icon="pin"/>
                                    <h4 className="ml-2 capitalize text-xs align-middle text-neutral-500 inline-block">{props.city}, {props.state}</h4>
                                </div>
                                <div className="mt-2">
                                    <Icon className="w-4 h-4 stroke-neutral-700 fill-neutral-700 inline-block" icon="college"/>
                                    <h4 className="ml-2 capitalize text-xs align-middle text-neutral-500 inline-block">{props.community}</h4>
                                </div>
                            </Wing>

                            {/* Pathways */}
                            <Wing className="border-gray-200 border-2 rounded-md h-80 w-full mt-3">
                                <div className="flex items-center">
                                    <div className="flex-grow">
                                        <Icon className="w-5 h-5 stroke-neutral-700 fill-neutral-700 inline-block" icon="pathway"/>
                                        <h4 className="ml-2 align-middle font-semibold text-neutral-700 inline-block">Pathways</h4>
                                    </div>
                                    <Icon onClick={() => setScreen("pathway/help")} className="w-5 h-5 mt-0.5 align-middle cursor-pointer stroke-neutral-500 fill-neutral-500 hover:stroke-neutral-700 hover:fill-neutral-700 inline-block" icon="help"/>
                                </div>

                                <div className="grid grid-cols-1">
                                    {
                                        props.pathways.map((pathway) => {
                                            return (
                                                <div className="mt-5 flex items-center">
                                                    <Icon className="w-5 h-5 stroke-neutral-700 fill-neutral-700 inline-block" icon={pathway.icon}/>
                                                    <div className="flex-grow ml-2">
                                                        <p className="text-xs text-neutral-400">{pathway.name}</p>
                                                        <ProgressBar className="h-3" start={pathway.progress?.journey?.filter(w => w.completedAt).length || 0} end={pathway.journey.length}/>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Wing>

                            {/* Registered */}
                            <Wing className="border-gray-200 border-2 rounded-md min-h-80 max-h-96 w-full mt-3">
                                <div className="flex items-center">
                                    <div className="flex-grow">
                                        <Icon className="w-5 h-5 stroke-neutral-700 fill-neutral-700 inline-block" icon="calendar"/>
                                        <h4 className="ml-2 align-middle font-semibold text-neutral-700 inline-block">Registered</h4>
                                    </div>
                                    <p className="text-xs align-middle cursor-pointer text-neutral-400 hover:text-neutral-600 inline-block">See All</p>
                                </div>

                                <div className="grid grid-cols-1 overflow-hidden justify-items-center content-center min-h-60">
                                    { !props.registered && <p className="text-xs text-center align-middle leading-6 font-semibold text-neutral-700"> You haven't registered for any events, go and explore! </p> }
                                    {
                                        props.registered?.map((event) => {
                                            return <div className="cursor-pointer transition ease-in-out mt-3 bg-gray-100 hover:bg-gray-200  px-2 py-4 rounded-md text-neutral-500 w-full">
                                                <p className="font-semibold text-xs">{event.name}</p>
                                                <p className="mt-3 text-xs">{new Date(event.notBefore).toLocaleString('default', { month: 'short', day: '2-digit' })}</p>
                                            </div>
                                        })
                                    }
                                </div>
                            </Wing>

                            <p className="place-self-center inline-block mt-2 mb-2 text-xs text-gray-300">Local Civics © 2022</p>
                        </div>

                        {/* Right Panel */}
                        <div className="lg:flex-grow lg:flex-col md:pl-5">
                            <div className="flex h-36">
                                {/* Impact Score */}
                                <div className="flex-grow p-3 pt-6 rounded-md bg-sky-100">
                                    <div>
                                        <Icon className="w-5 h-5 stroke-neutral-700 fill-neutral-700 inline-block" icon="objective"/>
                                        <h4 className="ml-2 align-middle font-semibold text-neutral-700 inline-block">Impact Score</h4>
                                        <ProgressBar className="mt-3" start={props.xp} end={props.nextXP}/>
                                        <div className="mt-2 flex">
                                            <div className="flex-grow">
                                                <p className="font-bold text-neutral-700 text-xl inline-block">{Intl.NumberFormat('en-US', {notation: "compact", maximumFractionDigits: 1}).format(props.xp)}</p>
                                                <p className="ml-2 text-neutral-700 text-xl inline-block">XP</p>
                                            </div>
                                            <p className="text-sm text-neutral-400">
                                                {Intl.NumberFormat('en-US', {notation: "compact", maximumFractionDigits: 1}).format(props.nextXP - props.xp)} exp. until level {props.stage + 1}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Achievements */}
                                <Wing className="border-gray-200 border-2 rounded-md ml-3 w-5/12">
                                    <div>
                                        <Icon className="w-5 h-5 stroke-neutral-700 fill-neutral-700 inline-block" icon="achievements"/>
                                        <h4 className="ml-2 align-middle font-semibold text-neutral-700 inline-block">Achievements</h4>
                                    </div>

                                    <div className="grid grid-cols-3 justify-items-center">
                                        <div className="mt-3">
                                            <p className="font-bold text-3xl w-max m-auto text-green-500">{Intl.NumberFormat('en-US', {notation: "compact", maximumFractionDigits: 1}).format(props.events)}</p>
                                            <p className="text-xs w-max m-auto text-neutral-400">Events</p>
                                        </div>

                                        <div className="mt-3">
                                            <p className="font-bold text-3xl w-max m-auto text-green-500">{Intl.NumberFormat('en-US', {notation: "compact", maximumFractionDigits: 1}).format(props.badges)}</p>
                                            <p className="text-xs w-max m-auto text-neutral-400">Badges</p>
                                        </div>

                                        <div className="mt-3">
                                            <p className="font-bold text-3xl w-max m-auto text-green-500">{Intl.NumberFormat('en-US', {notation: "compact", maximumFractionDigits: 1}).format(props.milestones)}</p>
                                            <p className="text-xs w-max m-auto text-neutral-400">Milestones</p>
                                        </div>
                                    </div>
                                </Wing>
                            </div>

                            {/* Milestones/Activity/Badges */}
                            <Wing className="border-gray-200 border-2 rounded-md h-80 w-full mt-5"
                                  header={<div className="grid grid-cols-3 justify-items-center">
                                        <div className="transition ease-in-out w-full cursor-pointer hover:bg-white rounded-md py-3 px-5">
                                            <div className="m-auto w-max">
                                                <Icon className="w-5 h-5 stroke-neutral-700 fill-neutral-700 inline-block" icon="milestones"/>
                                                <h4 className="ml-1 capitalize text-sm font-semibold align-middle text-neutral-700 inline-block">Civic Milestones</h4>
                                            </div>
                                        </div>
                                      <div className="transition ease-in-out w-full cursor-pointer hover:bg-white rounded-md py-3 px-5">
                                          <div className="m-auto w-max">
                                              <Icon className="w-5 h-5 stroke-neutral-700 fill-neutral-700 inline-block" icon="activity"/>
                                              <h4 className="ml-2 capitalize text-sm font-semibold align-middle text-neutral-700 inline-block">Activity</h4>
                                          </div>
                                      </div>
                                      <div className="transition ease-in-out w-full cursor-pointer hover:bg-white rounded-md py-3 px-5">
                                          <div className="m-auto w-max">
                                              <Icon className="w-5 h-5 stroke-neutral-700 fill-neutral-700 inline-block" icon="badges"/>
                                              <h4 className="ml-1 capitalize text-sm font-semibold align-middle text-neutral-700 inline-block">Badges</h4>
                                          </div>
                                      </div>
                                  </div>}>

                            </Wing>

                            {/* ??? */}
                            <Wing className="border-gray-200 border-2 rounded-md h-80 w-full mt-5">

                            </Wing>
                        </div>
                    </div>
                </div>
            </div>

            <PathwayHelp close={() => setScreen(previousScreen)} visible={currentScreen === "pathway/help"} />
        </Loader>
    );
};

interface PathwayHelpProps {
    visible: boolean
    close: () => void
}


/**
 * Pathway help
 * @param props
 * @constructor
 */
const PathwayHelp: FunctionComponent<PathwayHelpProps> = (props) => {
    const [page, setPage] = useState(0)
    const next = () => {
        if(page >= 2){
            setPage(0)
            props.close()
        } else {
            setPage(page + 1)
        }
    }

    let description = ""
    let title = ""
    switch(page){
    case 0:
        title = "Welcome to Pathways"
        description = "An on-ramp to Civic Impact and learning."
        break
    case 1:
        title = ""
        description = "You can now select ready made journeys from each of the 5 learning areas to increase your points and earn badges!"
        break
    case 2:
        title = ""
        description = "Look for Pathways on the side of your profile and click an area to get started!"
        break
    }


    return (
        <div className={`grid grid-cols-1 justify-items-center content-center transition ease-in-out duration-300 fixed top-0 w-screen h-screen bg-neutral-500/80 z-50 ${!props.visible && "invisible opacity-0"}`}>
            <div className="shadow-md p-5 w-[28rem] h-80 bg-white rounded-md grid grid-cols-1 justify-items-center">
                <div className="grid justify-items-end w-full">
                    <Icon onClick={props.close} className="transition ease-in-out cursor-pointer stroke-neutral-300 fill-neutral-300 hover:stroke-neutral-400 hover:fill-neutral-400 w-4" icon="close"/>
                </div>
                <div className="grid grid-cols-1 m-auto">
                    <Icon className="m-auto stroke-neutral-700 fill-neutral-700 w-16" icon="pathway"/>
                    <div>
                        <p className="w-max m-auto text-neutral-700 font-bold text-lg mt-5">{title}</p>
                        <p className="max-w-72 h-16 m-auto text-center text-neutral-500 text-sm mt">{description}</p>
                    </div>
                    <div className="w-max m-auto">
                        <button onClick={next} className="transition-colors rounded-lg font-semibold text-white py-3.5 px-14 bg-sky-400 hover:bg-sky-500 mt-2">Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

/**
 *
 */
export interface Pathway{
    name: string
    icon: Icons
    journey: Waypoint[]
    progress?: PathwayProgress
}

export interface Waypoint{

}

export interface PathwayProgress{
    journey?: WaypointProgress[]
}

export interface WaypointProgress{
    completedAt?: string
}

export interface RegisteredEvent{
    name: string
    notBefore: string
}