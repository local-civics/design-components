import * as React from "react";
import { IconDownload, IconExternalLink } from "@tabler/icons";

/**
 * FileListItem
 */
export type FileListItem = {
  link: string;
  badgeName: string;
  lessonName: string;
  question: string;
};

/**
 * FileListProps
 */
export type FileListProps = {
  items: FileListItem[];
  hideBadge?: boolean;
  hideLesson?: boolean;
};

/**
 * The per-file list shown inside each of FileLocker's grouped sections. Which columns render
 * depends on which level of the Badge -> Lesson -> Question hierarchy the calling group has
 * already fixed (shown once at the group's own header instead - which is also where the
 * pathway, the one level above Badge, always surfaces here, since every call site groups by
 * pathway/badge/lesson and none renders an ungrouped flat list that would need a Pathway column
 * of its own). Header and every row are direct children of one shared grid (not one grid per
 * row) so column tracks are computed once across all content - a per-row grid would let each
 * row's auto-sized action column resolve to a different width than the empty header cell above
 * it, drifting the columns out of alignment. Preview/Download both point at the same existing
 * `link` - there's no separate filename/size data available (the link is an opaque storage key,
 * not a real filename), so `question` doubles as the file's label.
 * @param props
 * @constructor
 */
export const FileList = (props: FileListProps) => {
  const { items, hideBadge, hideLesson } = props;
  if (!items.length) {
    return null;
  }

  const columns = [
    "minmax(0,2fr)",
    !hideLesson && "minmax(0,1.3fr)",
    !hideBadge && "minmax(0,1.3fr)",
    "auto",
  ]
    .filter(Boolean)
    .join(" ");

  const headerCell =
    "border-b border-slate-100 pb-2 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400";
  const dataCell = "py-3";

  return (
    <div className="grid items-center gap-x-3" style={{ gridTemplateColumns: columns }}>
      <div className={headerCell}>Question</div>
      {!hideLesson && <div className={headerCell}>Lesson</div>}
      {!hideBadge && <div className={headerCell}>Badge</div>}
      <div className={headerCell} />

      {items.map((row, i) => {
        const rowBorder = i > 0 ? "border-t border-slate-100" : "";
        return (
          <React.Fragment key={i}>
            <div className={`${dataCell} ${rowBorder} text-xs font-semibold text-dark-blue-400`}>{row.question}</div>
            {!hideLesson && (
              <div className={`${dataCell} ${rowBorder} truncate text-[11px] text-slate-500`}>{row.lessonName}</div>
            )}
            {!hideBadge && (
              <div className={`${dataCell} ${rowBorder} truncate text-[11px] text-slate-500`}>{row.badgeName}</div>
            )}
            <div className={`${dataCell} ${rowBorder} flex shrink-0 gap-2`}>
              <a
                href={row.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 no-underline hover:bg-slate-50"
              >
                <IconExternalLink size={12} stroke={2} />
                Preview
              </a>
              <a
                href={row.link}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-[11px] font-bold text-slate-600 no-underline hover:bg-slate-50"
              >
                <IconDownload size={12} stroke={2} />
                Download
              </a>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
