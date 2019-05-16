import React from 'react';

export default React.memo(function ArtistTable(props) {

    function getFanArtImage(mbid, index, val, secondTry)
    {
        let imageUrl = '';
        let url = 'https://webservice.fanart.tv/v3/music/'+mbid+'&?api_key=e10d02f0a079517e365621fb714c944a&format=json';
        let picture = document.getElementById('artistImage_' + index);
        if (picture)
            picture.src = '';
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.artistthumb)
                    imageUrl = res.artistthumb[0].url;
                else if(res.artistbackground)
                    imageUrl = res.artistbackground[0].url;
                else if(res.hdmusiclogo)
                    imageUrl = res.hdmusiclogo[0].url;
                else if (res.musiclogo)
                    imageUrl = res.musiclogo[0].url;
                else if(res.albums)
                {
                    let albums = Object.keys(res.albums);
                    let firstAlbum = albums[0];
                    if (res.albums[firstAlbum])
                        imageUrl = res.albums[firstAlbum].albumcover[0].url;
                }
                else
                {
                    if (!secondTry)
                    {
                        getMusicBrainzId(val, index)
                        return;
                    }
                }

                picture = document.getElementById('artistImage_' + index);
                if (imageUrl.length > 0)
                    picture.src = imageUrl;
                else
                    picture.src = '';
            });
    }

    function getMusicBrainzId(val, index){
        let fullName = encodeURI(val.name);
        fetch('http://musicbrainz.org/ws/2/artist/?query=' + fullName + '&fmt=json',
            {
                headers:{
                    'User-Agent': 'SteveFM/1.0 https:\\/\\/music.stevenmhicks.com shicks255@yahoo.com',
                },
            })
            .then(res => res.json())
            .then(res => {
                if (res.artists)
                {
                    let mbid = res.artists[0].id;
                    getFanArtImage(mbid, index, val, true);
                }
            });
    }

    function getActualArtistUrl(val, index) {
        if (val.mbid.length > 0)
            getFanArtImage(val.mbid, index, val);
        else
            getMusicBrainzId(val, index);
    }

    let content = props.artists.map((val, index) => {
        let artistName = val.name;
        let rank = val['@attr'].rank;
        return(
            <tr key={index}>
                <td className={"alignRight"}>{rank}</td>
                <td>
                    <div className={"imageCell"}>
                        <a target={'_blank'} href={val.url}>
                            <img alt={""} id={'artistImage_' + index} height={64} width={64} src={''} onMouseEnter={(event) => props.mouseOver(event, artistName)} onMouseLeave={props.mouseOut}/>
                        </a>
                    </div>
                </td>
                <td><a target={'_blank'} href={val.url}><b>{val.name}</b></a></td>
                <td>{val.playcount}</td>
            </tr>
        )
    });

    props.artists.forEach((val, index) => getActualArtistUrl(val, index));

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
});