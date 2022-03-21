import { createServer } from "miragejs";

/**
 * Mock api
 */
export const mockApi = () => {
  createServer({
    urlPrefix: "https://api.localcivics.io",
    environment: "development",
    timing: 200,
    seeds(server) {
      server.db.loadData(data);
    },
    routes() {
      this.get("/identity/v0/resolve", (schema, request) => {
        const accessToken = request.requestHeaders["Authorization"].split(" ")[1];
        if (!accessToken) {
        }

        let resident = schema.db.tenants.where({ tenantName: accessToken })[0];
        if (resident === undefined) {
          resident = schema.db.tenants.insert({ tenantName: accessToken });
        }

        return resident;
      });

      // e.g., https://api.localcivics.io/identity/v0/communities/hcz/tenants/andre.carter?fields[]=tenantName&fields[]=avatarURL&fields[]=givenName&fields[]=familyName&fields[]=createdAt&fields[]=online&fields[]=impactStatement&fields[]=communityTrueName&fields[]=communityPlaceName
      this.get("/identity/v0/tenants/:tenantName", (schema, request) => {
        return schema.db.tenants.where({ tenantName: request.params.tenantName })[0];
      });

      this.get("/discovery/v0/tenants/:tenantName/reports", (_, request) => {
        if (request.queryParams.groups) {
          return [
            {
              pathway: "policy & government",
              xp: 500,
              nextProficiency: 1000,
            },
            {
              pathway: "college & career",
              xp: 500,
              nextProficiency: 1000,
            },
            {
              pathway: "volunteer",
              xp: 800,
              nextProficiency: 1000,
            },
            {
              pathway: "recreation",
              xp: 800,
              nextProficiency: 1000,
            },
            {
              pathway: "arts & culture",
              xp: 500,
              nextProficiency: 1000,
            },
          ];
        }

        return [
          {
            xp: 3500,
            nextProficiency: 4000,
            magnitude: 2,
          },
        ];
      });

      this.get("/curriculum/v0/communities/:communityName/badges", (schema) => {
        return schema.db.badges.where({});
      });

      this.get("/curriculum/v0/communities/:communityName/badges/:badgeName", (schema, request) => {
        return schema.db.badges.where({ badgeName: request.params.badgeName })[0];
      });

      this.get("/curriculum/v0/tenants/:tenantName/tasks", (schema, request) => {
        const query = {};
        if (request.queryParams.status) {
          query.status = request.queryParams.status;
        }

        return schema.db.tasks.where(query);
      });

      this.get("/curriculum/v0/tenants/:tenantName/tasks/:taskName", (schema, request) => {
        return schema.db.tasks.where({ taskName: request.params.taskName })[0];
      });

      this.get("/curriculum/v0/tenants/:tenantName/reflections/:activityId", (schema, request) => {
        return {};
      });

      this.patch("/identity/v0/tenants/:tenantName", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const resident = { ...schema.db.tenants.where({ tenantName: request.params.tenantName })[0], ...attrs };
        return schema.db.tenants.update({ tenantName: request.params.tenantName }, resident);
      });

      this.post("/identity/v0/communities/:communityName/tenants", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const resident = { ...schema.db.tenants.where({ tenantName: attrs.tenantName })[0] };
        resident.communityName = request.params.communityName;
        return schema.db.tenants.update({ tenantName: attrs.tenantName }, resident);
      });

      this.put("/identity/v0/tenants/:tenantName/interests", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const resident = { ...schema.db.tenants.where({ tenantName: request.params.tenantName })[0], ...attrs };
        return schema.db.tenants.update({ tenantName: request.params.tenantName }, resident);
      });

      this.put("/identity/v0/tenants/:tenantName/impact-statement", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const resident = { ...schema.db.tenants.where({ tenantName: request.params.tenantName })[0], ...attrs };
        return schema.db.tenants.update({ tenantName: request.params.tenantName }, resident);
      });

      this.put("/identity/v0/tenants/:tenantName/avatar", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const resident = { ...schema.db.tenants.where({ tenantName: request.params.tenantName })[0], ...attrs };
        return schema.db.tenants.update({ tenantName: request.params.tenantName }, resident);
      });

      this.put("/curriculum/v0/tenants/:tenantName/badges/:badgeName", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const badge = { ...schema.db.badges.where({ badgeName: request.params.badgeName })[0], ...attrs };
        badge.status = "in-progress";
        return schema.db.badges.update({ badgeName: request.params.badgeName }, badge);
      });

      this.patch("/curriculum/v0/tenants/:tenantName/tasks/:taskName", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const task = { ...schema.db.tasks.where({ taskName: request.params.taskName })[0], ...attrs };
        return schema.db.tasks.update({ taskName: request.params.taskName }, task);
      });

      this.put("/identity/v0/tenants/:tenantName", (schema, request) => {
        if (request.params.tenantName === "my" || request.params.tenantName === "me") {
          request.params.tenantName = "andre.carter";
        }
        const attrs = JSON.parse(request.requestBody);
        return schema.db.tenants.update({ tenantName: request.params.tenantName }, attrs);
      });

      this.get("/identity/v0/communities", (schema) => {
        return schema.db.communities.where({});
      });

      this.get("/identity/v0/communities/:communityId", (schema, request) => {
        const query = {
          communityId: request.params.communityId,
          ...request.queryParams,
        };
        return schema.db.communities.where(query)[0];
      });

      this.get("/curriculum/v0/communities/:communityName/experiences", (schema, request) => {
        let experiences = schema.db.experiences.where({});
        const query = request.queryParams;
        experiences = experiences.filter((experience) => {
          let match = true;
          if (query.headline) {
            match = match && experience.headline.toLowerCase().startsWith(query.headline.toLowerCase());
          }

          if (query.tags) {
            match = match && query.tags.filter((tag) => experience.tags.includes(tag)).length > 0;
          }

          if (query.pathways) {
            match = match && query.pathways.includes(experience.pathway);
          }

          if (query.status) {
            const status = query.status === "survey" ? "contributed" : query.status;
            match = match && experience.status === status;
          }

          if (query.timePeriod === "milestone") {
            match = match && !experience.startTime;
          }

          if (query.date) {
            match =
              match &&
              experience.startTime &&
              new Date(experience.startTime).toISOString().substring(0, 10) === query.date;
          }

          if (query.order) {
            match = match && experience.order === query.order;
          }

          return match;
        });

        const limit = query.limit || 10;
        const page = query.page || 0;
        return experiences.slice(page * limit, page * limit + limit);
      });

      this.get("/curriculum/v0/communities/:communityName/experiences/:activityId", (schema, request) => {
        let experiences = schema.db.experiences.where({ activityId: request.params.activityId });
        return experiences[0];
      });
    },
  });
};

