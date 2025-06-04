import React from "react";
import { Button } from "../../Button";

/**
 * RegistrationProps
 */
export type RegistrationProps = {
  givenName?: string;
  familyName?: string;
  grade?: number;
  impactStatement?: string;
  persona?: string;
  onRegister?: (changes: { givenName?: string; familyName?: string; grade?: number; impactStatement?: string }) => void;
};

/**
 * A component for onboarding registration
 * @param props
 * @constructor
 */
export const Registration = (props: RegistrationProps) => {
  const [givenName, setGivenName] = React.useState(props.givenName);
  const [familyName, setFamilyName] = React.useState(props.familyName);
  const [grade, setGrade] = React.useState(props.grade);
  const [impactStatement, setImpactStatement] = React.useState(props.impactStatement || "");

  const onRegister = () =>
    props.onRegister &&
    props.onRegister({
      givenName,
      familyName,
      grade,
      impactStatement: impactStatement || "",
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onRegister();
      }}
      className="w-full md:w-[32rem] rounded-md border bg-white border-slate-200 shadow-sm px-8 py-5 grid grid-cols-1 gap-4 -mt-4"
    >
      <div className="text-slate-600 text-start">
        <p className="font-bold text-2xl">Welcome to Local!</p>
        <p className="text-sm">Tell us a bit more about yourself.</p>
      </div>

      <div className="grid grid-cols-1 pb-4 gap-6">
        <div className="grid grid-cols-1 gap-6 h-[18rem] md:h-[24rem] px-1 overflow-y-scroll">
          <div>
            <p className="mb-2 w-full font-semibold text-slate-500 text-sm">First Name</p>
            <input
              required
              type="text"
              placeholder="Insert your first name"
              onChange={(e) => setGivenName(e.target.value)}
              defaultValue={givenName || ""}
              className="mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            />
          </div>

          <div className="w-full">
            <p className="mb-2 font-semibold text-slate-500 text-sm">Last Name</p>
            <input
              required
              placeholder="Insert your last name"
              onChange={(e) => setFamilyName(e.target.value)}
              defaultValue={familyName || ""}
              className="mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            />
          </div>

          {props.persona === "educator" && (
            <div>
              <p className="mb-2 font-semibold text-slate-500 text-sm">Subject</p>
              <select
                onChange={(e) => setGrade(parseInt(e.target.value, 10))}
                defaultValue={grade || ""}
                className="appearance-none mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
              >
                <option>Select a subject</option>
                <option value="social-studies-teacher">Social Studies Teacher</option>
                <option value="english-teacher">English Teacher</option>
                <option value="math-teacher">Math Teacher</option>
                <option value="science-teacher">Science Teacher</option>
                <option value="special-education-teacher">Special Education Teacher (Generalist)</option>
                <option value="counseling-or-college-and-career">Counseling/College & Career Readiness</option>
                <option value="non-instructional-staff">Non-Instructional Staff</option>
                <option value="school-leadership">School Leadership</option>
              </select>
            </div>
          )}

          <div>
            <p className="mb-2 font-semibold text-slate-500 text-sm">Grade</p>
            <select
              onChange={(e) => setGrade(parseInt(e.target.value, 10))}
              defaultValue={grade}
              className="appearance-none mt-1 block w-full px-3 py-2 bg-white text-slate-500 focus:text-slate-600 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            >
              <option>Select a grade</option>
              <option value="6">6th</option>
              <option value="7">7th</option>
              <option value="8">8th</option>
              <option value="9">9th</option>
              <option value="10">10th</option>
              <option value="11">11th</option>
              <option value="12">12th</option>
            </select>
          </div>

          <div>
            <p className="mb-2 font-semibold text-slate-500 text-sm">Impact Statement</p>
            <textarea
              // required
              // minLength={100} no longer required
              placeholder="E.g., I would like to encourage my community to become more educated on issues that directly affect us, as well as make sure my community is a place where everyone is welcome."
              onChange={(e) => setImpactStatement(e.target.value)}
              defaultValue={impactStatement}
              className="resize-none text-slate-500 focus:text-slate-600 h-24 mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
        focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
        disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        color={props.persona === "educator" ? "slate" : "sky"}
        size="md"
        spacing="md"
        border="rounded"
        theme="dark"
        text="Submit"
      />
    </form>
  );
};
