import React from 'react';

export default class ArtistTable extends React.Component {

    constructor(props)
    {
        super(props);
    }

    render(){
        let content = this.props.artists.map((val, index) => {

            let url = val.image[1]['#text'].length > 0 ? val.image[1]['#text'] : 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
            return(
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>
                        <a target={'_blank'} href={val.url}>
                            <img height={64} width={64} src={url} />
                        </a>
                    </td>
                    <td><a target={'_blank'} href={val.url}>{val.name}</a></td>
                    <td>{val.playcount}</td>
                </tr>
            )
        });

        return(
            <table className={'table is-fullwidth'}>
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