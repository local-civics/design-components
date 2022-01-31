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
      this.get("/identity/v0/resolve", (schema) => {
        return schema.db.residents.where({ identityId: "me" })[0];
      });
      this.get("/identity/v0/residents/:residentName", (schema, request) => {
        if (
          request.params.residentName === "my" ||
          request.params.residentName === "me"
        ) {
          request.params.residentName = "andre.carter";
        }
        return schema.db.residents.where({
          residentName: request.params.residentName,
        })[0];
      });
      this.put("/identity/v0/residents/:residentName", (schema, request) => {
        if (
          request.params.residentName === "my" ||
          request.params.residentName === "me"
        ) {
          request.params.residentName = "andre.carter";
        }
        const attrs = JSON.parse(request.requestBody);
        return schema.db.residents.update(
          { residentName: request.params.residentName },
          attrs
        );
      });
      this.get("/identity/v0/communities", (schema, request) => {
        return schema.db.communities.where(request.queryParams);
      });
      this.get("/identity/v0/communities/:communityId", (schema, request) => {
        const query = {
          communityId: request.params.communityId,
          ...request.queryParams,
        };
        return schema.db.communities.where(query)[0];
      });
      this.get(
        "/curriculum/v0/courses/:courseName/events/:eventName",
        (schema, request) => {
          if (
            request.params.courseName === "my" ||
            request.params.courseName === "me"
          ) {
            request.params.courseName = "hcz";
          }
          const query = {
            courseName: request.params.courseName,
            eventName: request.params.eventName,
          };
          return schema.db.events.where(query)[0];
        }
      );

      this.get(
        "/curriculum/v0/courses/:courseName/events",
        (schema, request) => {
          let events = schema.db.events.where({});
          const query = request.queryParams;
          events = events.filter((event) => {
            let match = true;
            if (query.title) {
              match =
                match &&
                event.title.toLowerCase().startsWith(query.title.toLowerCase());
            }

            if (query.tags) {
              match =
                match &&
                query.tags.filter((tag) => event.tags.includes(tag)).length > 0;
            }

            if (query.pathways) {
              match = match && query.pathways.includes(event.pathway);
            }

            if (query.status) {
              const status =
                query.status === "survey" ? "contributed" : query.status;
              match = match && event.status === status;
            }

            if (query.timePeriod === "milestone") {
              match = match && !event.notBefore;
            }

            if (query.day) {
              match =
                match &&
                event.notBefore &&
                new Date(event.notBefore).toISOString().substring(0, 10) ===
                  query.day;
            }

            if (query.order) {
              match = match && event.order === query.order;
            }

            return match;
          });

          const limit = query.limit || 10;
          const page = query.page || 0;
          return events.slice(page * limit, page * limit + limit);
        }
      );

      this.post("/calendar/v0/:calendarId", () => {
        return null;
      });
      this.delete("/calendar/v0/:calendarId/events/:eventId", () => {
        return null;
      });
      this.get("/calendar/v0/:calendarId/reflections", () => {
        return [];
      });
      this.post("/calendar/v0/:calendarId/reflections", () => {
        return null;
      });
      this.put("/calendar/v0/:calendarId/events/:eventId/reflection", () => {
        return null;
      });
      this.get("/caliber/v0/bearers/:bearerName/badges", (schema, request) => {
        delete request.queryParams.limit;
        if (
          request.params.bearerName === "my" ||
          request.params.bearerName === "me"
        ) {
          request.params.bearerName = "andre.carter";
        }
        const query = {
          bearerName: request.params.bearerName,
          ...request.queryParams,
        };
        return schema.db.badges.where(query);
      });
      this.get(
        "/caliber/v0/bearers/:bearerName/badges/:badgeName",
        (schema, request) => {
          delete request.queryParams.limit;
          if (
            request.params.bearerName === "my" ||
            request.params.bearerName === "me"
          ) {
            request.params.bearerName = "andre.carter";
          }

          const query = {
            bearerName: request.params.bearerName,
            badgeName: request.params.badgeName,
            ...request.queryParams,
          };
          return schema.db.badges.where(query)[0];
        }
      );
      this.get(
        "/caliber/v0/bearers/:bearerName/readiness",
        (schema, request) => {
          delete request.queryParams.limit;
          const query = {
            pathways: request.queryParams.pathways || ["sum"],
          };
          return schema.db.readiness.where(query)[0];
        }
      );
      this.get("/footprint/v0/:actorId/passport", (schema, request) => {
        return schema.db.passports.where({
          actorId: request.params.actorId,
        })[0];
      });
    },
  });
};

