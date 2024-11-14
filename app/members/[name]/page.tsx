import { staffs, members } from "_feed/members";
import { getMember } from "_feed/members";
import member from "@/interfaces/member";
import Container from "@/components-layout/container";
import style from "@/styles/members.module.css";
import BookmarkContainer from "@/components/bookmark-container";
import cn from "classnames";
import type PostType from "@/interfaces/post";
import { getAllPosts } from "@/lib/api";
import { Link } from "next-view-transitions";
import slugify from "@/lib/sluglify";

import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next'
import PostsByYears from "@/components/posts-by-year";


type Params = Promise<{ name: string }>;


export async function generateMetadata(
  props: { params: Params },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const params = await props.params;
  const name = decodeURIComponent(params.name);
  const thisMember = getMember(name);

  return {
    metadataBase: new URL('https://galgamer.moe'),
    title: `群友：${name}`,
    description: thisMember.bio,
    // keywords: post.keywords,

    openGraph: {
      title: `群友：${name}`,
      description: thisMember.bio,
      // url: 'https://nextjs.org',
      siteName: 'Galgamer',
      images: [
        {
          url: thisMember.photo,  // need fix
        }
      ],
      locale: 'zh_HK',
      type: 'website',
    },

    twitter: {
      card: 'summary',
      title: `群友：${name}`,
      description: thisMember.bio,
      images: [thisMember.photo],  // need fix
    },
  }
}

export function generateStaticParams() {
  const params = Object.keys({ ...staffs, ...members }).map((member) => {
    return { name: member, };
  });

  const temp = [];
  params.forEach((param) => {
    const encoded = encodeURIComponent(param.name);
    if (encoded !== param.name) {
      temp.push({ name: encoded });
    }
  });
  params.push(...temp);
  //console.log(params);
  return params;
}



export default async function MemberProfile(
  props: { params: Params }
) {
  const params = await props.params;
  const name = decodeURIComponent(params.name);
  // console.log(name);

  const member_info = getMember(name);
  const hasPersonalPage = member_info !== undefined && member_info.personalPage;
  const posts = getAllPosts().filter((post) => post.author === name);

  // if (member_info === undefined || !member_info.personalPage) {
  //     return <CharacterInfo name={name} member={member_info} />;
  // }

  // return <CharacterPages name={name} member={member_info} />;

  return (
    <>
      <CharacterInfo name={name} member={member_info} />
      {hasPersonalPage && <CharacterPages name={name} member={member_info} />}
      {/* The article from this member */}
      {posts.length > 0 && <PostFromThisMember posts={posts} />}
    </>
  );
}


function CharacterPages({ name, member }: { name: string, member: member }) {
  return (
    <Container className="px-2">
      <BookmarkContainer title={
        <>{name}</>
      }>
      </BookmarkContainer>

    </Container>

  );
}

function CharacterInfo({ name, member }: { name: string, member: member }) {
  return (
    <Container className="px-2">
      <BookmarkContainer title={
        <Link
          href="/members"
          scroll={false}
          className={cn(style.tagLink, 'd-inline-block px-2 py-1 text-decoration-none')}
        ><i className="bi bi-arrow-left-circle-fill me-1" />登場人物</Link>
      }>
        <div className="container myfont">
          {/* <p className={style.defaultText}>
                        因为 <b>{name}</b> 没有提供个人主页内容，所以该页面是简陋的默认页面。
                    </p> */}
          <div className={cn(`${style.InfoPhoto} row justify-content-center align-items-center`)}>
            <div className={cn(`${style.linkAvatar} col-4 col-md-3`)}>
              <Image className='box-shadow' src={member.photo} alt={name} width={512} height={512}  style={{ viewTransitionName: 'profile-photo-' + slugify(name) }} />
            </div>
            <div className={cn(`${style.InfoText} col-8 col-md-9`)}>
              <h1 className={cn(`${style.InfoName} text-4xl fw-bold`)}>{name}</h1>
              <div className={cn(`${style.InfoBio} fst-italic mt-3`)}>
                {member.bio ? member.bio : "这是一个默认 Bio (这个家伙懒爆了，Bio 都不提供)"}
              </div>
            </div>
          </div>
        </div>
      </BookmarkContainer>
    </Container>
  );
}

function PostFromThisMember({ posts }: { posts: PostType[] }) {
  return (
    <Container className="px-2">
      <PostsByYears posts={posts} />
    </Container>
  );
}

