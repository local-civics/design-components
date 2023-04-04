import * as React from "react";
import { Widget, WidgetBody, WidgetHeader } from "../../../components/Widget";
import { Badge, BadgeProps } from "../Badge/Badge";
import { Icon } from "../../../components/Icon/Icon";

const DEFAULT_FILTERS = [
  {label: "In Progress", isActive: true},
  {label: "Completed", isActive: true},
  {label: "Available", isActive: true},
  {label: "Locked", isActive: true}
]

export type BadgeFilterOption = {
  label: string;
  isActive?: boolean;
};

/**
 * BadgeSectionProps
 */
export type BadgeSectionProps = {
  badges: BadgeProps[];
  isLoading?: boolean;
  readonly?: boolean;
  showMore?: boolean;
  grid?: boolean
  onGridToggle?: (next: boolean) => void;
  filters?: BadgeFilterOption[];
  onFilterChange?: (next: BadgeFilterOption[]) => void;
};

/**
 * BadgeSection
 * @param props
 * @constructor
 */
export const BadgeSection = (props: BadgeSectionProps) => {
  const options = props.filters || [];
  const progress: BadgeProps[] = [];
  const locked: BadgeProps[] = [];
  const available: BadgeProps[] = [];
  const collected: BadgeProps[] = [];

  props.badges.map((b) => {
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

  const [grid, setGrid] = React.useState(props.grid)
  const [filters, setFilters] = React.useState(filtersByLabel(props.filters))
  const propsFilterKey = JSON.stringify(props.filters)
  const filterKey = JSON.stringify(filters)
  const preview = props.readonly ? collected.slice(0, 10) : props.badges.slice(0, 3);
  const filterClassName = "inline-block px-4 py-3 bg-gray-600 text-white rounded-full cursor-pointer";
  const layoutClassName = getLayout(grid)
  const numberOfActiveFilters = Object.values(filters).filter(v => v.isActive).length
  const isWithoutFilters = numberOfActiveFilters == 0
  const showSectionHeaders = numberOfActiveFilters > 1

  React.useEffect(() => {
      setGrid(props.grid)
  }, [props.grid])

  React.useEffect(() => {
    if(grid !== undefined && props.grid !== grid && props.onGridToggle){
      props.onGridToggle(grid)
    }
  }, [grid])

  React.useEffect(() => {
    setFilters(filtersByLabel(props.filters))
  }, [propsFilterKey])

  React.useEffect(() => {
    if(propsFilterKey !== filterKey && props.onFilterChange){
      props.onFilterChange(Object.values(filters))
    }
  }, [filterKey])

  return (
    <div>
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
                {props.readonly ? "" : "/" + props.badges.length} Badges
              </span>
              <span className="ml-1">collected</span>
            </div>
          </div>
        </WidgetHeader>
        <WidgetBody>
          <div className="pt-2 pb-5 px-2">
            <div className="grid grid-cols-1 gap-y-5">
              <div className="flex flex-wrap gap-4 items-center justify-between text-sm">
                {options.length > 0 && (
                    <div className="flex justify-center col-span-3 space-x-4">
                      {options.map((opt, i) => {
                        return (
                            <div
                                key={`${i}`}
                                onClick={() => {
                                  if(!(opt.label in filters)){
                                    return
                                  }

                                  const next = {...filters}
                                  next[opt.label].isActive = !next[opt.label].isActive
                                  setFilters(next)
                                }}
                                style={{ marginBottom: "0.6rem" }}
                                className={
                                  opt.isActive
                                      ? `${filterClassName} active`
                                      : "inline-block px-4 py-3 rounded-full hover:bg-gray-700 hover:text-white cursor-pointer"
                                }
                            >
                              {opt.label}
                            </div>
                        );
                      })}
                    </div>
                )}
                {grid !== undefined && <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={grid}
                        onChange={() => setGrid(!grid)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span
                        className="ml-3 text-sm font-bold text-gray-700"
                        onClick={() => setGrid(!grid)}
                    >
              Grid View?
            </span>
                  </label>
                </div>}
              </div>
              <div>
                {!props.showMore && (
                    <div className={layoutClassName}>
                      {preview.map((b, i) => {
                        return <Badge key={i} {...b} compact={!grid} readonly={props.readonly} />;
                      })}
                    </div>
                )}
                {!!props.showMore && (
                    <div className="text-zinc-600 grid grid-cols-1 gap-y-4">
                      {(isWithoutFilters || "In Progress" in filters && filters["In Progress"].isActive) && progress.length > 0 && (
                          <div>
                            {showSectionHeaders && <p className="mb-3 font-semibold">In Progress</p>}
                            <div className={layoutClassName}>
                              {progress.map((b, i) => {
                                return <Badge key={i} {...b} compact={!grid}/>;
                              })}
                            </div>
                          </div>
                      )}

                      {(isWithoutFilters || "Completed" in filters && filters["Completed"].isActive) && collected.length > 0 && (
                          <div>
                            {showSectionHeaders && <p className="mb-3 font-semibold">Completed</p> }
                            <div className={layoutClassName}>
                              {collected.map((b, i) => {
                                return <Badge key={i} {...b} compact={!grid}/>;
                              })}
                            </div>
                          </div>
                      )}

                      {(isWithoutFilters || "Available" in filters && filters["Available"].isActive) && available.length > 0 && (
                          <div>
                            {showSectionHeaders && <p className="mb-3 font-semibold">Available</p> }
                            <div className={layoutClassName}>
                              {available.map((b, i) => {
                                return <Badge key={i} {...b} compact={!grid}/>;
                              })}
                            </div>
                          </div>
                      )}

                      {(isWithoutFilters || "Locked" in filters && filters["Locked"].isActive) && locked.length > 0 && (
                          <div>
                            {showSectionHeaders && <p className="mb-3 font-semibold">Locked</p> }
                            <div className={layoutClassName}>
                              {locked.map((b, i) => {
                                return <Badge key={i} {...b} compact={!grid}/>;
                              })}
                            </div>
                          </div>
                      )}
                    </div>
                )}
              </div>
            </div>
          </div>
        </WidgetBody>
      </Widget>
    </div>
  );
};

const getLayout = (grid?: boolean) => {
  if(grid){
    return "flex flex-wrap gap-4"
  }

  return "grid grid-cols-1 overflow-y-auto max-h-96"
}

const filtersByLabel = (filters?: BadgeFilterOption[]) => {
  const ans: Record<string, BadgeFilterOption> = {}
  const params = filters || DEFAULT_FILTERS
  params.forEach(v => {
    ans[v.label] = v
  })
  return ans
}