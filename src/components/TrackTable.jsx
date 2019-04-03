import React from 'react';

export default class TrackTable extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render(){
        let content = this.props.tracks.map((val, index) => {
            let min = Math.floor(val.duration / 60)
            let sec = val.duration - (min*60)
            let secString = sec < 10 ? "0" + sec.toString() : sec.toString();
            let time = `${min}:${secString.substr(0,2)}`;

            let url = val.image[1]['#text'].length > 0 ? val.image[1]['#text'] : 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';

            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        <div className={"imageCell"}>
                            <a href={val.url} target={'_blank'}>
                                <img width={64} height={64} src={url} />
                            </a>
                        </div>
                    </td>
                    <td><a href={val.url} target={'_blank'}>{val.name}</a></td>
                    <td>{val.artist.name}</td>
                    <td>{val.playcount}</td>
                    <td>{time}</td>
                </tr>
            )
        });

        let content2 = this.props.tracks.map((val, index) => {
            let min = Math.floor(val.duration / 60)
            let sec = val.duration - (min*60)
            let secString = sec < 10 ? "0" + sec.toString() : sec.toString();
            let time = `${min}:${secString.substr(0,2)}`;

            let url = val.image[1]['#text'].length > 0 ? val.image[1]['#text'] : 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';

            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        <a href={val.url} target={'_blank'}>
                            <img width={64} height={64} src={url} />
                        </a>
                    </td>
                    <td>
                        <a href={val.url} target={'_blank'}>{val.name}</a>
                        <br/>
                        {val.artist.name}
                        <br/>
                        {time}
                    </td>
                    <td>{val.playcount}</td>
                </tr>
            )
        });

        return(
            <div>
                <table className={'table is-striped is-hoverable is-fullwidth is-hidden-mobile'}>
                    <thead>
                    <tr>
                        <td>Rank</td>
                        <td></td>
                        <td>Name</td>
                        <td>Artist</td>
                        <td>Plays</td>
                        <td>Length</td>
                    </tr>
                    </thead>

                    <tbody>
                    {content}
                    </tbody>
                </table>
                <table className={'table is-striped is-hoverable is-fullwidth is-hidden-tablet'}>
                    <thead>
                    <tr>
                        <td>Rank</td>
                        <td></td>
                        <td></td>
                        <td>Plays</td>
                    </tr>
                    </thead>

                    <tbody>
                    {content2}
                    </tbody>
                </table>
            </div>
        )
    }
}