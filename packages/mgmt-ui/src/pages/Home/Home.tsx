import * as React from 'react';
import {IconAlbum, IconCategory2, IconClipboard, IconGauge, IconRoute} from '@tabler/icons';
import {showNotification} from '@mantine/notifications';
import {CardGradient} from "../../components/cards/CardGradient";

/**
 * HomeProps
 */
export type HomeProps = {
    loading: boolean
    avatarURL: string
    name: string
    impactStatement: string
    organization: {name: string, description: string, image: string, website: string, accessCode: string}

    onDashboardClick: () => void;
    onClassesClick: () => void;
    onPathwaysClick: () => void;
    onBadgesClick: () => void;
    onLessonsClick: () => void;
    onFileLockerClick: () => void;

}

/**
 * Home
 * @param props
 * @constructor
 */
export const Home = (props: HomeProps) => {
    const accessCode = props.organization.accessCode

    const onCopyAccessCode = async () => {
        if (!accessCode) return;

        try {
            await navigator.clipboard.writeText(accessCode);
            showNotification({
                title: 'Copied!',
                message: "Community code copied to clipboard.",
                autoClose: 3000,
            });
        } catch (err) {
            console.error("Failed to copy code", err);
        }
    };

    return <div className="flex w-full flex-col gap-5">
        <div className="flex items-stretch gap-5">
            <div className="flex-1">
                <div className="text-[28px] font-extrabold text-dark-blue-400">{props.name}</div>
                <div className="mt-1.5 text-[12.5px] text-slate-400">{props.impactStatement}</div>
            </div>

            <div className="flex w-[440px] shrink-0 flex-col justify-between gap-3 rounded-2xl bg-gradient-to-br from-dark-blue-600 via-dark-blue-400 to-sky-blue-400 p-5">
                <div>
                    <div className="text-base font-extrabold text-white">{props.organization.name}</div>
                    <div className="mt-1.5 text-[11.5px] leading-relaxed text-white/70">{props.organization.description}</div>
                </div>

                {accessCode && <div className="flex items-center gap-2">
                    <span className="text-[11px] text-white/70">Community code: {accessCode}</span>
                    <button
                        onClick={onCopyAccessCode}
                        className="rounded-md bg-white/90 px-2.5 py-1 text-[10.5px] font-bold text-dark-blue-400 hover:bg-white"
                    >
                        Copy
                    </button>
                </div>}
            </div>
        </div>

        <div className="flex flex-col gap-3">
            <CardGradient
                title="Dashboard"
                description="Track your students’ pathway progress"
                accent="mint"
                icon={<IconGauge size={18} stroke={1.75}/>}
                onClick={props.onDashboardClick}
            />
            <CardGradient
                title="Classes"
                description="Create classes, cohorts, or custom subgroups"
                accent="gold"
                icon={<IconCategory2 size={18} stroke={1.75}/>}
                onClick={props.onClassesClick}
            />
            <CardGradient
                title="Pathways"
                description="Explore all your unique pathway requirements in one clear space"
                accent="cyan"
                icon={<IconRoute size={18} stroke={1.75}/>}
                onClick={props.onPathwaysClick}
            />
            <CardGradient
                title="Badges"
                description="Key milestones that reflect skill development, micro-credentials, or academic progress"
                accent="mint"
                icon={<IconAlbum size={18} stroke={1.75}/>}
                onClick={props.onBadgesClick}
            />
            <CardGradient
                title="File Locker"
                description="A secure space to view student-submitted work and provide feedback"
                accent="cyan"
                icon={<IconClipboard size={18} stroke={1.75}/>}
                onClick={props.onFileLockerClick}
            />
        </div>
    </div>
}
