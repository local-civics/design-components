# js-platform
React component library for the Local Civics platform

## Install

Components are written in React, and its stories are written in [Component Story Format](https://medium.com/storybookjs/component-story-format-66f4c32366df). It requires Storybook version 6 and up.

Add RC to your project.

`npm install --save @local-civics/js-dashboard`

### **Usage**

Import components you want into your UI

`import { Button } from '@local-civics/js-dashboard';`

and use them like so

```
const myBtn = () => <Button>Do something</Button>;
```

### **Development**

Clone the [js-dashboard GitHub project](https://github.com/local-civics/js-dashboard) then start Storybook.

`npm install && npm run storybook`

## **Publishing**

Before publishing you should build the Storybook project.

`NODE_ENV=production npm run build-storybook`

or if want to live updates,

`NODE_ENV=production npm run storybook`

## Used by

- [Dashboard](https://dashboard.localcivics.io)


# todo: fix intro.mdx 