import type { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation';
import { notFound } from 'next/navigation';

interface Song {
    name: string;
    artist: string;
    src: string;
    poster: string;
    lyric: string;
    details: string;
    game: string;
    netease: number;
}

type MetadataProps = {
    params: { songid: string }
}

export async function generateMetadata(
    { params }: MetadataProps,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
  
    const songid = parseInt(params.songid);
    const song = (await getSongList())[songid];
    if (!song) {
        return notFound();
    }
  
    return {
      // metadataBase: new URL('https://galgamer.moe'),
      title: song.name + ' - ' + song.artist,
      description: song.details.replace(/<\/?a([^>])*>?/gm, ''),
      // keywords: post.keywords,
  
      openGraph: {
        title: song.name + ' - ' + song.artist,
        description: song.details.replace(/<\/?a([^>])*>?/gm, ''),
        url: 'https://galgamer.moe/music/?id=' + songid,
        siteName: 'Galgame 金曲',
        images: [
          {
            url: song.poster,  // need fix
          }
        ],
        locale: 'zh_HK',
        type: 'music.song',
        audio: [
            {
                url: song.src,
                type: 'audio/mpeg',
            }
        ],
      },
  
      twitter: {
        card: 'summary',
        title: song.name + ' - ' + song.artist,
        description: song.details.replace(/<\/?a([^>])*>?/gm, ''),
        images: [song.poster],  // need fix
      },
    }
  }

async function getSongList(): Promise<Song[]> {
    const response = await fetch('https://galgamer.moe/music/music.json');
    return await response.json();
}


export async function generateStaticParams() {
    const response = await getSongList();

    return response.map((song, index) => {
        return { songid: index.toString() };
    });
};

export default function SongRedirectPage({ params }: { params: { songid: string } }) {
    const redirectUrl = 'https://galgamer.moe/music/?id=' + params.songid;
    redirect(redirectUrl);
    // return (
    //   <div>
    //     <h1>Redirecting...</h1>
    //     <a href={redirectUrl}>Click here if you are not redirected.</a>
    //   </div>
    // );
}