const randomName = () => {
  return (Math.random() + 1).toString(36).substring(7);
};

const readiness = [
  {
    pathways: ["college & career"],
    proficiency: 250,
    nextProficiency: 500,
  },
  {
    pathways: ["policy & government"],
    proficiency: 300,
    nextProficiency: 500,
  },
  {
    pathways: ["arts & culture"],
    proficiency: 500,
    nextProficiency: 500,
  },
  {
    pathways: ["volunteer"],
    proficiency: 100,
    nextProficiency: 500,
  },
  {
    pathways: ["recreation"],
    proficiency: 400,
    nextProficiency: 500,
  },
  {
    pathways: ["sum"],
    proficiency: 3475,
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
    bearerName: "andre.carter",
    title: "Onboarding Badge",
    summary: "Get on the platform and check things out.",
    imageURL: "https://cdn.localcivics.io/badges/onboarding.png",
    criteria: [
      {
        criterionName: "onboarding.badge.about",
        title: "Tell us about yourself",
        completedAt: new Date(),
      },
      {
        criterionName: "onboarding.badge.impact",
        title: "Complete the initial impact quiz",
        completedAt: new Date(),
      },
      {
        criterionName: "onboarding.badge.avatar",
        title: "Set your avatar",
        actionURL: "/residents/me/settings",
      },
    ],
    status: "bearing",
  },
  {
    badgeName: "participation.badge",
    bearerName: "andre.carter",
    title: "Participation Badge",
    summary: "Get out of your shy shell",
    imageURL: "https://cdn.localcivics.io/badges/participation.png",
    criteria: [
      {
        criterionName: "objective.1",
        title: "Complete one civic milestone",
        completedAt: new Date(),
      },
      {
        criterionName: "objective.2",
        title: "Complete the political pathway",
      },
      {
        criterionName: "objective.3",
        title: "Attend two guest speaker events",
      },
    ],
    status: "bearing",
  },
  {
    badgeName: "civic.lens.badge",
    bearerName: "andre.carter",
    title: "Civic Lens Badge",
    summary: "See through the lens of civics.",
    imageURL: "https://cdn.localcivics.io/badges/civic-lens.png",
    criteria: [
      {
        criterionName: "objective.1",
        title: "Complete one civic milestone",
        completedAt: new Date(),
      },
      {
        criterionName: "objective.2",
        title: "Complete the political pathway",
      },
      {
        criterionName: "objective.3",
        title: "Attend two guest speaker events",
      },
    ],
    status: "bearing",
  },
  {
    badgeName: "college.explorer.badge",
    bearerName: "andre.carter",
    title: "College Explorer Badge",
    summary: "Learn about the different colleges and their unique offerings.",
    imageURL: "https://cdn.localcivics.io/badges/college-explorer.png",
    criteria: [
      {
        criterionName: "objective.1",
        title: "Complete one civic milestone",
        completedAt: new Date(),
      },
      {
        criterionName: "objective.2",
        title: "Complete the political pathway",
      },
      {
        criterionName: "objective.3",
        title: "Attend two guest speaker events",
      },
    ],
    status: "bearing",
  },
  {
    badgeName: "us.history.badge",
    bearerName: "andre.carter",
    title: "U.S History Badge",
    summary: "Learn about the history of the United States.",
    imageURL: "https://cdn.localcivics.io/badges/us-history.png",
    criteria: [
      {
        criterionName: "objective.1",
        title: "Complete one civic milestone",
        completedAt: new Date(),
      },
      {
        criterionName: "objective.2",
        title: "Complete the political pathway",
      },
      {
        criterionName: "objective.3",
        title: "Attend two guest speaker events",
      },
    ],
    status: "bearing",
  },
  {
    badgeName: "tech.guru.badge",
    bearerName: "andre.carter",
    summary: "Become a master of technology.",
    title: "Tech Guru Badge",
    criteria: [
      {
        criterionName: "objective.1",
        title: "Complete one civic milestone",
      },
      {
        criterionName: "objective.2",
        title: "Complete the political pathway",
      },
      {
        criterionName: "objective.3",
        title: "Attend two guest speaker events",
      },
    ],
    status: "contingent",
  },
  {
    badgeName: "elected.official.badge",
    bearerName: "andre.carter",
    summary: "Meet your elected official in your community.",
    title: "Elected Official Badge",
    criteria: [
      {
        criterionName: "objective.1",
        title: "Complete one civic milestone",
      },
      {
        criterionName: "objective.2",
        title: "Complete the political pathway",
      },
      {
        criterionName: "objective.3",
        title: "Attend two guest speaker events",
      },
    ],
    status: "unqualified",
  },
];