const randomName = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

const tasks = [
  {
    taskName: "tasks.1",
    headline: "Task #1",
    summary: "Do something nice.",
    pathway: "policy & government",
    status: "todo",
  },
  {
    taskName: "tasks.2",
    headline: "Task #2",
    summary: "Do something nice.",
    pathway: "arts & culture",
    status: "todo",
  },
  {
    taskName: "set.avatar",
    actionName: "avatar.set",
    headline: "Set your avatar",
    summary: "Show the world your creativity.",
    status: "todo",
  },
  {
    taskName: "create.reflection",
    actionName: "reflections.create",
    headline: "Submit your reflection",
    activityId: "experience",
    summary: "Submit a reflection of your experience.",
    status: "todo",
  },
  {
    taskName: "tasks.3",
    headline: "Task #3",
    summary: "Do something nice.",
    pathway: "college & career",
    status: "todo",
  },
  {
    taskName: "tasks.4",
    headline: "Task #4",
    summary: "Do something nice.",
    pathway: "volunteer",
    status: "todo",
    notAfter: new Date("2020-01-01").toString(),
  },
  {
    taskName: "tasks.5",
    headline: "Task #5",
    summary: "Do something nice.",
    pathway: "recreation",
    status: "todo",
    startTime: new Date("2222-01-01").toString(),
  },
  {
    taskName: "tasks.6",
    headline: "Task #1",
    summary: "Do something nice.",
    pathway: "policy & government",
    status: "in-progress",
  },
  {
    taskName: "tasks.7",
    headline: "Task #2",
    summary: "Do something nice.",
    pathway: "arts & culture",
    status: "in-progress",
  },
  {
    taskName: "tasks.8",
    headline: "Task #1",
    summary: "Do something nice.",
    pathway: "volunteer",
    status: "done",
  },
];

