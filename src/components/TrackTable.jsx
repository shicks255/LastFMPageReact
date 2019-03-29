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
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        <a href={val.url} target={'_blank'}>
                            <img src={val.image[1]['#text']} />
                        </a>
                    </td>
                    <td><a href={val.url} target={'_blank'}>{val.name}</a></td>
                    <td>{val.artist.name}</td>
                    <td>{val.playcount}</td>
                    <td>{time}</td>
                </tr>
            )
        });

        return(
            <table>
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
        )
    }
}