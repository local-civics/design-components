# design-components

React component library for Local design components

## Install

Components are written in React, and its stories are written in [Component Story Format](https://medium.com/storybookjs/component-story-format-66f4c32366df). It requires Storybook version 6 and up.

Add design-components to your project.

`npm install --save @local-civics/design-components`

### **Usage**

Import components you want into your UI

`import { Button } from '@local-civics/design-components';`

and use them like so

```
const myBtn = () => <Button>Do something</Button>;
```

### **Development**

Clone the [design-components GitHub project](https://github.com/local-civics/design-components) then start Storybook.

`npm install && npm run storybook`

## **Publishing**

Before publishing you should build the Storybook project.

`NODE_ENV=production npm run build-storybook`

or if want to live updates,

`NODE_ENV=production npm run storybook`

## Used by

- [Hub](https://hub.localcivics.io)
