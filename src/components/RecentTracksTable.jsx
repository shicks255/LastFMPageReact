import React from 'react';

export default class RecentTracksTable extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render()
    {
        let content = this.props.tracks.map((track,index) => {
            let url = track.image[2]['#text'].length > 0 ? track.image[2]['#text'] : 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
            return(
                <tr key={index}>
                    <td><img src={url}/></td>
                    <td>{track.date.uts}</td>
                    <td>{track.name}</td>
                    <td>{track.artist['#text']}</td>
                </tr>
            )
        });
        return(
            <table className={"table"}>
                <tr>
                    <td></td>
                    <td>Date</td>
                    <td>Name</td>
                    <td>Artist</td>
                </tr>
                {content}
            </table>
        );
    }
}