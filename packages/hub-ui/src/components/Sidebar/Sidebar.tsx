import React from "react";
import { Link } from "react-router-dom";
import {
  IconAlbum,
  IconBriefcase,
  IconClipboard,
  IconFileText,
  IconLogout,
  IconRoute,
  IconSettings,
  IconUser,
} from "@tabler/icons";
import { classname } from "../../utils/classname/classname";
import { Logo } from "../Logo";

/**
 * The component type shared by every @tabler/icons icon (the package doesn't export this type itself).
 */
type SidebarIcon = typeof IconUser;

/**
 * The name of a sidebar tab.
 */
export type SidebarTabName = "profile" | "pathways" | "badges" | "file-locker" | "transcript" | "portfolio";

/**
 * A tab's live destination. Tabs with no entry here render disabled.
 */
export type SidebarLinks = Partial<Record<SidebarTabName, { href: string }>>;

/**
 * The signed-in student shown above the nav.
 */
export type SidebarIdentity = {
  avatarURL?: string;
  name: string;
  subtitle?: string;
};

/**
 * The properties for the sidebar.
 */
export type SidebarProps = {
  active?: SidebarTabName;
  links: SidebarLinks;
  identity?: SidebarIdentity;
  settingsHref?: string;
  disabled?: boolean;
  onLogout?: () => void;
};

/**
 * The accent color cycled across sidebar rows.
 */
type SidebarAccent = "cyan" | "mint" | "gold";

type SidebarTab = {
  name: SidebarTabName;
  label: string;
  icon: SidebarIcon;
  accent: SidebarAccent;
};

/**
 * The student nav tabs. Accent cycles cyan → mint → gold across rows.
 */
const TABS: SidebarTab[] = [
  { name: "profile", label: "My Profile", icon: IconUser, accent: "cyan" },
  { name: "pathways", label: "Pathways", icon: IconRoute, accent: "mint" },
  { name: "badges", label: "Badges", icon: IconAlbum, accent: "gold" },
  { name: "file-locker", label: "File Locker", icon: IconClipboard, accent: "cyan" },
  { name: "transcript", label: "Transcript", icon: IconFileText, accent: "mint" },
  { name: "portfolio", label: "Portfolio", icon: IconBriefcase, accent: "gold" },
];

/**
 * A component for navigating between the student's home page sections.
 */
export const Sidebar = (props: SidebarProps) => {
  return (
    <nav className="flex h-full w-[230px] shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-100 p-4">
        <div className="w-24">
          <Logo />
        </div>
      </div>

      {props.identity && <SidebarIdentityChip {...props.identity} />}

      <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2.5">
        {TABS.map((tab) => {
          const link = props.links[tab.name];
          return (
            <SidebarLink
              key={tab.name}
              label={tab.label}
              icon={tab.icon}
              accent={tab.accent}
              href={link?.href}
              active={props.active === tab.name}
              disabled={props.disabled || !link}
            />
          );
        })}
      </div>

      {(props.settingsHref || props.onLogout) && (
        <div className="flex flex-col gap-0.5 border-t border-slate-100 p-2.5">
          {props.settingsHref && <SidebarUtilLink label="Settings" icon={IconSettings} href={props.settingsHref} />}
          {props.onLogout && <SidebarUtilLink label="Logout" icon={IconLogout} onClick={props.onLogout} />}
        </div>
      )}
    </nav>
  );
};

const SidebarIdentityChip = (props: SidebarIdentity) => (
  <div className="m-3 flex items-center gap-2.5 rounded-xl bg-slate-50 p-2.5">
    <img
      className="h-8 w-8 shrink-0 rounded-full object-cover"
      src={props.avatarURL || "https://cdn.localcivics.io/hub/avatar.jpg"}
      alt="avatar"
    />
    <div className="min-w-0">
      <div className="truncate text-xs font-bold text-dark-blue-400">{props.name}</div>
      {props.subtitle && <div className="truncate text-[10px] text-slate-400">{props.subtitle}</div>}
    </div>
  </div>
);

