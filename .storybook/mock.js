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
      this.get("/calendar/v0/:calendarId/events", (schema, request) => {
        delete request.queryParams.limit;
        const query = {
          calendarId: request.params.calendarId,
          ...request.queryParams,
        };
        return schema.db.events.where(query);
      });
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
            pathway: request.queryParams.pathway,
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

const readiness = [
  {
    pathway: "college & career",
    proficiency: 250,
    nextProficiency: 500,
  },
  {
    pathway: "policy & government",
    proficiency: 300,
    nextProficiency: 500,
  },
  {
    pathway: "arts & culture",
    proficiency: 500,
    nextProficiency: 500,
  },
  {
    pathway: "volunteer",
    proficiency: 100,
    nextProficiency: 500,
  },
  {
    pathway: "recreation",
    proficiency: 400,
    nextProficiency: 500,
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
    complete: true,
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
    complete: true,
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
    complete: true,
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
    complete: true,
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
    complete: true,
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
    incomplete: true,
  },
  {
    badgeName: "elected.official.badge",
    bearerName: "andre.carter",
    summary: "Meet your elected official in your community.",
    title: "Elected Official Badge",
    status: "unqualified",
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
    inactive: true,
  },
];

const residents = [
  {
    residentName: "andre.carter",
    communityName: "hcz",
    identityId: "me",
    givenName: "Andre",
    familyName: "Carter",
    statement:
      "I would like to encourage my community to become more educated on issues that directly affect us, as well as make sure andre.carter community is a place where everyone is welcome.",
    network: ["hcz"],
    grade: "7",
    createdAt: "January 1, 2020",
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
      name: "Harlem Children Zone",
      city: "Harlem",
      state: "NY",
    },
  ],
  events: [
    {
      eventId: "andre.carter.milestone.event.0",
      calendarId: "andre.carter",
      name: "Dive into the Constitution I",
      milestone: true,
      image: "https://cdn.localcivics.io/area/policy-and-government.jpg",
      pathway: "policy & government",
      tags: ["area:policy & government"],
      status: "reflection.submitted",
      points: 250,
    },
    {
      eventId: "andre.carter.milestone.event.1",
      calendarId: "andre.carter",
      name: "Annual Conference on Civics Education",
      milestone: true,
      image: "https://cdn.localcivics.io/area/sponsored.jpg",
      pathway: "policy & government",
      tags: ["area:sponsored"],
      status: "reflection.submitted",
      points: 250,
    },
    {
      eventId: "andre.carter.milestone.event.2",
      calendarId: "andre.carter",
      name: "Explore NYC Public Data - Your School",
      milestone: true,
      image: "https://cdn.localcivics.io/area/volunteer.jpg",
      pathway: "volunteer",
      tags: ["area:volunteer"],
      status: "reflection.pending",
      points: 250,
    },
    {
      eventId: "andre.carter.milestone.event.3",
      calendarId: "andre.carter",
      name: "Tech Event REWIND: Careers in Philanthropy & the Arts with Obi Asiama",
      milestone: true,
      image: "https://cdn.localcivics.io/area/college-and-career.jpg",
      pathway: "college & career",
      tags: ["area:college & career"],
      status: "reflection.pending",
      points: 250,
    },
    {
      eventId: "andre.carter.milestone.event.4",
      calendarId: "andre.carter",
      name: "Guess the Odd One Out",
      milestone: true,
      image: "https://cdn.localcivics.io/area/arts-and-culture.jpg",
      pathway: "arts & culture",
      tags: ["area:arts & culture"],
      status: "reflection.pending",
      points: 250,
    },
    {
      eventId: "andre.carter.milestone.event.5",
      calendarId: "andre.carter",
      name: "Dive into the Constitution II",
      milestone: true,
      image: "https://cdn.localcivics.io/area/policy-and-government.jpg",
      pathway: "policy & government",
      tags: ["area:policy & government"],
      status: "reflection.pending",
      points: 250,
    },
    {
      eventId: "andre.carter.watched.event.0",
      calendarId: "andre.carter",
      name: "Exploring Careers in Technology",
      image: "https://cdn.localcivics.io/area/college-and-career.jpg",
      pathway: "college & career",
      tags: ["area:college & career"],
      status: "watched",
      notBefore: new Date(),
      points: 250,
    },
    {
      eventId: "andre.carter.watched.event.1",
      calendarId: "andre.carter",
      name: "Graphic Novel Open Book Discussion",
      image: "https://cdn.localcivics.io/area/arts-and-culture.jpg",
      pathway: "arts & culture",
      tags: ["area:arts & culture"],
      status: "watched",
      notBefore: new Date(),
      points: 250,
    },
    {
      eventId: "andre.carter.watched.event.2",
      calendarId: "andre.carter",
      name: "YA Anime Club",
      image: "https://cdn.localcivics.io/area/recreation.jpg",
      pathway: "recreation",
      tags: ["area:recreation"],
      status: "watched",
      notBefore: new Date(),
      points: 250,
    },
  ],
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
