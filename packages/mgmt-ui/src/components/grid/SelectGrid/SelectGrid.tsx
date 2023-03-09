import {TablerIcon}                                                        from "@tabler/icons";
import * as React                                                            from "react";
import {UnstyledButton, Checkbox, Text, SimpleGrid, createStyles, ThemeIcon} from '@mantine/core';
import { useUncontrolled }                                                   from '@mantine/hooks';

const useStyles = createStyles((theme, { checked }: { checked: boolean }) => ({
    button: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        transition: 'background-color 150ms ease, border-color 150ms ease',
        border: `1px solid ${
            checked
                ? theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).border
                : theme.colorScheme === 'dark'
                    ? theme.colors.dark[8]
                    : theme.colors.gray[3]
        }`,
        borderRadius: theme.radius.sm,
        padding: theme.spacing.md,
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.sm,
        backgroundColor: checked
            ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.white,
    },

    body: {
        flex: 1,
        marginLeft: theme.spacing.md,
    },
}));

interface ImageCheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?(checked: boolean): void;
    title: string;
    description: string;
    icon: TablerIcon;
}

export function ImageCheckbox({
                                  checked,
                                  defaultChecked,
                                  onChange,
                                  title,
                                  description,
                                  className,
                                  icon: Icon,
                                  ...others
                              }: ImageCheckboxProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof ImageCheckboxProps>) {
    const [value, handleChange] = useUncontrolled({
        value: checked,
        defaultValue: defaultChecked,
        finalValue: false,
        onChange,
    });

    const { classes, cx } = useStyles({ checked: value });

    return (
        <UnstyledButton
            {...others}
            onClick={() => handleChange(!value)}
            className={cx(classes.button, className)}
        >
            <ThemeIcon variant="light" size="lg" color="blue">
                <Icon size={25}/>
            </ThemeIcon>

            <div className={classes.body}>
                <Text weight={500} size="sm" sx={{ lineHeight: 1 }}>
                    {title}
                </Text>
            </div>

            <Checkbox
                checked={value}
                onChange={() => {}}
                tabIndex={-1}
                styles={{ input: { cursor: 'pointer' } }}
            />
        </UnstyledButton>
    );
}

export type SelectGridProps = {
    items: {description: string, title: string, icon: TablerIcon}[]
    onChange: (title: string, checked: boolean) => void;
}

export function SelectGrid(props: SelectGridProps) {
    const items = props.items.map((item) => <ImageCheckbox
        {...item}
        key={item.title}
        onChange={(checked) => props.onChange(item.title, checked)}
    />);
    return (
        <SimpleGrid
            cols={2}
            breakpoints={[
                { maxWidth: 'md', cols: 2 },
                { maxWidth: 'sm', cols: 1 },
            ]}
        >
            {items}
        </SimpleGrid>
    );
}