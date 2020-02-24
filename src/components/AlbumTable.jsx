import React from 'react';
import {inject,observer} from 'mobx-react';

export const AlbumTable = inject('uiStore','logicStore')(observer((props) =>  {
    const {uiStore,logicStore} = props;

    let bigContent = logicStore.albums.map((val, index) => {
        let url = val.image[1]['#text'].length > 0 ? val.image[1]['#text'] : 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
        let albumName = val.name;
        let rank = val['@attr'].rank;
        return(
            <tr key={index}>
                <td className={"alignRight"}>{rank}.</td>
                <td>
                    <div className={"imageCell"}>
                        <a href={val.url} target={'_blank'}>
                            <img alt={""} height={64} width={64} src={url} onMouseEnter={(event) => uiStore.doModal(event.target.src, albumName)} onMouseLeave={() => uiStore.closeModal()}/>
                        </a>
                    </div>
                </td>
                <td><a href={val.url} target={'_blank'}><b>{val.artist.name}</b></a></td>
                <td><i>{val.name}</i></td>
                <td className={"alignRight"}>{val.playcount}</td>
            </tr>
        )
    });

    let mobileContent = logicStore.albums.map((val, index) => {
        let url = val.image[1]['#text'].length > 0 ? val.image[1]['#text'] : 'https://lastfm-img2.akamaized.net/i/u/avatar170s/2a96cbd8b46e442fc41c2b86b821562f';
        let rank = val['@attr'].rank;
        return(
            <tr key={index}>
                <td className={"alignRight"}>{rank}.</td>
                <td>
                    <div className={"imageCell"}>
                        <a href={val.url} target={'_blank'}>
                            <img alt={''} height={64} width={64} src={url} />
                        </a>
                    </div>
                </td>
                <td>
                    <a href={val.url} target={'_blank'}><b>{val.artist.name}</b></a>
                    <br/>
                    <i>{val.name}</i>
                </td>
                <td className={"alignRight"}>{val.playcount}</td>
            </tr>
        )
    });

    return(
        <div>
            <table className={'table is-striped is-hoverable is-fullwidth is-hidden-mobile'}>
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Artist</th>
                    <th>Name</th>
                    <th>Plays</th>
                </tr>
                </thead>

                <tbody>
                {bigContent}
                </tbody>
            </table>

            <table className={'table is-striped is-hoverable is-fullwidth is-hidden-tablet'}>
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Plays</th>
                </tr>
                </thead>

                <tbody>
                {mobileContent}
                </tbody>
            </table>
        </div>

    )
}));