const residents = [
  {
    residentName: "andre.carter",
    communityName: "hcz",
    identityId: "me",
    givenName: "Andre",
    familyName: "Carter",
    impactStatement:
      "I would like to encourage my community to become more educated on issues that directly affect us, as well as make sure andre.carter community is a place where everyone is welcome.",
    network: ["hcz"],
    grade: "7",
    createdAt: "January 1, 2020",
  },
];

const events = [
  {
    courseName: "hcz",
    eventName: randomName(),
    residentName: "andre.carter",
    eventId: "hcz.event.0.top",
    title: "Voter Registration 101",
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    url: "https://www.localcivics.io",
    notBefore: new Date(),
    imageURL: "https://cdn.localcivics.io/area/policy-and-government.jpg",
    pathway: "policy & government",
    tags: [
      "area:policy & government",
      "skill:leadership",
      "skill:speaking",
      "skill:group",
    ],
    status: "opportunity",
    proficiency: 250,
    order: "top",
  },
  {
    courseName: "hcz",
    eventId: "hcz.event.1.top",
    eventName: randomName(),
    residentName: "andre.carter",
    title: "Guess the Odd One Out",
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    notBefore: new Date(),
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/arts-and-culture.jpg",
    pathway: "arts & culture",
    tags: ["area:arts & culture"],
    status: "going",
    proficiency: 250,
    order: "top",
  },
  {
    courseName: "hcz",
    eventId: "hcz.event.2.top",
    eventName: randomName(),
    residentName: "andre.carter",
    title: "Explore NYC Public Data - Your School",
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    notBefore: new Date(),
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/volunteer.jpg",
    pathway: "volunteer",
    tags: ["area:volunteer"],
    status: "opportunity",
    proficiency: 250,
    order: "top",
  },

  {
    courseName: "hcz",
    eventId: "hcz.event.3.top",
    eventName: randomName(),
    residentName: "andre.carter",
    title: "YA Anime Club",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/recreation.jpg",
    pathway: "recreation",
    tags: ["area:recreation"],
    status: "going",
    notBefore: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay() + 1
    ),
    proficiency: 250,
    order: "top",
  },
  {
    courseName: "hcz",
    eventName: randomName(),
    residentName: "andre.carter",
    eventId: "hcz.event.0.top",
    title: "Voter Registration 101 (Breakout I)",
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    url: "https://www.localcivics.io",
    notBefore: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay() + 1
    ),
    imageURL: "https://cdn.localcivics.io/area/sponsored.jpg",
    pathway: "policy & government",
    tags: [
      "area:policy & government",
      "skill:leadership",
      "skill:speaking",
      "skill:group",
    ],
    status: "opportunity",
    proficiency: 250,
    order: "sponsored",
  },
  {
    courseName: "hcz",
    eventId: "hcz.event.1.top",
    eventName: randomName(),
    residentName: "andre.carter",
    title: "Guess the Odd One Out (Breakout I)",
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    notBefore: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay() + 2
    ),
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/sponsored.jpg",
    pathway: "arts & culture",
    tags: ["area:arts & culture"],
    status: "going",
    proficiency: 250,
    order: "sponsored",
  },
  {
    courseName: "hcz",
    eventId: "hcz.event.3.top",
    eventName: randomName(),
    residentName: "andre.carter",
    title: "YA Anime Club (Breakout I)",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/sponsored.jpg",
    pathway: "recreation",
    tags: ["area:recreation"],
    status: "going",
    notBefore: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay() + 2
    ),
    proficiency: 250,
    order: "sponsored",
  },
  {
    courseName: "hcz",
    eventName: randomName(),
    residentName: "andre.carter",
    eventId: "hcz.event.0.top",
    title: "Voter Registration 101 (Prep)",
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    url: "https://www.localcivics.io",
    notBefore: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay() + 3
    ),
    imageURL: "https://cdn.localcivics.io/area/policy-and-government.jpg",
    pathway: "policy & government",
    tags: [
      "area:policy & government",
      "skill:leadership",
      "skill:speaking",
      "skill:group",
    ],
    status: "opportunity",
    proficiency: 250,
    order: "soonest",
  },
  {
    courseName: "hcz",
    eventId: "hcz.event.1.top",
    eventName: randomName(),
    residentName: "andre.carter",
    title: "Guess the Odd One Out (Prep)",
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    notBefore: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay() + 3
    ),
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/arts-and-culture.jpg",
    pathway: "arts & culture",
    tags: ["area:arts & culture"],
    status: "going",
    proficiency: 250,
    order: "soonest",
  },
  {
    courseName: "hcz",
    eventId: "hcz.event.3.top",
    eventName: randomName(),
    residentName: "andre.carter",
    title: "YA Anime Club (Prep)",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/recreation.jpg",
    pathway: "recreation",
    tags: ["area:recreation"],
    status: "going",
    notBefore: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay() + 4
    ),
    proficiency: 250,
    order: "soonest",
  },
  {
    courseName: "hcz",
    eventName: randomName(),
    residentName: "andre.carter",
    eventId: "andre.carter.milestone.event.0",
    title: "Dive into the Constitution I",
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
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
    tags: [
      "area:policy & government",
      "skill:leadership",
      "skill:speaking",
      "skill:group",
    ],
    status: "contributed",
    proficiency: 250,
  },
  {
    courseName: "hcz",
    eventId: "andre.carter.milestone.event.1",
    eventName: randomName(),
    residentName: "andre.carter",
    title: "Annual Conference on Civics Education",
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    timePeriod: "milestone",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/policy-and-government.jpg",
    pathway: "policy & government",
    tags: ["area:sponsored"],
    status: "contributed",
    proficiency: 250,
  },
  {
    courseName: "hcz",
    eventId: "andre.carter.milestone.event.2",
    eventName: randomName(),
    residentName: "andre.carter",
    title: "Explore NYC Public Data - Your School",
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    timePeriod: "milestone",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/volunteer.jpg",
    pathway: "volunteer",
    tags: ["area:volunteer"],
    status: "survey",
    proficiency: 250,
  },
  {
    courseName: "hcz",
    eventId: "andre.carter.milestone.event.3",
    eventName: randomName(),
    residentName: "andre.carter",
    title:
      "Tech Event REWIND: Careers in Philanthropy & the Arts with Obi Asiama",
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    timePeriod: "milestone",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/college-and-career.jpg",
    pathway: "college & career",
    tags: ["area:college & career"],
    status: "survey",
    proficiency: 250,
  },
  {
    courseName: "hcz",
    eventId: "andre.carter.milestone.event.4",
    eventName: randomName(),
    residentName: "andre.carter",
    title: "Guess the Odd One Out II",
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    timePeriod: "milestone",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/arts-and-culture.jpg",
    pathway: "arts & culture",
    tags: ["area:arts & culture"],
    status: "survey",
    proficiency: 250,
  },
  {
    courseName: "hcz",
    eventId: "andre.carter.milestone.event.5",
    eventName: randomName(),
    residentName: "andre.carter",
    title: "Dive into the Constitution II",
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    timePeriod: "milestone",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/policy-and-government.jpg",
    pathway: "policy & government",
    tags: ["area:policy & government"],
    status: "survey",
    proficiency: 250,
  },
  {
    courseName: "hcz",
    eventId: "andre.carter.watched.event.0",
    eventName: randomName(),
    residentName: "andre.carter",
    title: "Exploring Careers in Technology",
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
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
    status: "going",
    notBefore: new Date(),
    proficiency: 250,
  },
  {
    courseName: "hcz",
    eventId: "andre.carter.watched.event.1",
    eventName: randomName(),
    residentName: "andre.carter",
    title: "Graphic Novel Open Book Discussion",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/arts-and-culture.jpg",
    pathway: "arts & culture",
    tags: ["area:arts & culture"],
    status: "going",
    notBefore: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay() + 4
    ),
    proficiency: 250,
  },
  {
    courseName: "hcz",
    eventId: "andre.carter.watched.event.2",
    eventName: randomName(),
    residentName: "andre.carter",
    title: "YA Anime Club",
    location: {
      address: "200 Willoughby Ave",
      city: "Brooklyn",
      state: "NY",
      postalCode: "11205",
    },
    summary:
      "An opportunity to engage on the platform and find new ways to impact your community.",
    url: "https://www.localcivics.io",
    imageURL: "https://cdn.localcivics.io/area/recreation.jpg",
    pathway: "recreation",
    tags: ["area:recreation"],
    status: "going",
    notBefore: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDay() + 5
    ),
    proficiency: 250,
  },
];

const data = {
  residents: residents,
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
      placeName: "Harlem, NY",
      trueName: "Harlem Children Zone",
    },
  ],
  events: events,
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
