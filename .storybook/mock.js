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
      server.db.loadData({
        identities: [
          {
            username: "andre.carter",
            identityId: "me",
            givenName: "Andre",
            familyName: "Carter",
            statement:
              "I would like to encourage my community to become more educated on issues that directly affect us, as well as make sure andre.carter community is a place where everyone is welcome.",
            network: ["hcz"],
            grade: "7",
            createdAt: "January 1, 2020",
          },
        ],
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
            tags: ["area:policy & government"],
            status: "reflection.pending",
            points: 250,
          },
          {
            eventId: "andre.carter.watched.event.0",
            calendarId: "andre.carter",
            name: "Exploring Careers in Technology",
            image: "https://cdn.localcivics.io/area/college-and-career.jpg",
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
            tags: ["area:recreation"],
            status: "watched",
            notBefore: new Date(),
            points: 250,
          },
        ],
        badges: [
          {
            badgeId: "onboarding.badge",
            actorId: "andre.carter",
            name: "Onboarding Badge",
            imageURL: "https://cdn.localcivics.io/badges/onboarding.png",
            complete: true,
          },
          {
            badgeId: "participation.badge",
            actorId: "andre.carter",
            name: "Participation Badge",
            imageURL: "https://cdn.localcivics.io/badges/participation.png",
            complete: true,
          },
          {
            badgeId: "civic.lens.badge",
            actorId: "andre.carter",
            name: "Civic Lens Badge",
            imageURL: "https://cdn.localcivics.io/badges/civic-lens.png",
            complete: true,
          },
          {
            badgeId: "college.explorer.badge",
            actorId: "andre.carter",
            name: "College Explorer Badge",
            imageURL: "https://cdn.localcivics.io/badges/college-explorer.png",
            complete: true,
          },
          {
            badgeId: "us.history.badge",
            actorId: "andre.carter",
            name: "U.S History Badge",
            imageURL: "https://cdn.localcivics.io/badges/us-history.png",
            complete: true,
          },
          {
            badgeId: "tech.guru.badge",
            actorId: "andre.carter",
            name: "Tech Guru Badge",
            incomplete: true,
          },
          {
            badgeId: "elected.official.badge",
            actorId: "andre.carter",
            name: "Elected Official Badge",
            inactive: true,
          },
        ],
        pathways: [
          {
            actorId: "andre.carter",
            pathwayId: "college & career",
            name: "College & Career",
            icon: "college & career",
            progress: {
              journey: [{
                completedAt: new Date(),
              }]
            },
            journey: [{
              name: "Introduction to Civic Discourse",
              weight: 250,
              tags: ["area:educator led workshop"]
            },{
              name: "Community Engagement Skills",
              weight: 250,
              tags: ["area:independent lesson"]
            },{
              name: "Voter Registration",
              weight: 250,
              milestone: true,
              tags: ["area:independent lesson"]
            },{
              name: "City Council: Education Meeting",
              weight: 250,
              tags: ["area:independent lesson", "icon:apple"]
            },{
              name: "Guest Speaker: Mondaire Jones",
              weight: 250,
              tags: ["area:independent lesson", "icon:guest speaker"]
            }],
            tags: ["area:college & career"],
            weight: 500,
            description: "Pathway for the College & Career learning area"
          },
          {
            actorId: "andre.carter",
            pathwayId: "arts & culture",
            name: "Arts & Culture",
            progress: {
              journey: [{
                completedAt: new Date(),
              },{
                completedAt: new Date(),
              }]
            },
            journey: [{
              name: "Introduction to Civic Discourse",
              weight: 250,
              tags: ["area:educator led workshop"]
            },{
              name: "Community Engagement Skills",
              weight: 250,
              tags: ["area:independent lesson"]
            },{
              name: "Voter Registration",
              weight: 250,
              milestone: true,
              tags: ["area:independent lesson"]
            },{
              name: "City Council: Education Meeting",
              weight: 250,
              tags: ["area:independent lesson", "icon:apple"]
            },{
              name: "Guest Speaker: Mondaire Jones",
              weight: 250,
              tags: ["area:independent lesson", "icon:guest speaker"]
            }],
            tags: ["area:arts & culture"],
            weight: 500,
            description: "Pathway for the Arts & Culture learning area"
          },
          {
            actorId: "andre.carter",
            pathwayId: "policy & government",
            name: "Policy & Government",
            journey: [{
              name: "Introduction to Civic Discourse",
              weight: 250,
              tags: ["area:educator led workshop"]
            },{
              name: "Community Engagement Skills",
              weight: 250,
              tags: ["area:independent lesson"]
            },{
              name: "Voter Registration",
              weight: 250,
              milestone: true,
              tags: ["area:independent lesson"]
            },{
              name: "City Council: Education Meeting",
              weight: 250,
              tags: ["area:independent lesson", "icon:apple"]
            },{
              name: "Guest Speaker: Mondaire Jones",
              weight: 250,
              tags: ["area:independent lesson", "icon:guest speaker"]
            }],
            tags: ["area:policy & government"],
            weight: 500,
            description: "Pathway for the Policy & Government learning area"
          },
          {
            actorId: "andre.carter",
            pathwayId: "recreation",
            name: "Recreation",
            progress: {
              journey: [{
                completedAt: new Date(),
              },{
                completedAt: new Date(),
              },{
                completedAt: new Date(),
              }]
            },
            journey: [{
              name: "Introduction to Civic Discourse",
              weight: 250,
              tags: ["area:educator led workshop"]
            },{
              name: "Community Engagement Skills",
              weight: 250,
              tags: ["area:independent lesson"]
            },{
              name: "Voter Registration",
              weight: 250,
              milestone: true,
              tags: ["area:independent lesson"]
            },{
              name: "City Council: Education Meeting",
              weight: 250,
              tags: ["area:independent lesson", "icon:apple"]
            },{
              name: "Guest Speaker: Mondaire Jones",
              weight: 250,
              tags: ["area:independent lesson", "icon:guest speaker"]
            }],
            tags: ["area:recreation"],
            weight: 500,
            description: "Pathway for the Recreation learning area"
          },
          {
            actorId: "andre.carter",
            pathwayId: "volunteer",
            name: "Volunteer",
            progress: {
              journey: [{
                completedAt: new Date(),
              },{
                completedAt: new Date(),
              },{
                completedAt: new Date(),
              },{
                completedAt: new Date(),
              },{
                completedAt: new Date(),
              },{
                completedAt: new Date(),
              }]
            },
            journey: [{
              name: "Introduction to Civic Discourse",
              weight: 250,
              tags: ["area:educator led workshop"]
            },{
              name: "Community Engagement Skills",
              weight: 250,
              tags: ["area:independent lesson"]
            },{
              name: "Voter Registration",
              weight: 250,
              milestone: true,
              tags: ["area:independent lesson"]
            },{
              name: "City Council: Education Meeting",
              weight: 250,
              tags: ["area:independent lesson", "icon:apple"]
            },{
              name: "Guest Speaker: Mondaire Jones",
              weight: 250,
              tags: ["area:independent lesson", "icon:guest speaker"]
            }],
            tags: ["area:volunteer"],
            weight: 500,
            description: "Pathway for the Volunteer learning area"
          },
        ],
      });
    },
    routes() {
      this.get("/identity/v0/resolve", (schema) => {
        return schema.db.identities.where({ identityId: "me" })[0];
      });
      this.get("/identity/v0/users/:username", (schema, request) => {
        return schema.db.identities.where({ username: request.params.username })[0];
      });
      this.put("/identity/v0/users/:identityId", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.db.identities.update(
          { identityId: request.params.identityId },
          attrs
        );
      });
      this.get("/identity/v0/communities", (schema, request) => {
        return schema.db.communities.where(request.queryParams);
      });
      this.get("/calendar/v0/:calendarId/events", (schema, request) => {
        delete request.queryParams.limit
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
      this.get("/footprint/v0/:actorId/badges", (schema, request) => {
        delete request.queryParams.limit
        const query = {
          actorId: request.params.actorId,
          ...request.queryParams,
        };
        return schema.db.badges.where(query);
      });
      this.get("/footprint/v0/:actorId/pathways", (schema, request) => {
        delete request.queryParams.limit
        const query = {
          actorId: request.params.actorId,
          ...request.queryParams,
        };
        return schema.db.pathways.where(query);
      });
      this.get("/footprint/v0/:actorId/passport", (schema, request) => {
        return schema.db.passports.where({
          actorId: request.params.actorId,
        })[0];
      });
    },
  });
};
