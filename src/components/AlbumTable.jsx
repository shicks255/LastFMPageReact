import React from 'react';

export default class AlbumTable extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render(){
        let content = this.props.albums.map((val, index) => {
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        <a href={val.url} target={'_blank'}>
                            <img src={val.image[1]['#text']} />
                        </a>
                    </td>
                    <td><a href={val.url} target={'_blank'}>{val.artist.name}</a></td>
                    <td>{val.name}</td>
                    <td>{val.playcount}</td>
                </tr>
            )
        });

        return(
            <table>
                <thead>
                <tr>
                    <td>Rank</td>
                    <td></td>
                    <td>Artist</td>
                    <td>Name</td>
                    <td>Plays</td>
                </tr>
                </thead>

                <tbody>
                {content}
                </tbody>
            </table>
        )
    }
}