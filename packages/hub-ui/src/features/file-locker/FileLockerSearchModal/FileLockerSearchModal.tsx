import * as React from "react";
import { IconSearch } from "@tabler/icons";
import { Modal } from "../../../components/Modal";
import { FileLockerBadge, FileLockerPathway } from "../FileLocker/FileLocker";

/**
 * FileLockerSearchModalProps
 */
export type FileLockerSearchModalProps = {
  onClose: () => void;
  pathways: FileLockerPathway[];
  badges: FileLockerBadge[];
  lessons: { lessonId: string; lessonName: string }[];
  onPathwayClick?: (pathwayId: string) => void;
  onBadgeClick?: (badgeId: string) => void;
  onLessonClick?: (lessonId: string) => void;
};

/**
 * A search-and-jump modal for finding a specific Pathway/Badge/Lesson without hunting through
 * File Locker's own tabs first. Reuses the exact pathways/badges/lessons arrays FileLocker already
 * has and the same onPathwayClick/onBadgeClick/onLessonClick callbacks its own group headers use -
 * zero new data fetching. Filters all 3 lists client-side by a single search term; picking a result
 * both fires the matching callback and closes the modal, matching CategoriesModal's own
 * onCategoryClick convention. Conditionally mounted by the caller, matching this package's
 * established Modal pattern (CategoriesModal, FormSubmitDialog, FormExitDialog).
 * @param props
 * @constructor
 */
export function FileLockerSearchModal(props: FileLockerSearchModalProps) {
  const [query, setQuery] = React.useState("");
  const q = query.trim().toLowerCase();

  const pathways = q ? props.pathways.filter((p) => p.title.toLowerCase().includes(q)) : props.pathways;
  const badges = q ? props.badges.filter((b) => b.displayName.toLowerCase().includes(q)) : props.badges;
  const lessons = q ? props.lessons.filter((l) => l.lessonName.toLowerCase().includes(q)) : props.lessons;

  const select = (fn: ((id: string) => void) | undefined, id: string) => {
    fn?.(id);
    props.onClose();
  };

  return (
    <Modal visible onClose={props.onClose}>
      <div className="w-full p-5 md:w-[32rem]">
        <div className="mb-3 text-base font-extrabold text-dark-blue-400">Find a Pathway, Badge, or Lesson</div>

        <div className="mb-3 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <IconSearch size={15} stroke={1.75} className="text-slate-400" />
          <input
            type="text"
            autoFocus
            placeholder="Type to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border-none bg-transparent text-sm text-dark-blue-400 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex max-h-[55vh] flex-col gap-4 overflow-y-auto pr-1">
          <SearchSection title="Pathways" empty="No matching pathways.">
            {pathways.map((p) => (
              <SearchRow key={p.pathwayId} label={p.title} onClick={() => select(props.onPathwayClick, p.pathwayId)} />
            ))}
          </SearchSection>
          <SearchSection title="Badges" empty="No matching badges.">
            {badges.map((b) => (
              <SearchRow key={b.badgeId} label={b.displayName} onClick={() => select(props.onBadgeClick, b.badgeId)} />
            ))}
          </SearchSection>
          <SearchSection title="Lessons" empty="No matching lessons.">
            {lessons.map((l) => (
              <SearchRow key={l.lessonId} label={l.lessonName} onClick={() => select(props.onLessonClick, l.lessonId)} />
            ))}
          </SearchSection>
        </div>
      </div>
    </Modal>
  );
}

const SearchSection = (props: { title: string; empty: string; children: React.ReactNode }) => {
  const count = React.Children.count(props.children);
  return (
    <div>
      <div className="mb-1.5 text-[10.5px] font-extrabold uppercase tracking-wide text-slate-400">{props.title}</div>
      {count === 0 ? (
        <p className="text-xs text-slate-400">{props.empty}</p>
      ) : (
        <div className="flex flex-col gap-1">{props.children}</div>
      )}
    </div>
  );
};

const SearchRow = (props: { label: string; onClick: () => void }) => (
  <button
    type="button"
    onClick={props.onClick}
    className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-dark-blue-400 hover:bg-slate-50"
  >
    {props.label}
  </button>
);
