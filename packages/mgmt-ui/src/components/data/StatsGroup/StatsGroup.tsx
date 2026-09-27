import * as React from 'react';

interface StatsGroupProps {
    // `loading` swaps the number for a pulse bar - for a stat whose value comes from a later fetch
    // than the page itself, so it doesn't read as a real "0" in the meantime.
    data: { title: string; value: number, unit?: string, loading?: boolean}[];
    footer?: React.ReactNode
}

/**
 * The dark navy stat highlight used across pages that have real aggregate numbers to show (Class
 * Roster today; File Locker and Lessons reuse the exact same component in later rounds, for
 * cross-page consistency). Same prop contract and percentage-rounding behavior as before this
 * round's restyle — only the markup/styling moved from Mantine's `createStyles` theme to Tailwind.
 * @param data
 * @param footer
 * @constructor
 */
export const StatsGroup = ({ data, footer }: StatsGroupProps) => {
    const stats = data.map((stat) => {
        const value = (() => {
            if (stat.unit === '%') {
                // https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
                return Math.round((stat.value + Number.EPSILON) * 100)
            }

            return stat.value
        })()

        // falls back to 0 for undefined, null, NaN, etc
        const safeValue = Number.isFinite(value) ? value : 0;

        return (
            <div key={stat.title}>
                <div className="text-3xl font-black text-white">
                    {stat.loading ? (
                        <span className="inline-block h-8 w-14 animate-pulse rounded bg-white/20 align-middle">
                            <span className="sr-only">Loading</span>
                        </span>
                    ) : (
                        <>
                            {safeValue.toLocaleString()}
                            {stat.unit}
                        </>
                    )}
                </div>
                <div className="mt-1.5 text-[11px] font-bold uppercase tracking-wide text-white/70">{stat.title}</div>
            </div>
        );
    });

    return (
        <div className="flex flex-wrap gap-x-10 gap-y-4 rounded-2xl bg-gradient-to-br from-dark-blue-600 via-dark-blue-400 to-sky-blue-400 px-8 py-6">
            {stats}
            {footer}
        </div>
    );
}
