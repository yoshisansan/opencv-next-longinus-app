import { VFC } from 'react'
import { ResponsiveBar } from '@nivo/bar'
// import { AminoRatioT, AminoAcidsRatioType } from 'types/ItemNoTypes'


// const commonProps = {
//   margin: { top: 8, right: 8, bottom: 8, left: 8 },
//   data: data,
//   indexBy: "country",
//   keys: [ 'hot dog', 'burger' ],
//   layout: "horizontal",
//   padding: 0.3,
//   labelTextColor: "inherit:darker(1.4)",
//   labelSkipWidth: 16,
//   labelSkipHeight: 16
// };

const ChartNivoBar: VFC<{radarData: any, chartNivoKeys: string[]}> = ({radarData, chartNivoKeys}) => {

  return (
    <ResponsiveBar
    data={radarData}
    keys={chartNivoKeys}
    groupMode={"grouped"}
    indexBy="amino name"
    layout="horizontal"
    margin={{ top: 0, right: 16, bottom: 48, left: 48 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'nivo' }}
    maxValue={3}
    enableGridX={true}
    enableGridY={false}
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
    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
        tickSize: 8,
        tickValues: 4,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'amino ratio',
        legendPosition: 'middle',
        legendOffset: 32,
        // renderTick: ({
        //   opacity,
        //   textAnchor,
        //   textBaseline,
        //   textX,
        //   textY,
        //   value,
        //   x,
        //   y
        // }) => {
        //   return (
        //     <g
        //       transform={`translate(${x},${y})`}
        //       style={{ opacity }}
        //     >
        //       <text
        //         alignmentBaseline={textBaseline}
        //         style={{fontSize: "14px"}}
        //         textAnchor={textAnchor}
        //         transform={`translate(${textX},${textY})`}
        //       >
        //         {value}
        //       </text>
        //     </g>
        //   )
        // }
    }}
    // axisLeft={{
    //     tickSize: 5,
    //     tickPadding: 5,
    //     tickRotation: 0,
    //     legend: 'food',
    //     legendPosition: 'middle',
    //     legendOffset: -40
    // }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
    // legends={[
    //     {
    //         dataFrom: 'keys',
    //         anchor: 'bottom-righ5t',
    //         direction: 'column',
    //         justify: false,
    //         translateX: 120,
    //         translateY: 0,
    //         itemsSpacing: 2,
    //         itemWidth: 100,
    //         itemHeight: 20,
    //         itemDirection: 'left-to-right',
    //         itemOpacity: 0.85,
    //         symbolSize: 20,
    //         effects: [
    //             {
    //                 on: 'hover',
    //                 style: {
    //                     itemOpacity: 1
    //                 }
    //             }
    //         ]
    //     }
    // ]}
    />
)
}

export default ChartNivoBar