type SidebarLinkProps = {
  label: string;
  icon: SidebarIcon;
  accent: SidebarAccent;
  href?: string;
  active?: boolean;
  disabled?: boolean;
};

const SidebarLink = (props: SidebarLinkProps) => {
  const config = defaultLinkConfig();
  withAccent(config, props.accent, props.active);
  withDisabled(config, props.disabled);

  const Icon = props.icon;
  const content = (
    <>
      <div className={classname(config.chip)}>
        <Icon size={14} stroke={props.active ? 2.2 : 1.75} className={config.icon.color} />
      </div>
      <span className={classname(config.label)}>{props.label}</span>
      <span className={classname(config.dot)} />
    </>
  );

  if (props.disabled || !props.href) {
    return <div className={classname(config.row)}>{content}</div>;
  }

  return (
    <Link to={props.href} className={classname(config.row)}>
      {content}
    </Link>
  );
};

type SidebarUtilLinkProps = {
  label: string;
  icon: SidebarIcon;
  href?: string;
  onClick?: () => void;
};

const SidebarUtilLink = (props: SidebarUtilLinkProps) => {
  const className =
    "flex cursor-pointer items-center gap-2.5 rounded-[10px] px-3.5 py-2 text-slate-400 hover:bg-slate-50 hover:text-slate-500";
  const Icon = props.icon;
  const content = (
    <>
      <Icon size={13} />
      <span className="text-[11.5px]">{props.label}</span>
    </>
  );

  if (props.href) {
    return (
      <Link to={props.href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <div onClick={props.onClick} className={className}>
      {content}
    </div>
  );
};

type SidebarLinkConfig = {
  row: {
    base: string;
    cursor: string;
    bg: string;
    border: string;
  };
  chip: {
    base: string;
    bg: string;
  };
  icon: {
    color: string;
  };
  label: {
    base: string;
    weight: string;
    color: string;
  };
  dot: {
    base: string;
    bg: string;
  };
};

const defaultLinkConfig = (): SidebarLinkConfig => ({
  row: {
    base: "flex items-center gap-2.5 rounded-[10px] px-3.5 py-2.5 transition-colors",
    cursor: "cursor-pointer hover:bg-slate-50",
    bg: "bg-transparent",
    border: "border border-transparent",
  },
  chip: {
    base: "flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg",
    bg: "bg-slate-50",
  },
  icon: {
    color: "text-slate-400",
  },
  label: {
    base: "flex-1 text-xs",
    weight: "font-medium",
    color: "text-slate-500",
  },
  dot: {
    base: "h-[5px] w-[5px] shrink-0 rounded-full",
    bg: "bg-transparent",
  },
});

const withAccent = (config: SidebarLinkConfig, accent: SidebarAccent, active?: boolean) => {
  if (!active) {
    return;
  }

  config.row.cursor = "cursor-default";
  config.label.weight = "font-bold";
  config.label.color = "text-dark-blue-400";

  switch (accent) {
    case "cyan":
      config.row.bg = "bg-sky-blue-400/15";
      config.row.border = "border border-sky-blue-400/30";
      config.chip.bg = "bg-sky-blue-400/25";
      config.icon.color = "text-sky-blue-400";
      config.dot.bg = "bg-sky-blue-400";
      break;
    case "mint":
      config.row.bg = "bg-mint-400/15";
      config.row.border = "border border-mint-400/30";
      config.chip.bg = "bg-mint-400/25";
      config.icon.color = "text-mint-400";
      config.dot.bg = "bg-mint-400";
      break;
    case "gold":
      config.row.bg = "bg-gold-400/15";
      config.row.border = "border border-gold-400/30";
      config.chip.bg = "bg-gold-400/25";
      config.icon.color = "text-gold-400";
      config.dot.bg = "bg-gold-400";
      break;
  }
};

const withDisabled = (config: SidebarLinkConfig, disabled?: boolean) => {
  if (!disabled) {
    return;
  }

  config.row.cursor = "cursor-default";
  config.icon.color = "text-slate-300";
  config.label.color = "text-slate-300";
};
