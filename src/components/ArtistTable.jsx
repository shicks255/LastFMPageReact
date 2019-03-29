import React from 'react';

export default class ArtistTable extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render(){
        let content = this.props.artists.map((val, index) => {
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        <a target={'_blank'} href={val.url}>
                            <img src={val.image[1]['#text']} />
                        </a>
                    </td>
                    <td><a target={'_blank'} href={val.url}>{val.name}</a></td>
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