import React from 'react';

export default React.memo(function TrackTable(props) {


    function getFanArtImage(mbid, index, val, secondTry)
    {
        let imageUrl = '';
        let url = 'https://webservice.fanart.tv/v3/music/'+mbid+'&?api_key=e10d02f0a079517e365621fb714c944a&format=json';
        let picture = document.getElementById('trackImage_' + index);
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

                picture = document.getElementById('trackImage_' + index);
                if (imageUrl.length > 0)
                    picture.src = imageUrl;
                else
                    picture.src = '';
            });
    }

    function getMusicBrainzId(val, index){
        let fullName = encodeURI(val.name);
        fetch('https://musicbrainz.org/ws/2/artist/?query=' + fullName + '&fmt=json',
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

    let bigContent = props.tracks.map((val, index) => {
        let min = Math.floor(val.duration / 60)
        let sec = val.duration - (min*60)
        let secString = sec < 10 ? "0" + sec.toString() : sec.toString();
        let time = `${min}:${secString.substr(0,2)}`;

        let title = val.name;
        let rank = val['@attr'].rank;
        return(
            <tr key={index}>
                <td className={"alignRight"}>{rank}.</td>
                <td>
                    <div className={"imageCell"}>
                        <a href={val.url} target={'_blank'}>
                            <img alt={""} width={64} id={'trackImage_' + index} height={64} src={''} onMouseEnter={(event) => props.mouseOver(event, title)} onMouseLeave={props.mouseOut}/>
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

    let mobileContent = props.tracks.map((val, index) => {
        let min = Math.floor(val.duration / 60)
        let sec = val.duration - (min*60)
        let secString = sec < 10 ? "0" + sec.toString() : sec.toString();
        let time = `${min}:${secString.substr(0,2)}`;

        let title = val.name;
        let rank = val['@attr'].rank;
        return(
            <tr key={index}>
                <td className={"alignRight"}>{rank}.</td>
                <td>
                    <div className={"imageCell"}>
                        <a href={val.url} target={'_blank'}>
                            <img alt={""} id={'trackImage_' + index} width={64} height={64} src={''} onMouseEnter={(event) => props.mouseOver(event, title)} onMouseLeave={props.mouseOut}/>
                        </a>
                    </div>
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

    props.tracks.forEach((value, index) => getActualArtistUrl(value.artist, index));

    return(
        <div>
            <table className={'table is-striped is-hoverable is-fullwidth is-hidden-mobile'}>
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>Name</th>
                    <th>Artist</th>
                    <th>Plays</th>
                    <th>Length</th>
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
});