const readiness = [
  {
    pathways: ["college & career"],
    xp: 250,
    nextProficiency: 500,
  },
  {
    pathways: ["policy & government"],
    xp: 300,
    nextProficiency: 500,
  },
  {
    pathways: ["arts & culture"],
    xp: 500,
    nextProficiency: 500,
  },
  {
    pathways: ["volunteer"],
    xp: 100,
    nextProficiency: 500,
  },
  {
    pathways: ["recreation"],
    xp: 400,
    nextProficiency: 500,
  },
  {
    pathways: ["sum"],
    xp: 3475,
    magnitude: 2,
    reflections: 12,
    badges: 3,
    milestones: 7,
    nextProficiency: 3975,
  },
];

const badges = [
  {
    badgeName: "onboarding.badge",
    headline: "Onboarding Badge",
    summary: "Get on the platform and check things out.",
    imageURL: "https://cdn.localcivics.io/badges/onboarding.png",
    tasks: [
      {
        taskName: "onboarding.badge.about",
        headline: "Tell us about yourself",
        status: "done",
      },
      {
        taskName: "onboarding.badge.impact",
        headline: "Complete the initial impact quiz",
        status: "done",
      },
      {
        taskName: "onboarding.badge.avatar",
        headline: "Set your avatar",
        actionURL: `/tenants/andre.carter/settings`,
        status: "todo",
      },
    ],
    status: "done",
  },
  {
    badgeName: "participation.badge",
    headline: "Participation Badge",
    summary: "Get out of your shy shell",
    imageURL: "https://cdn.localcivics.io/badges/participation.png",
    tasks: [
      {
        taskName: "objective.1",
        headline: "Complete one civic milestone",
        status: "done",
      },
      {
        taskName: "objective.2",
        headline: "Complete the political pathway",
        status: "todo",
      },
      {
        taskName: "objective.3",
        headline: "Attend two guest speaker experiences",
        status: "todo",
      },
    ],
    status: "done",
  },
  {
    badgeName: "civic.lens.badge",
    headline: "Civic Lens Badge",
    summary: "See through the lens of civics.",
    imageURL: "https://cdn.localcivics.io/badges/civic-lens.png",
    tasks: [
      {
        taskName: "objective.1",
        headline: "Complete one civic milestone",
        status: "done",
      },
      {
        criterionName: "objective.2",
        headline: "Complete the political pathway",
        status: "todo",
      },
      {
        criterionName: "objective.3",
        headline: "Attend two guest speaker experiences",
        status: "todo",
      },
    ],
    status: "done",
  },
  {
    badgeName: "college.explorer.badge",
    headline: "College Explorer Badge",
    summary: "Learn about the different colleges and their unique offerings.",
    imageURL: "https://cdn.localcivics.io/badges/college-explorer.png",
    tasks: [
      {
        taskName: "objective.1",
        headline: "Complete one civic milestone",
        status: "done",
      },
      {
        criterionName: "objective.2",
        headline: "Complete the political pathway",
        status: "todo",
      },
      {
        criterionName: "objective.3",
        headline: "Attend two guest speaker experiences",
        status: "todo",
      },
    ],
    status: "done",
  },
  {
    badgeName: "us.history.badge",
    headline: "U.S History Badge",
    summary: "Learn about the history of the United States.",
    imageURL: "https://cdn.localcivics.io/badges/us-history.png",
    tasks: [
      {
        taskName: "objective.1",
        headline: "Complete one civic milestone",
        status: "done",
      },
      {
        taskName: "objective.2",
        headline: "Complete the political pathway",
        status: "todo",
      },
      {
        taskName: "objective.3",
        headline: "Attend two guest speaker experiences",
        status: "todo",
      },
    ],
    status: "done",
  },
  {
    badgeName: "tech.guru.badge",
    summary: "Become a master of technology.",
    headline: "Tech Guru Badge",
    tasks: [
      {
        taskName: "objective.1",
        headline: "Complete one civic milestone",
        status: "todo",
      },
      {
        taskName: "objective.2",
        headline: "Complete the political pathway",
        status: "todo",
      },
      {
        taskName: "objective.3",
        headline: "Attend two guest speaker experiences",
        status: "todo",
      },
    ],
    status: "todo",
  },
  {
    badgeName: "elected.official.badge",
    summary: "Meet your elected official in your community.",
    headline: "Elected Official Badge",
    tasks: [
      {
        taskName: "objective.1",
        headline: "Complete one civic milestone",
        status: "todo",
      },
      {
        taskName: "objective.2",
        headline: "Complete the political pathway",
        status: "todo",
      },
      {
        taskName: "objective.3",
        headline: "Attend two guest speaker experiences",
        status: "todo",
      },
    ],
  },
];

