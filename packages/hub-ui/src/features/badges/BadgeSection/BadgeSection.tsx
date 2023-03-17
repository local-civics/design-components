import * as React from "react";
import { Widget, WidgetBody, WidgetHeader } from "../../../components/Widget";
import { Badge, BadgeProps } from "../Badge/Badge";
import { Icon } from "../../../components/Icon/Icon";

export type ToggleOptionProps = {
  label?: string;
  active?: boolean;
  isGrid?: boolean;
};

export type BadgeSectionOptions = {
  name?: string;
  isActive?: boolean;
};

/**
 * BadgeSectionProps
 */
export type BadgeSectionProps = {
  isLoading?: boolean;
  readonly?: boolean;
  showMore?: boolean;
  badges?: BadgeProps[];
  toggleOptions?: ToggleOptionProps;
  onToggleClick?: () => void;
  options?: BadgeSectionOptions[];
  onFilterClick?: (filter: BadgeSectionOptions) => void;
};

/**
 * BadgeSection
 * @param props
 * @constructor
 */
export const BadgeSection = (props: BadgeSectionProps) => {
  const [showMore, setShowMore] = React.useState(props.showMore);
  const badges = props.badges || [];
  const options = props.options || [];
  const progress: BadgeProps[] = [];
  const locked: BadgeProps[] = [];
  const available: BadgeProps[] = [];
  const collected: BadgeProps[] = [];
  const toggleShowMore = () => {
    if (!props.readonly && badges.length > 0) {
      setShowMore(!showMore);
    }
  };

  React.useEffect(() => {
    setShowMore(props.showMore);
  }, [props.showMore]);
  badges.map((b) => {
    if (b.finishedAt) {
      collected.push(b);
    } else if (b.isLocked) {
      locked.push(b);
    } else if (b.startedAt) {
      progress.push(b);
    } else {
      available.push(b);
    }
  });

  const preview = props.readonly ? collected.slice(0, 10) : badges.slice(0, 3);
  const filterClassName = "inline-block px-4 py-3 text-black bg-gray-300 rounded-full cursor-pointer";
  const getGridStyle = (gridStyle: string) => {
    if (
      (props?.toggleOptions?.active && props?.toggleOptions?.isGrid) ||
      (!props?.toggleOptions?.active && !props?.toggleOptions?.isGrid)
    ) {
      return gridStyle;
    } else if (
      (props?.toggleOptions?.active && !props?.toggleOptions?.isGrid) ||
      (!props?.toggleOptions?.active && props?.toggleOptions?.isGrid)
    ) {
      return "grid-cols-1";
    }
  };
  const getLayout = (viewport: string) => {
    if (viewport === "xl") {
      return getGridStyle("xl:grid-cols-4");
    } else if (viewport === "md" || viewport === "lg") {
      return getGridStyle("md:max-xl:grid-cols-3");
    } else if (viewport === "sm") {
      return getGridStyle("sm:max-md:grid-cols-2");
    }
    // default style if screen viewport lessthan small
    return getGridStyle("grid-cols-1");
  };
  const layoutClassName = `grid ${getLayout("default")} ${getLayout("sm")} ${getLayout("md")} ${getLayout("xl")} gap-4`;
  return (
    <div>
      <div className="grid grid-cols-4 items-center">
        {options.length && (
          <div className="flex justify-center col-span-3 space-x-4">
            {options.map((_filterObj, i) => {
              return (
                <div
                  key={`${i}`}
                  onClick={() => props.onFilterClick && props.onFilterClick(_filterObj)}
                  style={{ marginBottom: "0.6rem" }}
                  className={
                    _filterObj.isActive
                      ? `${filterClassName} active`
                      : "inline-block px-4 py-3 rounded-full hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white cursor-pointer"
                  }
                >
                  {_filterObj.name}
                </div>
              );
            })}
          </div>
        )}
        <div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={props?.toggleOptions?.active}
              onChange={() => props.onToggleClick && props.onToggleClick()}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              onClick={() => props.onToggleClick && props.onToggleClick()}
            >
              {props?.toggleOptions?.label}
            </span>
          </label>
        </div>
      </div>

      <Widget isLoading={props.isLoading}>
        <WidgetHeader divide>
          <div className="p-2 flex w-full gap-x-2 text-zinc-600">
            <div className="shrink-0 h-10 w-10">
              <Icon name="award ribbon" />
            </div>
            <p className="shrink-0 my-auto font-semibold">Badges</p>

            <div className="shrink-0 mt-auto ml-auto text-sm">
              <span className="font-semibold">
                {collected.length}
                {props.readonly ? "" : "/" + badges.length} Badges
              </span>
              <span className="ml-1">collected</span>
            </div>
          </div>
        </WidgetHeader>
        <WidgetBody>
          <div className="pt-2 pb-5 px-2">
            {!props.readonly && (
              <div className="p-2 flex w-full gap-x-2 text-zinc-600">
                <div
                  onClick={toggleShowMore}
                  className="shrink-0 flex w-max ml-auto text-sm cursor-pointer text-zinc-400 hover:text-zinc-500"
                >
                  <span>Show more</span>
                  <div className="inline-block ml-1 overflow-hidden h-5 w-5">
                    <Icon name="up & down arrow" />
                  </div>
                </div>
              </div>
            )}

            {!showMore && (
              <div className={layoutClassName}>
                {preview.map((b, i) => {
                  return <Badge key={i} {...b} readonly={props.readonly} />;
                })}
              </div>
            )}
            {showMore && (
              <div className="text-zinc-600 grid grid-cols-1 gap-y-4">
                {progress.length > 0 && (
                  <div>
                    <p className="mb-3 font-semibold">In Progress</p>
                    <div className={layoutClassName}>
                      {progress.map((b, i) => {
                        return <Badge key={i} {...b} />;
                      })}
                    </div>
                  </div>
                )}

                {collected.length > 0 && (
                  <div>
                    <p className="mb-3 font-semibold">Collected</p>
                    <div className={layoutClassName}>
                      {collected.map((b, i) => {
                        return <Badge key={i} {...b} />;
                      })}
                    </div>
                  </div>
                )}

                {available.length > 0 && (
                  <div>
                    <p className="mb-3 font-semibold">Available</p>
                    <div className={layoutClassName}>
                      {available.map((b, i) => {
                        return <Badge key={i} {...b} />;
                      })}
                    </div>
                  </div>
                )}

                {locked.length > 0 && (
                  <div>
                    <p className="mb-3 font-semibold">Locked</p>
                    <div className={layoutClassName}>
                      {locked.map((b, i) => {
                        return <Badge key={i} {...b} />;
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </WidgetBody>
      </Widget>
    </div>
  );
};
