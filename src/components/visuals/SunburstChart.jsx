import React from 'react';
import {ResponsiveSunburst} from "nivo";

export default function SunburstChart(props) {

    const { recentTracks } = props;

    if (!recentTracks) {
        return (<div>
            Loading...
        </div>);
    }

    const d = recentTracks.reduce((accum, item) => {
        const artistName = item.artist['#text'];
        const albumName = item.album['#text'];

        if (accum.hasOwnProperty(artistName)) {
            if (accum[artistName].hasOwnProperty(albumName)) {
                accum[artistName][albumName] = accum[artistName][albumName] + 1
            } else {
                accum[artistName][albumName] = 1;
            }
        } else {
            accum[artistName] = {
                [albumName]: 1
            }
        }
        return accum;
    }, {})

    const dp = Object.entries(d)
        .sort((x,y) => {
            const xCount = Object.values(x[1]).reduce((accum, cur) => {
                return accum + cur
            }, 0);
            const yCount = Object.values(y[1]).reduce((accum, cur) => {
                return accum + cur
            }, 0);

            return xCount > yCount ? -1 : 1;
        })
        .slice(0, 20)
        .map(k => {

        const albumData = Object.entries(k[1]).map(i => {
            return {
                "id": i[0],
                "value": i[1],
            }
        });

        return {
            "id": k[0],
            "children": albumData
        }
    })

    const data = {
        "id": "albums",
        "color": "#a32929",
        "children": dp,
    }

    const theme = {
        textColor: "#eee",
    }

    return (
        <div className='column is-full has-text-centered'>
            <div style={{height: "500px", width: "800px", fontWeight: "bold"}}>
                <span style={{color: '#eee'}}>
                    Recent Tracks Album Pie Chart
                </span>
                <ResponsiveSunburst
                    data={data}
                    // theme={theme}
                    margin={{top: 15, bottom: 20}}
                    borderWith={1}
                    borderColor='#4E4E50'
                    cornerRadius={3}
                    borderWidth={4}
                    motionConfig="gentle"
                    isInteractive={true}
                />
            </div>
        </div>
    );
}