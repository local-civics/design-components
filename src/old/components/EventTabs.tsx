import React from "react";
import { Event } from "../models/event";
import { Icon } from "../../components";
import { IconName } from "../../components/Icon/Icon";
import { EventTab } from "../tabs/EventTab";

export interface EventTabsProps {
  tabs: {
    icon: IconName;
    name: string;
  }[];
  events: Event[] | null;
  tab: string;
  onSetEvent: (eventName?: string) => void;
  onSetTab: (tab: string) => void;
}

export const EventTabs = (props: EventTabsProps) => {
  const [active, setActive] = React.useState(props.tab);
  const tabs = props.tabs.filter((tab) => tab.name === active);

  const onSetActive = (target: string) => {
    if (target === active) {
      return;
    }
    props.onSetTab(target);
    setActive(target);
  };

  return (
    <div className="overflow-hidden w-full" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="p-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center">
          {props.tabs.map((tab) => {
            const textColor = active === tab.name ? "text-sky-500" : "text-slate-600";
            const iconColor = active === tab.name ? "stroke-sky-500 fill-sky-500" : "stroke-slate-600 fill-slate-600";
            return (
              <div
                key={tab.name}
                onClick={() => onSetActive(tab.name)}
                className={`transition ease-in-out w-full py-3 px-5 ${
                  active === tab.name
                    ? "border-b-2 border-b-sky-400"
                    : "border-b border-slate-100 cursor-pointer hover:bg-sky-50"
                }`}
              >
                <div className="lg:m-auto w-max">
                  <Icon className={`w-5 h-5 ${iconColor} inline-block`} icon={tab.icon} />
                  <h4 className={`ml-1 capitalize text-sm font-semibold align-middle ${textColor} inline-block`}>
                    {tab.name}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-2 h-full">
        <div className="h-[25rem] overflow-scroll">
          {tabs.length > 0 && <EventTab events={props.events} onSetEvent={props.onSetEvent} />}
        </div>
      </div>
    </div>
  );
};
