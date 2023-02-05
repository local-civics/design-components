import * as React                                                    from 'react';
import {
    UnstyledButton,
    UnstyledButtonProps,
    Group,
    Avatar,
    Text,
    createStyles,
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        cursor: "default",
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    },
}));

interface UserButtonProps extends UnstyledButtonProps {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
}

export function UserButton({ image, name, email, icon, ...others }: UserButtonProps) {
    const { classes } = useStyles();

    return <Group className={classes.user} {...others}>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
                {name}
            </Text>

            <Text color="dimmed" size="xs">
                {email}
            </Text>
        </div>

        {/*{icon || <IconChevronRight size={14} stroke={1.5} />}*/}
    </Group>;
}