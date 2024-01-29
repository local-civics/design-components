# design-components

Monorepo for Local Civics React components

## Install

Components are written in React, and its stories are written in [Component Story Format](https://medium.com/storybookjs/component-story-format-66f4c32366df). It requires Storybook version 6 and up.

Add the specific design-components library to your project.

`npm install --save @local-civics/hub-ui`
`npm install --save @local-civics/mgmt-ui`

### **Usage**

Import components you want into your UI

`import { Button } from '@local-civics/hub-ui';`

and use them like so

```
const myBtn = () => <Button>Do something</Button>;
```

### **Development**

Recommended Node and Npm version 

`Node: V18.1.0 and later`
`Npm : V8.19.0 and later`

Clone the [design-components GitHub project](https://github.com/local-civics/design-components) then start Storybook.

`npm install && cd packages/hub && npm run start`

## **Publishing**

Before publishing, you should build the Storybook project.

`NODE_ENV=production npm run build-storybook`

or if you want to live updates,

`NODE_ENV=production npm run storybook`

Token for GitHub Actions provided by localcivics account

## Used by

- [Hub](https://hub.localcivics.io)
