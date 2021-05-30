import React from 'react';
import {ResponsiveBar} from "@nivo/bar";
import {parties} from '../config';

const BarPerc = ({data, year}) => {

    const yearCache = {};

    if (!yearCache[year]) {
        const yearData = data.find(row => year === row.election);
        yearCache[year] = parties.map(party => ({
            party: party.key,
            share: (yearData.data[party.key] / yearData.data.total_votes * 100).toFixed(2),
        }));
    }

    const barData = yearCache[year];

    return <ResponsiveBar
        data={barData}
        keys={['share']}
        indexBy="party"
        margin={{top: 50, right: 130, bottom: 50, left: 60}}
        padding={0.3}
        valueScale={{type: 'linear'}}
        indexScale={{type: 'band', round: true}}
        colors={({indexValue}) => parties.find(({key}) => key === indexValue).color}
        colorBy="index"
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'party',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'share',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
}

export default BarPerc;