import * as React                                     from "react";
import {Student, ManageClass, ManageClassProps} from "./ManageClass";
import { Story }                                      from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Educator/Classes/ManageClass",
  component: ManageClass,
};

/**
 * Component storybook template
 */
const Template: Story<ManageClassProps> = (args) => {
    const now = new Date()

    const students: Student[] = [{
        studentId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL1",
        displayName: "Student #1",
        email: "student1@gmail.com",
        avatarURL: "https://lh3.googleusercontent.com/a/AItbvmndpec5Ps_Y4R9SoKHgHtK_r7Vg_fhB92PTmhZj=s96-c",
        lastActivity: new Date(now.getTime() - (30 * 60 * 1000)).toISOString(),
        online: true,
        grade: "9",
    },{
        studentId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL2",
        displayName: "Student #2",
        email: "student2@gmail.com",
        avatarURL: "https://lh3.googleusercontent.com/a/AItbvmndpec5Ps_Y4R9SoKHgHtK_r7Vg_fhB92PTmhZj=s96-c",
        lastActivity: new Date(now.getTime() - (45 * 60 * 1000)).toISOString(),
        online: true,
        grade: "12",
    },{
        studentId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL3",
        displayName: "Student #3",
        email: "student3@gmail.com",
        avatarURL: "https://lh3.googleusercontent.com/a/AItbvmndpec5Ps_Y4R9SoKHgHtK_r7Vg_fhB92PTmhZj=s96-c",
        lastActivity: "2022-01-01",
        grade: "10",
    },{
        studentId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL4",
        displayName: "Student #4",
        email: "student4@gmail.com",
        avatarURL: "https://lh3.googleusercontent.com/a/AItbvmndpec5Ps_Y4R9SoKHgHtK_r7Vg_fhB92PTmhZj=s96-c",
        grade: "11",
    },{
        studentId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL5",
        displayName: "Student #5",
        email: "student5@gmail.com",
        avatarURL: "https://lh3.googleusercontent.com/a/AItbvmndpec5Ps_Y4R9SoKHgHtK_r7Vg_fhB92PTmhZj=s96-c",
        grade: "12",
    },{
        studentId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL6",
        displayName: "Student #6",
        email: "student6@gmail.com",
        avatarURL: "https://lh3.googleusercontent.com/a/AItbvmndpec5Ps_Y4R9SoKHgHtK_r7Vg_fhB92PTmhZj=s96-c",
        grade: "11",
    },{
        studentId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL7",
        displayName: "Student #7",
        email: "student7@gmail.com",
        avatarURL: "https://lh3.googleusercontent.com/a/AItbvmndpec5Ps_Y4R9SoKHgHtK_r7Vg_fhB92PTmhZj=s96-c",
        grade: "10",
    },{
        studentId: "P3orv6ygAHPWXsmtiqxBQf1t5cRCDQL8",
        displayName: "Student #8",
        email: "student8@gmail.com",
        avatarURL: "https://lh3.googleusercontent.com/a/AItbvmndpec5Ps_Y4R9SoKHgHtK_r7Vg_fhB92PTmhZj=s96-c",
        grade: "9",
    },]

    return <div className="h-screen w-full overscroll-none font-proxima pt-10">
      <ManageClass
          displayName="AP History"
          grade="Mixed"
          subject="History"
          size={16}
          students={students}
          {...args}
      />
  </div>
};

/**
 * Component stories
 */
export const Component: Story<ManageClassProps> = Template.bind({});
Component.args = {};
