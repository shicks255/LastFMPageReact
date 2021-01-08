import React from 'react';
import {ResponsiveCalendar} from "@nivo/calendar";

export default function CalendarChart(props) {


    const data = props.recentTracks.reduce((accum, curr) => {

        const date = new Date(curr.date['uts'] * 1000)
        const formatted = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;

        if (accum.hasOwnProperty(formatted)) {
            accum[formatted] = accum[formatted] + 1
        } else {
            accum[formatted] = 1
        }

        return accum;
    }, {})

    const d = Object.entries(data).map(i => {
        return {
            "day": i[0],
            "value": i[1],
        }
    })

    if (!d) {
        return <div>Loading...</div>;
    }

    return (
        <div className='column is-full has-text-centered'>
            <div style={{height: "350px", fontWeight: "bold", backgroundColor: "white"}}>
                <ResponsiveCalendar
                    data={d}
                    from={'2020-10-01'}
                    to={'2020-12-25'}
                    margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                />
            </div>
        </div>
    )

}