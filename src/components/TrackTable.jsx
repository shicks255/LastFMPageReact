import React from 'react';

export default class TrackTable extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render(){
        let content = this.props.tracks.map((val, index) => {
            let min = Math.floor(val.duration / 60)
            let sec = val.duration - min
            let time = min + ":" + Math.round(sec)
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td><img src={val.image[1]['#text']} /></td>
                    <td>{val.name}</td>
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