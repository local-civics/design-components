import * as React from "react";
import { createStyles, Text, Title, TextInput, Button, Group, Container, SimpleGrid, Badge } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  form: {
    backgroundColor: theme.white,
    padding: theme.spacing.xl,
    border: `1px solid ${theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]}`,
    borderRadius: theme.radius.md,
    boxShadow: theme.shadows.md,
    minWidth: 300,
    height: "fit-content",
  },

  wrapper: {
    position: "relative",
    paddingTop: 180,
    paddingBottom: 130,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan("xs")]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },

  highlight: {
    position: "relative",
    backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
    borderRadius: theme.radius.sm,
    padding: "4px 12px",
  },

  input: {
    backgroundColor: theme.white,
    borderColor: theme.colors.gray[4],
    color: theme.black,

    "&::placeholder": {
      color: theme.colors.gray[5],
    },
  },

  inputLabel: {
    color: theme.black,
  },
}));

/**
 * StartAnonymousLessonProps
 */
export type StartAnonymousLessonProps = {
  title: string;
  description: string;
  educatorName: string;
  studentName?: string;
  onStart: (name: string) => void;
};

/**
 * StartAnonymousLesson
 * @param props
 * @constructor
 */
export const StartAnonymousLesson = (props: StartAnonymousLessonProps) => {
  const { classes } = useStyles();
  const [name, setName] = React.useState("");

  return (
    <div className={classes.wrapper}>
      <Container>
        <SimpleGrid maw={960} cols={2} spacing={15} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
          <div className={classes.content}>
            <Badge color="violet">Community</Badge>
            <Title className={classes.title}>{props.title}</Title>
            <Text color="dimmed" mt="md">
              {props.description}
            </Text>
            <Text color="dimmed" mt="md">
              You are now part of {`${props.educatorName}'s`} Class
            </Text>
          </div>
          <div className={classes.form}>
            <TextInput
              label="Name"
              placeholder="John Doe"
              defaultValue={props.studentName}
              readOnly={!!props.studentName}
              required
              onChange={(e) => setName(e.target.value)}
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />

            <Group position="right" mt="md">
              <Button
                disabled={!name && !props.studentName}
                onClick={() => props.onStart(name)}
                className={classes.control}
              >
                {!props.studentName ? "Start lesson" : "Continue lesson"}
              </Button>
            </Group>
          </div>
        </SimpleGrid>
      </Container>
    </div>
  );
};
