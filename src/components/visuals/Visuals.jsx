import React, {useEffect, useState} from 'react';
import TreeMap from "./TreeMap";
import LineGraph from "./LineGraph";
import {logicStore} from "../../stores/LogicStore";
import { timeFrames } from "./../../utils"
import Sunburst from "./SunburstChart";
import BumpChart from "./BumpChart";
import {profileStore} from "../../stores/ProfileStore";

export default function Visuals(props) {

    let timeFrames2 = Object.keys(timeFrames).map((value, index) => {
        return <option key={index}>{timeFrames[value]}</option>
    });

    const lastFmKey =  process.env.REACT_APP_LAST_FM_KEY;
    const timeFrame = logicStore.timeFrame;

    const [recentTracks, setRecentTracks] = useState([]);
    useEffect(() => {
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks
        &user=${profileStore.userName}
        &limit=200
        &api_key=${lastFmKey}
        &format=json
        &page=1`;

        fetch(url)
            .then((data) => {
                const d = data.json()
                console.log(d);
                return d;
            })
            .then(d => {
                setRecentTracks(d.recenttracks.track.filter(x => {
                    return ((x['@attr']) && (x['@attr']['nowplaying'])) ? false : true
                }));
            });

    }, [])

    return (
        <>
            <div className={"columns is-mobile"}>
                <div className="box column is-half is-offset-one-quarter">
                    <table className={"menuTable"}>
                        <tbody>
                        <tr>
                            <td><label>Time Frame:</label></td>
                            <td>
                                <select defaultValue={logicStore.timeFrame}
                                        onChange={(event) => props.onChange(event.target.value, 'timeFrame')}>
                                    {timeFrames2}
                                </select>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='columns'>
                <TreeMap data={logicStore.artists} name='Artists' keyy='name' value='playcount' />
            </div>
            <div className='columns'>
                <TreeMap data={logicStore.albums} name='Albums' keyy='name' value='playcount' />
            </div>
            <div className='columns'>
                <LineGraph recentTracks={recentTracks} />
            </div>
            <div className='columns'>
                <Sunburst recentTracks={recentTracks} />
            </div>
            <div className='columns'>
                <BumpChart recentTracks={recentTracks} />
            </div>
            {/*<div className='columns'>*/}
            {/*    <CalendarChart recentTracks={recentTracks} />*/}
            {/*</div>*/}
        </>
    )

}