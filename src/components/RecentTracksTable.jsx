import React from 'react';

export default function RecentTracksTable(props) {

    let bigContent = props.tracks.map((track,index) => {
        let url = track.image[1]['#text'].length > 0 ? track.image[1]['#text'] : 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
        let date = track.date ? track.date.uts : "";
        let unixDate = new Date(date*1000);
        if (date.length > 0){
            return(
                <tr key={index}>
                    <td >
                        <a href={track.url} target={"_blank"}>
                            <div onMouseEnter={(event) => props.mouseOver(event)} onMouseLeave={props.mouseOut}>
                                <img alt={""} className={'image'} height={'64'} width={'64'} src={url}/>
                            </div>
                        </a>
                    </td>
                    <td>{unixDate.toLocaleString()}</td>
                    <td><i>{track.name}</i></td>
                    <td><b>{track.artist['#text']}</b></td>
                </tr>
            );
        }
        else
            return '';
    });

    let mobileContent = props.tracks.map((track,index) => {
        let url = track.image[1]['#text'].length > 0 ? track.image[1]['#text'] : 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
        let date = track.date ? track.date.uts : "";
        let unixDate = new Date(date*1000);
        if (date.length > 0){
            return(
                <tr key={index}>
                    <td>
                        <a href={track.url} target={"_blank"}>
                            <div>
                                <img alt={""} className={'image'} height={'64'} width={'64'} src={url}/>
                            </div>
                        </a>
                    </td>
                    <td>
                        {unixDate.toLocaleString()}
                        <br/>
                        <i>{track.name}</i>
                        <br/>
                        <b>{track.artist['#text']}</b>
                    </td>
                </tr>
            );
        }
        else
            return '';
    });

    return(
        <div>
            <table className={"table is-striped is-hoverable is-fullwidth is-hidden-tablet"}>
                <thead>
                </thead>
                <tbody>
                {mobileContent}
                </tbody>
            </table>

            <table className={"table is-striped is-hoverable is-fullwidth is-hidden-mobile"}>
                <thead className={"tableHead"}>
                <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Artist</th>
                </tr>
                </thead>
                <tbody>
                {bigContent}
                </tbody>
            </table>
        </div>
    );
}