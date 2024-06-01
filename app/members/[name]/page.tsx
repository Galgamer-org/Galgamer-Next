import { staffs, members } from "_feed/members";
import { getMember } from "_feed/members";
import member from "@/interfaces/member";
import Container from "@/components-layout/container";
import style from "@/styles/members.module.css";
import BookmarkContainer from "@/components/bookmark-container";
import cn from "classnames";
import { ReactNode } from "react";
import type PostType from "@/interfaces/post";
import { getAllPosts } from "@/lib/api";
import PostPreview from "@/components/post-preview";
import { Col, Row } from "react-bootstrap";

import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next'
import PostsByYears from "@/components/posts-by-year";


type MetadataProps = {
  params: { name: string }
}

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {

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

  return params;
}



export default function MemberProfile({ params }: { params: { name: string } }) {
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
        <><i className="bi bi-person-heart me-1" />{name}</>
      }>
        <div className="container myfont">
          {/* <p className={style.defaultText}>
                        因为 <b>{name}</b> 没有提供个人主页内容，所以该页面是简陋的默认页面。
                    </p> */}
          <div className={cn(`${style.InfoPhoto} row justify-content-center align-items-center`)}>
            <div className={cn(`${style.linkAvatar} col-4 col-md-3`)}>
              <Image className='box-shadow' src={member.photo} alt={name} width={512} height={512} />
            </div>
            <div className={cn(`${style.InfoText} col-8 col-md-9`)}>
              <div className={cn(`${style.InfoBio} font-serif fw-bolder fst-italic`)}>
                <q>{member.bio ? member.bio : "这是一个默认 Bio (这个家伙懒爆了，Bio 都不提供)"}</q>
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

