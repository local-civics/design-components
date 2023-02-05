import * as React                                             from 'react';
import {Stack as MantineStack, ScrollArea, Title, Text, Card} from '@mantine/core';
import {Chart, AxisOptions}                                             from "react-charts";
import {
    PlaceholderBanner
}                                                             from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export interface Item {
    question: string
    answers: string[][]
    choices?: string[]
    chart?: boolean
}

/**
 * StackData
 */
export type StackData = {
    loading: boolean
    items: Item[]
}


/**
 * StackProps
 */
export type StackProps = StackData

/**
 * Stack
 * @constructor
 * @param props
 */
export function Stack(props: StackProps) {
    const primaryAxis = React.useMemo<
        AxisOptions<{primary: string, secondary: string}>
        >(
        () => ({
            position: "left",
            getValue: (datum) => datum.primary,
        }),
        []
    );

    const secondaryAxes = React.useMemo<
        AxisOptions<{primary: string, secondary: string}>[]
        >(
        () => [
            {
                position: "bottom",
                getValue: (datum) => datum.secondary,
            },
        ],
        []
    );


    if(props.items.length === 0){
        return <PlaceholderBanner
            title="No questions to display"
            description="There are no questions in this lesson."
            loading={props.loading}
            icon="lessons"
        />
    }

    const rows = props.items.map((row) => {
        if(row.chart){
            const labelMap: any = {}
            const choices = row.choices || []
            choices.forEach(c => {
                labelMap[c] = 0
            })

            row.answers.forEach(a => a.forEach(r => {
                if(r in labelMap){
                    labelMap[r] = labelMap[r] ? labelMap[r] + 1 : 1
                }
            }))

            return <Card key={row.question} withBorder p="xl" radius="md">
                <MantineStack spacing={4}>
                    <Title size="lg">{row.question}</Title>
                    <Text size="sm">{row.answers.length} answers</Text>

                    <div style={{ background: "white", height: "300px", width: "100%", position: 'relative' }}>
                        <Chart
                            options={{
                                data: [{
                                    label: '',
                                    data: choices.map(k => {
                                        return {
                                            primary: truncateWithEllipses(k, 50),
                                            secondary: labelMap[k]
                                        }
                                    }),
                                }],
                                primaryAxis,
                                secondaryAxes,
                            }}
                        />
                    </div>
                </MantineStack>
            </Card>
        }

        return <Card key={row.question} withBorder p="xl" radius="md">
            <MantineStack spacing={4}>
                <Title size="lg">{row.question}</Title>
                <Text size="sm">{row.answers.length} answers</Text>

                <ScrollArea.Autosize maxHeight={600}>
                    <MantineStack spacing={4}>
                        {
                            row.answers.map(a => {
                                const answerText = a.join("\n")
                                return <Card key={answerText} p={5} radius={0} bg="gray.0">
                                    <Text>{answerText}</Text>
                                </Card>
                            })
                        }
                    </MantineStack>
                </ScrollArea.Autosize>
            </MantineStack>
        </Card>
    });


    return <MantineStack py={4} spacing={10} sx={{ minWidth: 700 }}>
        {rows}
    </MantineStack>
}

const truncateWithEllipses = (text: string, max: number) => text.substr(0,max-1)+(text.length>max?'&hellip;':'')