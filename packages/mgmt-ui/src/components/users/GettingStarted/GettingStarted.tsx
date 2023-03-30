import * as React                                           from 'react';
import {
    Modal,
    Text,
    createStyles,
    Center,
    Loader,
    Container, Title,
    Button,
    Group,
}                                                           from '@mantine/core';

const useStyles = createStyles((theme) => ({
    inner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl * 4,
    },

    content: {
        maxWidth: 600,
        marginRight: theme.spacing.xl,

        [theme.fn.smallerThan('md')]: {
            maxWidth: '100%',
            marginRight: 0,
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 44,
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan('xs')]: {
            fontSize: 28,
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            flex: 1,
        },
    },

    highlight: {
        position: 'relative',
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        borderRadius: theme.radius.sm,
        padding: '4px 12px',
    },
}));

/**
 * GettingStartedProps
 */
export type GettingStartedProps = {
    opened: boolean
    loading: boolean
    videoURL: string
    onClose: () => void;
}

/**
 * GettingStarted
 * @param props
 * @constructor
 */
export const GettingStarted = (props: GettingStartedProps) => {
    const { classes } = useStyles();

    return <Modal centered
                  fullScreen
                  opened={props.opened}
                  onClose={() => props.onClose && props.onClose()}
                  size="sm"
    >
        <div style={{ position: 'relative' }}>
            { props.loading && <Center style={{ height: 400 }}><Loader/></Center> }
            { !props.loading && <Container>
                <Group position="center">
                    <div className={classes.inner}>
                        <div className={classes.content}>
                            <Button radius="xl" size="md" className={classes.control}>
                                Skip tour
                            </Button>
                            <Title className={classes.title}>
                                An experience purpose built for educators like you!
                            </Title>
                            <Text color="dimmed" mt="md">
                                Hello! We&apos;re excited that you chose try out a few of the tools that Local Civics can bring to your classroom.
                                Watch this short video tour to get a sense of how to navigate around the platform.
                            </Text>
                            <video style={{marginTop: "20px", marginBottom: "20px"}} width="600" height="350" controls>
                                <source src={props.videoURL} type="video/mp4"/>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </Group>
            </Container>
            }
        </div>
    </Modal>
}