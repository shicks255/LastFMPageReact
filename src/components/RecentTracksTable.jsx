import React from 'react';

export default class RecentTracksTable extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render()
    {
        let content = this.props.tracks.map((track,index) => {
            let url = track.image[1]['#text'].length > 0 ? track.image[1]['#text'] : 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
            let date = track.date ? track.date.uts : "";
            let unixDate = new Date(date*1000);
            if (date.length > 0){
                return(
                    <tr key={index}>
                        <td>
                            <a href={track.url} target={"_blank"}>
                                <img className={'image'} height={64} width={64} src={url}/>
                            </a>
                        </td>
                        <td>{unixDate.toLocaleString()}</td>
                        <td>{track.name}</td>
                        <td>{track.artist['#text']}</td>
                    </tr>
                );
            }
        });
        return(
            <table className={"table is-fullwidth"}>
                <thead>
                <tr>
                    <td></td>
                    <td>Date</td>
                    <td>Name</td>
                    <td>Artist</td>
                </tr>
                </thead>
                <tbody>
                {content}
                </tbody>
            </table>
        );
    }
}