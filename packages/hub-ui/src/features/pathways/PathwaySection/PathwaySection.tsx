import * as React from "react";
import { Widget, WidgetBody, WidgetHeader } from "../../../components/Widget";
import { Pathway, PathwayProps } from "../Pathway/Pathway";
import { PathwayButton, PathwayButtonProps } from "../PathwayButton/PathwayButton";
import { Icon } from "../../../components/Icon/Icon";

const DEFAULT_FILTERS = [
  {label: "In Progress"},
  {label: "Completed"},
  {label: "Available"},
  {label: "Locked"}
]

export type PathwayFilterOption = {
  label: string;
  isActive?: boolean;
};

/**
 * PathwaySectionProps
 */
export type PathwaySectionProps = {
  pathways: PathwayProps[];
  isLoading?: boolean;
  readonly?: boolean;
  list?: boolean
  onToggleLayout?: (next: boolean) => void;
};

/**
 * PathwaySection
 * @param props
 * @constructor
 */
export const PathwaySection = (props: PathwaySectionProps) => {
  const progress: PathwayProps[] = [];
  const locked: PathwayProps[] = [];
  const available: PathwayProps[] = [];
  const collected: PathwayProps[] = [];

  props.pathways.map((p) => {
    if (true) {
    // if (b.finishedAt) { //TODO FIXME implement pathway completed logic
    //   collected.push(b);
    // } else if (b.isLocked) {
    //   locked.push(b);
    // } else if (b.startedAt) {
    //   progress.push(b);
    // } else {
    //   available.push(b);
    // }
      progress.push(p)
    }
  });

  const [list, setList] = React.useState(props.list)
  const preview = props.readonly ? collected.slice(0, 10) : props.pathways.slice(0, 3);
  const layoutClassName = getLayout(list)
  const showSectionHeaders = true
  React.useEffect(() => {
      setList(props.list)
  }, [props.list])

  React.useEffect(() => {
    if(list !== undefined && props.list !== list && props.onToggleLayout){
      props.onToggleLayout(list)
    }
  }, [list])

  return (
    <div>
      <Widget isLoading={props.isLoading}>
        <WidgetHeader divide>
          <div className="py-2 flex w-full gap-x-2 text-zinc-600">
            <div className="shrink-0 h-10 w-10">
              <Icon name="award ribbon" />
            </div>
            <p className="shrink-0 my-auto font-semibold">Pathways</p>

            <div className="shrink-0 mt-auto ml-auto text-sm">
              <span className="font-semibold">
                {collected.length}
                {props.readonly ? "" : "/" + props.pathways.length} Pathways
              </span>
              <span className="ml-1">completed</span>
            </div>
          </div>
        </WidgetHeader>
        <WidgetBody>
          <div className="pb-5">
            <div className="grid grid-cols-1 gap-y-5">
              <div className="flex flex-wrap gap-4 items-center justify-between text-sm">
                    <div className="flex justify-center col-span-3 space-x-4 text-sm">
                    </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={!list}
                        onChange={() => setList(!list)}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span
                        className="ml-3 text-sm font-bold text-gray-700"
                        onChange={() => setList(!list)}
                    >
              Grid View?
            </span>
                  </label>
                </div>
              </div>
              <div>
                {!!props.readonly && (
                    <div className={layoutClassName}>
                      {preview.map((p, i) => {
                        return <PathwayButton key={i} {...p} compact={list} />;
                      })}
                    </div>
                )}
                {!props.readonly && (
                    <div className="text-zinc-600 grid grid-cols-1 gap-y-4">
                      { progress.length > 0 && (
                          <div>
                            {showSectionHeaders && <p className="mb-3 text-md underline font-bold">In Progress</p>}
                            <div className={layoutClassName}>
                              {progress.map((p, i) => {
                                return <PathwayButton key={i} {...p} compact={list}/>;
                              })}
                            </div>
                          </div>
                      )}

                      { collected.length > 0 && (
                          <div>
                            {showSectionHeaders && <p className="mb-3 text-md underline font-bold">Completed</p> }
                            <div className={layoutClassName}>
                              {collected.map((p, i) => {
                                return <PathwayButton key={i} {...p} compact={list}/>;
                              })}
                            </div>
                          </div>
                      )}

                      { available.length > 0 && (
                          <div>
                            {showSectionHeaders && <p className="mb-3 text-md underline font-bold">Available</p> }
                            <div className={layoutClassName}>
                              {available.map((p, i) => {
                                return <PathwayButton key={i} {...p} compact={list}/>;
                              })}
                            </div>
                          </div>
                      )}

                      { locked.length > 0 && (
                          <div>
                            {showSectionHeaders && <p className="mb-3 text-md underline font-bold">Locked</p> }
                            <div className={layoutClassName}>
                              {locked.map((p, i) => {
                                return <PathwayButton key={i} {...p} compact={list}/>;
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

const getLayout = (list?: boolean) => {
  if(list){
    return "grid grid-cols-1 overflow-y-auto max-h-96"
  }

  return "flex flex-wrap gap-3"
}