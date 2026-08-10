import * as React from 'react';
import { Avatar } from '@mantine/core';

interface UserButtonProps {
    image: string;
    name: string;
    email: string;
}

/**
 * The identity chip above the nav. Keeps Mantine's `Avatar` specifically (its built-in
 * initials-fallback when `image` is empty is real, relied-upon behavior for educator accounts
 * that often lack a profile photo — not something to rebuild) while the surrounding chrome is
 * restyled to match the redesigned sidebar.
 */
export function UserButton({ image, name, email }: UserButtonProps) {
    return (
        <div className="m-3 flex items-center gap-2.5 rounded-xl border border-mint-400/30 bg-gradient-to-r from-sky-blue-400/15 to-mint-400/15 p-2.5 shadow-[0_2px_10px_rgba(30,226,175,0.15)]">
            <Avatar
                src={image}
                radius="xl"
                size={32}
                styles={{ placeholder: { color: "#232A3A", backgroundColor: "rgba(30,226,175,0.2)" } }}
            />
            <div className="min-w-0 flex-1">
                <div className="truncate text-xs font-bold text-dark-blue-400">{name}</div>
                <div className="truncate text-[10px] text-slate-500">{email}</div>
            </div>
        </div>
    );
}
