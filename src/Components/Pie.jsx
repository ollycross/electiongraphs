import {ResponsivePie} from "@nivo/pie";
import {parties} from '../config';

const yearCache = {};

const Pie = ({data, year}) => {
    if (!yearCache[year]) {
        yearCache[year] = []
        Object.entries(data.find(row => year === row.election).data).forEach(([key, value]) => {
            if (parties.map(({key}) => key).find(wantedKey => wantedKey === key)) {
                yearCache[year].push({
                    id: key,
                    value,
                })
            }
        });
    }
    const pieData = yearCache[year];

    return <ResponsivePie
        data={pieData}
        margin={{top: 40, right: 80, bottom: 80, left: 80}}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{from: 'color'}}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{from: 'color', modifiers: [['darker', 2]]}}
        colors={({id}) => parties.find(({key}) => key === id).color}

        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
}

export default Pie;