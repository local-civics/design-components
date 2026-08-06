import React from "react";
import { Link } from "react-router-dom";
import {
  IconAlbum,
  IconBriefcase,
  IconClipboard,
  IconLogout,
  IconMessageCircle,
  IconRoute,
  IconSwitchHorizontal,
  IconUser,
} from "@tabler/icons";
import { classname } from "../../../utils/classname/classname";
import { Logo } from "../../../components/Logo";

/**
 * The component type shared by every @tabler/icons icon (the package doesn't export this type itself).
 */
type SidebarIcon = typeof IconUser;

/**
 * The name of a dashboard sidebar tab.
 */
export type DashboardSidebarTabName =
  | "profile"
  | "pathways"
  | "badges"
  | "file-locker"
  | "portfolio"
  | "comments";

/**
 * A tab's live destination. Tabs with no entry here render disabled.
 */
export type DashboardSidebarLinks = Partial<Record<DashboardSidebarTabName, { href: string }>>;

/**
 * The signed-in student shown above the nav.
 */
export type DashboardSidebarIdentity = {
  avatarURL?: string;
  name: string;
  subtitle?: string;
  online?: boolean;
};

/**
 * The properties for the dashboard sidebar.
 */
export type DashboardSidebarProps = {
  active?: DashboardSidebarTabName;
  links: DashboardSidebarLinks;
  identity?: DashboardSidebarIdentity;
  disabled?: boolean;

  onSwitchAccount?: () => void;
  onLogout?: () => void;
};

/**
 * The accent color cycled across sidebar rows.
 */
type SidebarAccent = "cyan" | "mint" | "gold";

type SidebarTab = {
  name: DashboardSidebarTabName;
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
  { name: "portfolio", label: "Portfolio", icon: IconBriefcase, accent: "gold" },
  { name: "comments", label: "Comments", icon: IconMessageCircle, accent: "cyan" },
];

/**
 * The single left nav used across the whole student side of the app (Home, Pathway/Badge detail
 * pages, and any future page that adopts `DashboardShell`) — never render a page-specific copy of
 * this. Tabs with no matching `links` entry render disabled, which is how not-yet-built
 * destinations (File Locker, Portfolio, Comments) show up today.
 */
export const DashboardSidebar = (props: DashboardSidebarProps) => {
  return (
    <nav className="flex h-full w-[230px] shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-100 p-4">
        <div className="w-24">
          <Logo />
        </div>
      </div>

      {props.identity && <DashboardIdentityChip {...props.identity} />}

      <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-2.5">
        {TABS.map((tab) => {
          const link = props.links[tab.name];
          return (
            <DashboardSidebarLink
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

      {(props.onSwitchAccount || props.onLogout) && (
        <div className="flex flex-col gap-0.5 border-t border-slate-200 p-2.5">
          {props.onSwitchAccount && (
            <DashboardSidebarUtilLink label="Change Account" icon={IconSwitchHorizontal} onClick={props.onSwitchAccount} />
          )}
          {props.onLogout && <DashboardSidebarUtilLink label="Logout" icon={IconLogout} onClick={props.onLogout} />}
        </div>
      )}
    </nav>
  );
};

const DashboardIdentityChip = (props: DashboardSidebarIdentity) => (
  <div className="m-3 flex items-center gap-2.5 rounded-xl border border-mint-400/30 bg-gradient-to-r from-sky-blue-400/15 to-mint-400/15 p-2.5 shadow-[0_2px_10px_rgba(30,226,175,0.15)]">
    <div className="relative shrink-0">
      <img
        className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
        src={props.avatarURL || "https://cdn.localcivics.io/hub/avatar.jpg"}
        alt="avatar"
      />
      {props.online && (
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-mint-400" />
      )}
    </div>
    <div className="min-w-0">
      <div className="truncate text-xs font-bold text-dark-blue-400">{props.name}</div>
      {props.subtitle && <div className="truncate text-[10px] text-slate-500">{props.subtitle}</div>}
    </div>
  </div>
);

type DashboardSidebarLinkProps = {
  label: string;
  icon: SidebarIcon;
  accent: SidebarAccent;
  href?: string;
  active?: boolean;
  disabled?: boolean;
};

const DashboardSidebarLink = (props: DashboardSidebarLinkProps) => {
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

type DashboardSidebarUtilLinkProps = {
  label: string;
  icon: SidebarIcon;
  onClick?: () => void;
};

const DashboardSidebarUtilLink = (props: DashboardSidebarUtilLinkProps) => {
  const Icon = props.icon;
  return (
    <div
      onClick={props.onClick}
      className="flex cursor-pointer items-center gap-2.5 rounded-[10px] px-3.5 py-2 text-slate-400 hover:bg-slate-50 hover:text-slate-500"
    >
      <Icon size={13} stroke={1.75} />
      <span className="text-[11.5px]">{props.label}</span>
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
    shadow: string;
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
    shadow: "",
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
      config.chip.shadow = "shadow-[0_0_8px_rgba(59,208,242,0.5)]";
      config.icon.color = "text-sky-blue-400";
      config.dot.bg = "bg-sky-blue-400";
      break;
    case "mint":
      config.row.bg = "bg-mint-400/15";
      config.row.border = "border border-mint-400/30";
      config.chip.bg = "bg-mint-400/25";
      config.chip.shadow = "shadow-[0_0_8px_rgba(30,226,175,0.5)]";
      config.icon.color = "text-mint-400";
      config.dot.bg = "bg-mint-400";
      break;
    case "gold":
      config.row.bg = "bg-gold-400/15";
      config.row.border = "border border-gold-400/30";
      config.chip.bg = "bg-gold-400/25";
      config.chip.shadow = "shadow-[0_0_8px_rgba(255,212,77,0.5)]";
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