const tenants = [
  {
    tenantName: "resident",
  },
  {
    tenantName: "andre.carter",
    communityName: "hcz",
    identityId: "me",
    givenName: "Andre",
    familyName: "Carter",
    impactStatement:
      "I would like to encourage my community to become more educated on issues that directly affect us, as well as make sure my community is a place where everyone is welcome.",
    communityTrueName: "Harlem Children Zone",
    communityPlaceName: "Harlem, NY",
    grade: "7",
    createdAt: "January 1, 2020",
    online: true,
  },
];

const experiences = [
  {
    courseName: "hcz",
    activityId: "experience",
    tenantName: "andre.carter",
    experienceId: "hcz.experience.0.top",
    headline: "Voter Registration 101",
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    address: "200 Willoughby Ave, Brooklyn, NY, 11205",
    link: "https://www.localcivics.io",
    startTime: new Date(),
    imageURL: "https://cdn.localcivics.io/area/policy-and-government.jpg",
    pathway: "policy & government",
    tags: [],
    skills: ["leadership", "public speaking", "group work"],
    status: "unregistered",
    xp: 250,
    order: "top",
  },
  {
    courseName: "hcz",
    experienceId: "hcz.experience.1.top",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "Guess the Odd One Out",
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    startTime: new Date(),
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/arts-and-culture.jpg",
    pathway: "arts & culture",
    tags: ["area:arts & culture"],
    status: "registered",
    xp: 250,
    order: "top",
  },
  {
    courseName: "hcz",
    experienceId: "hcz.experience.2.top",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "Explore NYC Public Data - Your School",
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    startTime: new Date(),
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/volunteer.jpg",
    pathway: "volunteer",
    tags: ["area:volunteer"],
    status: "opportunity",
    xp: 250,
    order: "top",
  },

  {
    courseName: "hcz",
    experienceId: "hcz.experience.3.top",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "YA Anime Club",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/recreation.jpg",
    pathway: "recreation",
    tags: ["area:recreation"],
    status: "registered",
    startTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() + 1),
    xp: 250,
    order: "top",
  },
  {
    courseName: "hcz",
    activityId: randomName(),
    tenantName: "andre.carter",
    experienceId: "hcz.experience.0.top",
    headline: "Voter Registration 101 (Breakout I)",
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    url: "https://www.localcivics.io",
    startTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() + 1),
    imageURL: "https://cdn.localcivics.io/area/sponsored.jpg",
    pathway: "policy & government",
    tags: ["area:policy & government", "skill:leadership", "skill:speaking", "skill:group"],
    status: "opportunity",
    xp: 250,
    order: "sponsored",
  },
  {
    courseName: "hcz",
    experienceId: "hcz.experience.1.top",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "Guess the Odd One Out (Breakout I)",
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    startTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() + 2),
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/sponsored.jpg",
    pathway: "arts & culture",
    tags: ["area:arts & culture"],
    status: "registered",
    xp: 250,
    order: "sponsored",
  },
  {
    courseName: "hcz",
    experienceId: "hcz.experience.3.top",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "YA Anime Club (Breakout I)",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/sponsored.jpg",
    pathway: "recreation",
    tags: ["area:recreation"],
    status: "registered",
    startTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() + 2),
    xp: 250,
    order: "sponsored",
  },
  {
    courseName: "hcz",
    activityId: randomName(),
    tenantName: "andre.carter",
    experienceId: "hcz.experience.0.top",
    headline: "Voter Registration 101 (Prep)",
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    url: "https://www.localcivics.io",
    startTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() + 3),
    imageURL: "https://cdn.localcivics.io/area/policy-and-government.jpg",
    pathway: "policy & government",
    tags: ["area:policy & government", "skill:leadership", "skill:speaking", "skill:group"],
    status: "opportunity",
    xp: 250,
    order: "soonest",
  },
  {
    courseName: "hcz",
    experienceId: "hcz.experience.1.top",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "Guess the Odd One Out (Prep)",
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    startTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() + 3),
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/arts-and-culture.jpg",
    pathway: "arts & culture",
    tags: ["area:arts & culture"],
    status: "registered",
    xp: 250,
    order: "soonest",
  },
  {
    courseName: "hcz",
    experienceId: "hcz.experience.3.top",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "YA Anime Club (Prep)",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/recreation.jpg",
    pathway: "recreation",
    tags: ["area:recreation"],
    status: "registered",
    startTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() + 4),
    xp: 250,
    order: "soonest",
  },
  {
    courseName: "hcz",
    activityId: randomName(),
    tenantName: "andre.carter",
    experienceId: "andre.carter.milestone.experience.0",
    headline: "Dive into the Constitution I",
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    url: "https://www.localcivics.io",
    timePeriod: "milestone",
    imageURL: "https://cdn.localcivics.io/area/policy-and-government.jpg",
    pathway: "policy & government",
    tags: ["area:policy & government", "skill:leadership", "skill:speaking", "skill:group"],
    status: "contributed",
    xp: 250,
  },
  {
    courseName: "hcz",
    experienceId: "andre.carter.milestone.experience.1",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "Annual Conference on Civics Education",
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    timePeriod: "milestone",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/policy-and-government.jpg",
    pathway: "policy & government",
    tags: ["area:sponsored"],
    status: "contributed",
    xp: 250,
  },
  {
    courseName: "hcz",
    experienceId: "andre.carter.milestone.experience.2",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "Explore NYC Public Data - Your School",
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    timePeriod: "milestone",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/volunteer.jpg",
    pathway: "volunteer",
    tags: ["area:volunteer"],
    status: "survey",
    xp: 250,
  },
  {
    courseName: "hcz",
    experienceId: "andre.carter.milestone.experience.3",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "Tech Event REWIND: Careers in Philanthropy & the Arts with Obi Asiama",
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    timePeriod: "milestone",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/college-and-career.jpg",
    pathway: "college & career",
    tags: ["area:college & career"],
    status: "survey",
    xp: 250,
  },
  {
    courseName: "hcz",
    experienceId: "andre.carter.milestone.experience.4",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "Guess the Odd One Out II",
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    timePeriod: "milestone",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/arts-and-culture.jpg",
    pathway: "arts & culture",
    tags: ["area:arts & culture"],
    status: "survey",
    xp: 250,
  },
  {
    courseName: "hcz",
    experienceId: "andre.carter.milestone.experience.5",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "Dive into the Constitution II",
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    timePeriod: "milestone",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/policy-and-government.jpg",
    pathway: "policy & government",
    tags: ["area:policy & government"],
    status: "survey",
    xp: 250,
  },
  {
    courseName: "hcz",
    experienceId: "andre.carter.watched.experience.0",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "Exploring Careers in Technology",
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/college-and-career.jpg",
    pathway: "college & career",
    tags: ["area:college & career"],
    status: "registered",
    startTime: new Date(),
    xp: 250,
  },
  {
    courseName: "hcz",
    experienceId: "andre.carter.watched.experience.1",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "Graphic Novel Open Book Discussion",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/arts-and-culture.jpg",
    pathway: "arts & culture",
    tags: ["area:arts & culture"],
    status: "registered",
    startTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() + 4),
    xp: 250,
  },
  {
    courseName: "hcz",
    experienceId: "andre.carter.watched.experience.2",
    activityId: randomName(),
    tenantName: "andre.carter",
    headline: "YA Anime Club",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    summary: "An opportunity to engage on the platform and find new ways to impact your community.",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/recreation.jpg",
    pathway: "recreation",
    tags: ["area:recreation"],
    status: "registered",
    startTime: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay() + 5),
    xp: 250,
  },
];

