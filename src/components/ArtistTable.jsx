import React from 'react';

export default function ArtistTable(props) {

    let content = props.artists.map((val, index) => {

        let url = val.image[1]['#text'].length > 0 ? val.image[1]['#text'] : 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
        return(
            <tr key={index}>
                <td className={"alignRight"}>{index+1}.</td>
                <td>
                    <div className={"imageCell"}>
                        <a target={'_blank'} href={val.url}>
                            <img alt={""} height={64} width={64} src={url} />
                        </a>
                    </div>
                </td>
                <td><a target={'_blank'} href={val.url}><b>{val.name}</b></a></td>
                <td>{val.playcount}</td>
            </tr>
        )
    });

    return(
        <table className={'table is-fullwidth'}>
            <thead>
            <tr>
                <th></th>
                <th></th>
                <th>Name</th>
                <th>Plays</th>
            </tr>
            </thead>

            <tbody>
            {content}
            </tbody>
        </table>
    )
}