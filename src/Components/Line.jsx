import React from 'react';
import {parties} from '../config'
import {ResponsiveLine} from "@nivo/line";

const Line = ({data}) => {

    const mapData = (data) => {
        return ['con_votes', 'lab_votes', 'lib_votes', 'oth_votes', 'non_voters'].map(metric =>
            ({
                id: metric,
                data: data.map(row => {
                    return {
                        x: row.election,
                        y: ((row.data[metric] / (row.data.total_votes + row.data.non_voters)) * 100).toFixed(2)
                    }
                })
            })
        );
    }

    const lineData = mapData(data);


    return <ResponsiveLine
        data={lineData}
        enableSlices={'x'}
        margin={{top: 50, right: 110, bottom: 50, left: 60}}
        xScale={{type: 'point'}}
        yScale={{type: 'linear'}}
        colors={({id}) => parties.find(({key}) => key === id).color}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Year',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Vote share',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{theme: 'background'}}
        pointBorderWidth={2}
        pointBorderColor={{from: 'serieColor'}}
        pointLabelYOffset={-12}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ],
            }
        ]}
    />
}

export default Line;