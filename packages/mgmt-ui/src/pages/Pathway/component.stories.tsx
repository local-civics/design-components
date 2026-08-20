import * as React          from "react";
import {MemoryRouter}      from "react-router-dom";
import {Pathway, PathwayProps} from "./Pathway";
import { Story }           from "@storybook/react";

/**
 * Storybook component configuration
 */
export default {
  title: "Pages/Pathway",
  component: Pathway,
};

/**
 * Component storybook template
 */
const Template: Story<PathwayProps> = (args) => (
    <div className="h-full w-full overscroll-none font-proxima">
        <MemoryRouter>
            <Pathway
                {...args}
                classes={args.classes || []}
                students={args.students || []}
                badges={args.badges || []}
                categories={args.categories || []}
                allCategories={args.allCategories || []}
            />
        </MemoryRouter>
    </div>
);

/**
 * Component stories
 */
export const Component: Story<PathwayProps> = Template.bind({});
Component.args = {};

/**
 * Component stories
 */
export const Mock: Story<PathwayProps> = Template.bind({});
Mock.args = {
    href: "",
    classes: [{
        classId: "",
        active: false,
        name: "AP History",
    }],
    categories: [
        {categoryId: "ramapo1category3", name: "Seal of Civic Readiness (min. 6 pts. required)", maxPoints: 0},
        {categoryId: "ramapo1category1", name: "Civic Knowledge (min. 2 pts. required)", maxPoints: 0},
        {categoryId: "ramapo1category2", name: "Civic Participation (min. 2 pts. required)", maxPoints: 0},
    ],
    allCategories: [
        {categoryId: "ramapo1category3", name: "Seal of Civic Readiness (min. 6 pts. required)", parentCategoryId: "",
            description: "Students pursuing the NY State Seal of Civic Readiness must complete all graduation requirements and earn at least 6 Civic Readiness points, including at least 2 points in Civic Knowledge and at least 2 points in Civic Participation.", maxPoints: 0},
        {categoryId: "ramapo1category1", name: "Civic Knowledge (min. 2 pts. required)", parentCategoryId: "ramapo1category3",
            description: "Criteria for demonstrating proficiency in Civic Knowledge.", maxPoints: 0},
        {categoryId: "ramapo1category2", name: "Civic Participation (min. 2 pts. required)", parentCategoryId: "ramapo1category3",
            description: "Criteria for demonstrating proficiency in Civic Participation.", maxPoints: 0},
        {categoryId: "ramapo1category14", name: "Educator Validated Badge", parentCategoryId: "ramapo1category3",
            description: "A district-added category, outside the official NYSSCR rubric, for badges an educator submits or validates directly (e.g. bulk-uploaded evidence) - reserved for future aggregate reporting on educator-submitted credit.", maxPoints: 0},
        {categoryId: "ramapo1category5", name: "1a. Required Social Studies Courses", parentCategoryId: "ramapo1category1",
            description: "4 credits of Social Studies required for graduation: Global I History and Geography, Global II History and Geography, United States History and Government, Participation in Government, Economics (or approved equivalents).", maxPoints: 1},
        {categoryId: "ramapo1category15", name: "1b. and 1c. Global Regents Scores", parentCategoryId: "ramapo1category1",
            description: "Mastery (85%+) or Proficiency (65-84%) on the Global History and Geography II Regents exam. Capped at 1.5 points total for this subject so a later score improvement doesn't add points beyond the higher tier already earned.", maxPoints: 1.5},
        {categoryId: "ramapo1category6", name: "1b. and 1c. US Regents Scores", parentCategoryId: "ramapo1category1",
            description: "Mastery (85%+) or Proficiency (65-84%) on the United States History and Government Regents exam. Capped at 1.5 points total for this subject, tracked separately from Global Regents rather than combined as in the official rubric's single Mastery/Proficiency rows.", maxPoints: 1.5},
        {categoryId: "ramapo1category7", name: "1d. Advanced Social Studies Course", parentCategoryId: "ramapo1category1",
            description: "Proficiency (65%+) in an advanced social studies course: World History, US History & Government, European History, Microeconomics, Macroeconomics, US Government & Politics, Psychology, African American Studies, SUPA Economics, or Seminar and Research. May be earned more than once.", maxPoints: 0},
        {categoryId: "ramapo1category8", name: "1e. Research Project", parentCategoryId: "ramapo1category1",
            description: "Demonstrate civic knowledge through a research project approved by the District's Seal of Civic Readiness Committee.", maxPoints: 1},
        {categoryId: "ramapo1category4", name: "2a. High School Civic Project", parentCategoryId: "ramapo1category2",
            description: "Complete a project demonstrating civic knowledge, skills, actions and mindsets, as established by the Seal of Civic Readiness Committee. Limited to two times (3 points total) across grades 9-12.", maxPoints: 3},
        {categoryId: "ramapo1category9", name: "2b. Service-Learning Project", parentCategoryId: "ramapo1category2",
            description: "Complete a minimum of 25 hours of service and a reflective civic-learning essay/presentation/product. May be earned more than once.", maxPoints: 0},
        {categoryId: "ramapo1category10", name: "2c. Proficiency in Elective Courses", parentCategoryId: "ramapo1category2",
            description: "Earn credit in an elective course that promotes civic engagement and submit an application-of-knowledge essay/presentation/product. May be earned more than once.", maxPoints: 0},
        {categoryId: "ramapo1category11", name: "2d. Extracurricular/Work-based Learning Experiences", parentCategoryId: "ramapo1category2",
            description: "Participate in an extracurricular program or work-based learning experience promoting civic engagement or action for a minimum of 40 hours, and submit an application-of-knowledge essay/presentation/product. May be earned more than once.", maxPoints: 0},
        {categoryId: "ramapo1category12", name: "2e. Middle School Capstone Project", parentCategoryId: "ramapo1category2",
            description: "Not itemized separately in the district's published chart (only the high school capstone is listed there) - included for students carrying earlier middle-school-level civic capstone work into their high school record.", maxPoints: 1},
        {categoryId: "ramapo1category13", name: "2f. High School Capstone Project", parentCategoryId: "ramapo1category2",
            description: "The Independent High School Capstone Project: identify an issue (local, state, national, or global); apply civic knowledge, skills, actions and mindsets to it; engage in a civic experience to influence positive change; and present the project to the Seal of Civic Readiness Committee.", maxPoints: 4},
    ],
    criteria: {ramapo1category3: 6, ramapo1category1: 2, ramapo1category2: 2},
    displayTags: ["NYS SEAL", "Civic Skills", "High School"],
    students: [{
        userId: "1",
        avatar: "",
        name: "Jane Doe",
        email: "jane.doe@localcivics.io",
        categoryPoints: {ramapo1category1: 1, ramapo1category2: 1.5, ramapo1category3: 2.5},
        badges: [{
            badgeName: "Example badge",
            completion: 0,
            href: "",
        },{
            badgeName: "Example badge 2",
            completion: 0.5,
            href: "",
        },{
            badgeName: "Example badge 3",
            completion: 1,
            href: "",
        }]
    },{
        userId: "2",
        avatar: "",
        name: "John Smith",
        email: "john.smith@localcivics.io",
        isComplete: true,
        categoryPoints: {ramapo1category1: 2, ramapo1category2: 3, ramapo1category3: 6},
        badges: [{
            badgeName: "Example badge",
            completion: 1,
            href: "",
        }]
    }],
    badges: [{
        badgeId: "k5JrjxSemG2s2i5SCQzomg",
        href: "/badges/k5JrjxSemG2s2i5SCQzomg/overview",
        badgeName: "NYS Seal of Civic Readiness 1a: Social Studies Courses",
        percentageCompletion: 0.4,
        categories: ["ramapo1category5", "ramapo1category1", "ramapo1category3"],
        weight: 1,
    },{
        badgeId: "2",
        href: "/badges/2/overview",
        badgeName: "High School Civic Project: Local Government Internship",
        percentageCompletion: 1,
        categories: ["ramapo1category4", "ramapo1category2", "ramapo1category3"],
        weight: 1.5,
    },{
        badgeId: "3",
        href: "/badges/3/overview",
        badgeName: "Uncategorized Badge",
        percentageCompletion: 0,
        categories: ["something-else"],
        weight: 1,
    }],
};
