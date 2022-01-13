import React, { FunctionComponent, useState } from "react";
import { Icon } from "../icon";

/**
 * PathwayTutorial props
 */
interface PathwayTutorialProps {
  visible: boolean;
  close: () => void;
}

/**
 * Pathway help
 * @param props
 * @constructor
 */
export const PathwayTutorial: FunctionComponent<PathwayTutorialProps> = (props) => {
  const [page, setPage] = useState(0);
  const next = () => {
    if (page >= 2) {
      setPage(0);
      props.close();
    } else {
      setPage(page + 1);
    }
  };

  let description = "";
  let title = "";
  switch (page) {
    case 0:
      title = "Welcome to Pathways";
      description = "An on-ramp to Civic Impact and learning.";
      break;
    case 1:
      title = "";
      description =
        "You can now select ready made journeys from each of the 5 learning areas to increase your points and earn badges!";
      break;
    case 2:
      title = "";
      description =
        "Look for Pathways on the side of your profile and click an area to get started!";
      break;
  }

  return (
    <div
      className={`grid grid-cols-1 justify-items-center content-center transition ease-in-out duration-300 fixed top-0 p-5 w-screen h-screen bg-gray-500/80 z-50 ${
        !props.visible && "invisible opacity-0"
      }`}
    >
      <div className="shadow-md p-5 w-80 lg:w-[28rem] h-64 lg:h-80 bg-white rounded-md grid grid-cols-1 justify-items-center">
        <div className="grid justify-items-end w-full">
          <Icon
            onClick={props.close}
            className="transition ease-in-out cursor-pointer stroke-gray-300 fill-gray-300 hover:stroke-gray-400 hover:fill-gray-400 w-4"
            icon="close"
          />
        </div>
        <div className="grid grid-cols-1 m-auto">
          <Icon
            className="m-auto stroke-gray-700 fill-gray-700 w-12 lg:w-16"
            icon="pathway"
          />
          <div className="h-28">
            <p className="w-max m-auto text-gray-700 font-bold text-md lg:text-lg mt-5">
              {title}
            </p>
            <p className="max-w-72 h-16 m-auto text-center text-gray-500 text-xs lg:text-sm mt">
              {description}
            </p>
          </div>
          <div className="w-max m-auto">
            <button
              onClick={next}
              className="transition-colors rounded-lg font-semibold text-white py-3 px-14 bg-sky-400 hover:bg-sky-500 lg:mt-2"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
