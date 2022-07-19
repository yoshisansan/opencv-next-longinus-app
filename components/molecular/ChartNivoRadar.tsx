// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/radar
import { VFC, useContext } from 'react'
import { ResponsiveRadar } from '@nivo/radar'

const ChartNivoRadar: VFC<{radarData: any, chartNivoKeys: string[]}> = ({radarData, chartNivoKeys}) => {
    console.log(radarData, chartNivoKeys);
    // Until update state,latest addFoodData has NaN because multiple states updated.
    return (
        <ResponsiveRadar
            data={radarData}
            keys={chartNivoKeys}
            indexBy="amino name"
            maxValue="auto"
            margin={{ top: 70, right: 30, bottom: 40, left: 30 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: 'color' }}
            gridLevels={5}
            gridShape="circular"
            gridLabelOffset={36}
            enableDots={true}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            dotBorderColor={{ from: 'color' }}
            enableDotLabel={true}
            dotLabel="value"
            dotLabelYOffset={-12}
            colors={{ scheme: 'nivo' }}
            fillOpacity={0.25}
            blendMode="multiply"
            animate={true}
            // motionConfig="wobbly"
            isInteractive={true}
            legends={[
                {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
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
    )
}

export default ChartNivoRadar