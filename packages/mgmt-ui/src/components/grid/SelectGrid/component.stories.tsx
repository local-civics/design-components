import {
    IconBatteryEco,
    IconBeach,
    IconBuilding, IconLeaf,
    IconMountain,
    IconPodium,
    IconPower,
    IconSnowflake
} from "@tabler/icons";
import * as React                                                                        from "react";
import {MemoryRouter}                from "react-router-dom";
import {SelectGrid, SelectGridProps} from "./SelectGrid";
import { Story }                     from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Components/SelectGrid",
  component: SelectGrid,
};

const mockdata = [
    { description: 'Sun and sea', title: 'High school', icon: IconBeach},
    { description: 'Sightseeing', title: 'K-8', icon: IconBuilding },
    { description: 'Mountains', title: 'Civics', icon: IconMountain },
    { description: 'Snow and ice', title: 'Project-based learning', icon: IconSnowflake },
    { description: 'Higher education', title: 'College', icon: IconPodium },
    { description: 'Power', title: 'Career', icon: IconPower },
    { description: 'Plants and leaves', title: 'Student leadership', icon: IconLeaf },
];

/**
 * Component storybook template
 */
const Template: Story<SelectGridProps> = (args) => (
  <div className="h-full w-full overscroll-none font-proxima">
      <MemoryRouter>
        <SelectGrid {...args}
                items={args.items || mockdata}
        />
      </MemoryRouter>
  </div>
);

/**
 * Component stories
 */
export const Component: Story<SelectGridProps> = Template.bind({});
Component.args = {};
