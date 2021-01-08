import React, {useEffect, useState} from 'react';
import {profileStore} from "../../stores/ProfileStore";
import {logicStore} from "../../stores/LogicStore";
import {ResponsiveSunburst} from "nivo";

export default function SunburstChart() {

    const lastFmKey =  process.env.REACT_APP_LAST_FM_KEY;

    const [topAlbums, setTopAlbums] = useState([]);
    useEffect(() => {
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.getTopAlbums
        &user=${profileStore.userName}
        &limit=200
        &api_key=${lastFmKey}
        &period=${logicStore.timeFrame}
        &format=json
        &page=1`;

        fetch(url)
            .then((data) => {
                const d = data.json()
                console.log(d);
                return d;
            })
            .then(d => {
                console.log(d.topalbums.album);
                setTopAlbums(d.topalbums.album);
            });

    }, []);

    if (!topAlbums) {
        return (<div>
            Loading...
        </div>);
    }

    const artistToAlbums = topAlbums.reduce((accum, album) => {
        const artistName = album.artist.name;

        if (accum.hasOwnProperty(artistName)) {
            accum[artistName].push({
                "album": album.name,
                "playcount": album.playcount
            })
        } else {
            accum[artistName] = [
                {
                    "album": album.name,
                    "playcount": album.playcount
                }
            ]
        }

        return accum
    }, {});

    const dataPoints =
        Object.entries(artistToAlbums).map((k) => {

            const albumData = k[1].map((album) => {
                return {
                    "id": album.album,
                    "value": album.playcount,
                    // "color": "hsl(74, 70%, 50%)",
                }
            })

            return {
                "id": k[0],
                // "color": "hsl(74, 70%, 50%)",
                "children": albumData,
            }
    });

    const data = {
        "id": "albums",
        "color": "#a32929",
        "children": dataPoints,
    }

    return (
        <div className='column is-full has-text-centered'>
            <div style={{height: "350px", fontWeight: "bold", backgroundColor: "white"}}>
                <ResponsiveSunburst
                    data={data}
                    cornerRadius={3}
                    borderWidth={4}
                    // colors={{ scheme: 'category10' }}
                    // childColor={{"from": "color"}}
                    motionConfig="gentle"
                    isInteractive={true}
                />
            </div>
        </div>
    );
}