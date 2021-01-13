import React, {useState, useEffect} from 'react';
import {ResponsiveLine} from "@nivo/line";

export default function LineGraph(props) {

    function trimName(name) {
        if (name.length > 20)
            return name.slice(0,20) + '...';

        return name;
    }

    if (!props.recentTracks) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    const topArtistsFromTracks = props.recentTracks.reduce((accum, curr) => {
        if (accum.hasOwnProperty(curr.artist['#text']))
            accum[curr.artist['#text']] += 1;
        else
            accum[curr.artist['#text']] = 1;

        return accum;
    }, {})

    const d = Object.entries(topArtistsFromTracks).sort((x,y) => {
        return x[1] > y[1] ? 1 : -1;
    })
        .reverse()
        .map(x => x[0])
        .slice(0, 10);

    //return 'artistName': [playDates]
    const tracksByArtist = props.recentTracks.filter(x => {
        return d.includes(x.artist['#text'])
    }).reduce((accum, curr) => {
        if (curr.date){

            if (accum.hasOwnProperty(curr.artist['#text'])) {
                accum[curr.artist['#text']].push(curr.date['uts']);
            } else {
                const tracks = [];
                tracks.push(curr.date['uts']);
                accum[curr.artist['#text']] = tracks;
            }
        }
        return accum;
    }, {})

    const ld = [];
    let maxTick = 0;

    Object.keys(tracksByArtist).forEach((artistName) => {
        const artistAndPlayCounts = tracksByArtist[artistName];
        tracksByArtist[artistName] = artistAndPlayCounts.map(i => {
            return new Date(i*1000).toLocaleDateString("en-US");
        });

        const artistPlayCount = tracksByArtist[artistName].reduce((accum, date) => {
            if (accum && accum.hasOwnProperty(date)) {
                accum[date] = accum[date] + 1;
            } else {
                accum[date] = 1
            }

            return accum;
        }, {})

        tracksByArtist[artistName] = artistPlayCount;

        const trackData = Object.entries(artistPlayCount).map((k,v) => {
            if (k[1] > maxTick)
                maxTick = k[1];

            return {
                "x": k[0],
                "y": k[1]
            }
        })

        const data = {
            "id": artistName,
            "color": "hsl(333, 70%, 40%)",
            "data": trackData
        }

        ld.push(data);
    })

    const tickValues = [...Array(maxTick).keys()].map(x => ++x);

    return (
        <div className='column is-full has-text-centered'>
            <div style={{height: "350px", fontWeight: "bold", backgroundColor: "white"}}>
                Play Count by Day
                <ResponsiveLine
                    data={ld}
                    margin={{top: 50, right: 150, left: 100, bottom: 100}}
                    enableGridX={true}
                    enableGridY={true}
                    enableSlices='x'
                    sliceTooltip={(e) => {
                        const rows = e.slice.points
                            .sort((x,y) => {
                                if (x.data.y > y.data.y)
                                    return -1;
                                return 1;
                            })
                            .map(p => {
                                return (
                                    <tr key={p.id} style={{color: p.serieColor}}>
                                        <td>{trimName(p.serieId)}</td>
                                        <td>{p.data.y}</td>
                                    </tr>
                                )
                            })

                        return (
                            <table>
                                <tbody>
                                {rows}
                                </tbody>
                            </table>
                        )
                    }}
                    isInteractive={true}
                    colors={{
                        scheme: 'category10'
                    }}
                    pointSize={10}
                    xScale={{
                        type: 'time',
                        format: '%m/%d/%Y',
                        useUTC: false,
                        precision: 'day',
                        stacked: true
                    }}
                    xFormat="time:%m/%d/%Y"
                    yScale={{
                        type: 'linear',
                        min: 1
                    }}
                    axisLeft={{
                        legend: 'Listens',
                        legendOffset: -35,
                        legendPosition: 'middle',
                        tickValues: tickValues,
                    }}
                    axisBottom={{
                        format: '%b %d',
                        tickValues: 'every 1 day',
                        tickRotation: -75,
                    }}
                    legends={[
                        {
                            anchor: 'right',
                            direction: 'column',
                            justify: false,
                            translateX: 125,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemSpacing: 4,
                            itemTextColor: '#999',
                        }
                    ]}
                />
            </div>
        </div>
    )
}