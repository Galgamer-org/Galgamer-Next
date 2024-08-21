import { getAllPosts, getPostByAbbrlink } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/components-layout/container";
import PostHeader from "@/components/post-header";
import { ReactNode } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import cn from "classnames";
import "@/styles/github-markdown.css";
import style from "@/styles/article.module.css";
import SmartImage from "@/components/smart-image";
import BookmarkContainer from "@/components/bookmark-container";

//export const dynamicParams = false;
export async function generateStaticParams() {
  const posts = getAllPosts();
  let result = posts.map((post) => {
    return {
      abbr: post.abbrlink.toString(),
    };
  });
  //console.log(result)
  return result//.slice(0, 10);
}

type MetadataProps = {
  params: { abbr: string };
};

export async function generateMetadata(
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const abbr = params.abbr;

  const post = getPostByAbbrlink(parseInt(abbr));

  return {
    metadataBase: new URL("https://galgamer.moe"),
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,

    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `article/${post.abbrlink}`,
      siteName: "Galgamer",
      images: [
        {
          url: post.index_img, // need fix
        },
      ],
      locale: "zh_HK",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.index_img], // need fix
    },
  };
}

export default async function Article({ params }) {
  const post = getPostByAbbrlink(params.abbr);
  const content = markdownToHtml(post.content);

  return (
    <>
      <CustomCss />
      <Container className="px-2">
        <PostHeader
          post={post}
        />
      </Container>

      <HeroImage src={post.index_img} />
      <Container className="px-2 mt-5">
        <section className="d-flex">
          <PostBody content={content} />
          <Aside />
        </section>
      </Container>
    </>
  );
}

function HeroImage({ src }: { src: string }) {
  return (
    <section className={cn(style.heroContainer, "mx-auto mt-3 px-2")}>
      <div className={cn(style.cardContainer, "box-shadow")}>
          <SmartImage
            src={src}
            alt={`Cover Image`}
            className={cn("w-100", style.coverImage)}
            loading="eager"
          />
      </div>
    </section>
  );
}

function CustomCss() {
  return (
    <style>{`
      body {
        background: var(--body-bg-color);
      }
    `}</style>
  );
}

function Aside() {
  return (
    <div className={cn("d-lg-block d-none col-3")}>
      <aside className={cn("ps-3", style.asideContent)}>

        <div className={cn("container-board p-3 mb-3 box-shadow o-hidden")}>
          <div className="fw-bolder">目錄</div>
          <div className="">
            <img src="https://via.placeholder.com/200x200" alt="廣告" />
          </div>
        </div>
        <div className={cn("container-board p-3 box-shadow o-hidden")}>
          <div className="fw-bolder">垃圾</div>
          <div className="">
            <img src="https://via.placeholder.com/200x200" alt="廣告" />
          </div>
        </div>
      </aside>
    </div>
  );
}

function PostBody({ content }: { content: ReactNode }) {
  return (
    <article className="col-12 col-lg-9">
      <div className={cn("container-board", "mx-auto p-3 box-shadow")}>
        <div className={cn("markdown-body", "p-3")} children={content} />
      </div>
    </article>
  );
}