const data = {
  tenants: tenants,
  tasks: tasks,
  passports: [
    {
      actorId: "andre.carter",
      reflections: 12,
      badges: 3,
      milestones: 7,
      stage: 2,
      xp: 3475,
      nextXP: 3975,
    },
  ],
  communities: [
    {
      communityId: "hcz",
      communityName: "hcz",
      headline: "Harlem Children Zone",
      placeName: "Harlem, NY",
    },
  ],
  experiences: experiences,
  badges: badges,
  readiness: readiness,
  pathways: [
    {
      actorId: "andre.carter",
      pathwayId: "college & career",
      name: "College & Career",
      icon: "college & career",
      progress: {
        journey: [
          {
            completedAt: new Date(),
          },
        ],
      },
      journey: [
        {
          name: "Introduction to Civic Discourse",
          weight: 250,
          tags: ["area:educator led workshop"],
        },
        {
          name: "Community Engagement Skills",
          weight: 250,
          tags: ["area:independent lesson"],
        },
        {
          name: "Voter Registration",
          weight: 250,
          milestone: true,
          tags: ["area:independent lesson"],
        },
        {
          name: "City Council: Education Meeting",
          weight: 250,
          tags: ["area:independent lesson", "icon:apple"],
        },
        {
          name: "Guest Speaker: Mondaire Jones",
          weight: 250,
          tags: ["area:independent lesson", "icon:guest speaker"],
        },
      ],
      tags: ["area:college & career"],
      weight: 500,
      description: "Pathway for the College & Career learning area",
    },
    {
      actorId: "andre.carter",
      pathwayId: "arts & culture",
      name: "Arts & Culture",
      progress: {
        journey: [
          {
            completedAt: new Date(),
          },
          {
            completedAt: new Date(),
          },
        ],
      },
      journey: [
        {
          name: "Introduction to Civic Discourse",
          weight: 250,
          tags: ["area:educator led workshop"],
        },
        {
          name: "Community Engagement Skills",
          weight: 250,
          tags: ["area:independent lesson"],
        },
        {
          name: "Voter Registration",
          weight: 250,
          milestone: true,
          tags: ["area:independent lesson"],
        },
        {
          name: "City Council: Education Meeting",
          weight: 250,
          tags: ["area:independent lesson", "icon:apple"],
        },
        {
          name: "Guest Speaker: Mondaire Jones",
          weight: 250,
          tags: ["area:independent lesson", "icon:guest speaker"],
        },
      ],
      tags: ["area:arts & culture"],
      weight: 500,
      description: "Pathway for the Arts & Culture learning area",
    },
    {
      actorId: "andre.carter",
      pathwayId: "policy & government",
      name: "Policy & Government",
      journey: [
        {
          name: "Introduction to Civic Discourse",
          weight: 250,
          tags: ["area:educator led workshop"],
        },
        {
          name: "Community Engagement Skills",
          weight: 250,
          tags: ["area:independent lesson"],
        },
        {
          name: "Voter Registration",
          weight: 250,
          milestone: true,
          tags: ["area:independent lesson"],
        },
        {
          name: "City Council: Education Meeting",
          weight: 250,
          tags: ["area:independent lesson", "icon:apple"],
        },
        {
          name: "Guest Speaker: Mondaire Jones",
          weight: 250,
          tags: ["area:independent lesson", "icon:guest speaker"],
        },
      ],
      tags: ["area:policy & government"],
      weight: 500,
      description: "Pathway for the Policy & Government learning area",
    },
    {
      actorId: "andre.carter",
      pathwayId: "recreation",
      name: "Recreation",
      progress: {
        journey: [
          {
            completedAt: new Date(),
          },
          {
            completedAt: new Date(),
          },
          {
            completedAt: new Date(),
          },
        ],
      },
      journey: [
        {
          name: "Introduction to Civic Discourse",
          weight: 250,
          tags: ["area:educator led workshop"],
        },
        {
          name: "Community Engagement Skills",
          weight: 250,
          tags: ["area:independent lesson"],
        },
        {
          name: "Voter Registration",
          weight: 250,
          milestone: true,
          tags: ["area:independent lesson"],
        },
        {
          name: "City Council: Education Meeting",
          weight: 250,
          tags: ["area:independent lesson", "icon:apple"],
        },
        {
          name: "Guest Speaker: Mondaire Jones",
          weight: 250,
          tags: ["area:independent lesson", "icon:guest speaker"],
        },
      ],
      tags: ["area:recreation"],
      weight: 500,
      description: "Pathway for the Recreation learning area",
    },
    {
      actorId: "andre.carter",
      pathwayId: "volunteer",
      name: "Volunteer",
      progress: {
        journey: [
          {
            completedAt: new Date(),
          },
          {
            completedAt: new Date(),
          },
          {
            completedAt: new Date(),
          },
          {
            completedAt: new Date(),
          },
          {
            completedAt: new Date(),
          },
          {
            completedAt: new Date(),
          },
        ],
      },
      journey: [
        {
          name: "Introduction to Civic Discourse",
          weight: 250,
          tags: ["area:educator led workshop"],
        },
        {
          name: "Community Engagement Skills",
          weight: 250,
          tags: ["area:independent lesson"],
        },
        {
          name: "Voter Registration",
          weight: 250,
          milestone: true,
          tags: ["area:independent lesson"],
        },
        {
          name: "City Council: Education Meeting",
          weight: 250,
          tags: ["area:independent lesson", "icon:apple"],
        },
        {
          name: "Guest Speaker: Mondaire Jones",
          weight: 250,
          tags: ["area:independent lesson", "icon:guest speaker"],
        },
      ],
      tags: ["area:volunteer"],
      weight: 500,
      description: "Pathway for the Volunteer learning area",
    },
  ],
};
