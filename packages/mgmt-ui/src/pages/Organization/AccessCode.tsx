import * as React                                                             from 'react';
import {
    createStyles,
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
}                                                 from '@mantine/core';
import {IconPointer} from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 22,
        fontWeight: 900,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    controls: {
        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column-reverse',
        },
    },

    control: {
        [theme.fn.smallerThan('xs')]: {
            width: '100%',
            textAlign: 'center',
        },
    },
}));

export type AccessCodeProps = {
    value: string
    peopleLink: string
    onCopyCode: () => void;
}

export function AccessCode(props: AccessCodeProps) {
    const { classes } = useStyles();

    return (
        <Container mx="0" px="0" size={460} my={30}>
            <Title className={classes.title}>
                Access code
            </Title>
            <Text color="dimmed" size="sm">
                Grant access to join your organization
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <TextInput value={props.value} readOnly/>
                <Group position="apart" mt="lg" className={classes.controls}>
                    <Anchor
                        href={props.peopleLink}
                        color="dimmed" size="sm" className={classes.control}>
                        <Center inline>
                            <IconPointer size={12} stroke={1.5} />
                            <Box ml={5}>See people in my organization</Box>
                        </Center>
                    </Anchor>
                    <Button onClick={props.onCopyCode} className={classes.control}>Copy code</Button>
                </Group>
            </Paper>
        </Container>
    );
}