import React, { ReactNode } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import { visit } from "unist-util-visit";
import SmartImage from "../components/smart-image";
import { Link } from 'next-view-transitions'
import ClientScript from "../components/client-script";
import { DetailedHTMLProps, ObjectHTMLAttributes } from "react";
// import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'
import VndbStats from "../components-widget/vndb-stats";
import BsGallery from "../components-widget/bs-gallery";

import markdownStyles from "/styles/github-markdown-light.module.css";
import TGChannel from "components-widget/tg-channel";
import SteamWidget from "components-widget/steam-widget";
import SteamPlayer from "components-widget/steam-player";

import jsx from "jsx-transform";

function checkNewLine(markdown: string): string {
  // replaced by remark plugin
  return markdown;
  // if a line is followed by a new line with non-zero length, add two spaces at the end of the line
  // check \r\n
  markdown = markdown.replace(/\r\n/g, "\n");
  const lines = markdown.split("\n");
  const newLines = [];
  for (let i = 0; i < lines.length; i++) {
    if (
      i < lines.length - 1 &&
      lines[i + 1].length > 0 &&
      lines[i].length > 0
    ) {
      newLines.push(lines[i] + "  ");
    } else {
      newLines.push(lines[i]);
    }
  }
  // console.log(lines);
  // console.log(newLines);
  return newLines.join("\n");
}

function extractHtmlTemplate(markdown: string, customTags: any): string {
  // search for
  // {% template template_name param1 param2 ... paramN %}
  //   content
  // {% endtemplate %}
  // in markdown and replace it with
  // <object type="template" data="[template_name param1, param2, ..., paramN]">
  //  content's base64 encoded string
  // </object>

  const templateRegex =
    /{%\stemplate\s((?:[\w_-]+\s*)*)%}\n([\S\s]*)\n{%\sendtemplate\s%}/g;
  // group 1: template_name param1 param2 ... paramN
  // group 2: content
  const matches = markdown.matchAll(templateRegex);
  for (const match of matches) {
    const replaceTarget = match[0];
    const templateParams = match[1]
      .split(" ")
      .filter((param) => param.length > 0);
    const content = match[2];
    const encodedContent = Buffer.from(content).toString("base64");

    const customTagName = templateParams.shift();

    // push to customTags
    customTags[customTagName] = createReactNodeGenerator(
      templateParams,
      encodedContent
    );

    // delete this template
    markdown = markdown.replace(replaceTarget, "");

    // const templateData = JSON.stringify(templateParams);
    // const newTemplate = `<object2 type="template" data='${templateData}'>${encodedContent}</object2>`;
    // markdown = markdown.replace(replaceTarget, newTemplate);
  }

  return markdown;
}

function checkOtherTemplates(markdown: string): string {
  // search for {% template_name param1 param2 ... paramN %} in markdown and replace it with <object type="template_name" data="[param1, param2, ..., paramN]"></object>

  const templateRegex = /{%\s([\w_-]+)\s((?:[\w_-]+\s*)*)%}/g;
  const matches = markdown.matchAll(templateRegex);
  const newMatches = [];
  for (const match of matches) {
    newMatches.push(match);
  }

  for (let i = newMatches.length - 1; i >= 0; i--) {
    const match = newMatches[i];
    const replaceTarget = match[0];
    const templateName = match[1].toLowerCase();
    const params = match[2].split(" ").filter((param) => param.length > 0);

    const templateParams = JSON.stringify(params);

    switch (templateName) {
      case "telegram_channel":
        const newTGChannel = `<object type="telegram_channel" data='${templateParams}'></object>`;
        markdown = markdown.replace(replaceTarget, newTGChannel);
        break;

      case "steam_widget":
        const newSteamWidget = `<object type="steam_widget" data='${templateParams}'></object>`;
        markdown = markdown.replace(replaceTarget, newSteamWidget);
        break;

      case "steam_player":
        const newSteamPlayer = `<object type="steam_player" data='${templateParams}'></object>`;
        markdown = markdown.replace(replaceTarget, newSteamPlayer);
        break;

      case "gallery":
        const newGallery = `<object type="gallery" data='${templateParams}'>`;
        markdown = markdown.replace(replaceTarget, newGallery);
        break;
      case "endgallery":
        const newEndGallery = `</object>`;
        markdown = markdown.replace(replaceTarget, newEndGallery);
        break;

      // case 'template':
      //   const newTemplate = `<object type="template" data='${templateParams}'>`;
      //   markdown = markdown.replace(replaceTarget, newTemplate);
      //   break;
      // case 'endtemplate':
      //   const newEndTemplate = `</object>`;
      //   markdown = markdown.replace(replaceTarget, newEndTemplate);
      //   break;

      case "vndb":
        const newVndb = `<object type="vndb" data='${templateParams}'></object>`;
        markdown = markdown.replace(replaceTarget, newVndb);
        break;

      default: // unsupported template
        markdown = markdown.replace(
          replaceTarget,
          `{% unsupported_template ${templateName} ${templateParams} %}}`
        );
        break;
    }
  }

  return markdown;
}

function createReactNodeGenerator(
  // tagName: string,
  props: string[], // like [no, cv, name, ident, append, html]
  reactBody: string // like baes64 encoded string <div>...</div>
) {
  reactBody = Buffer.from(reactBody, "base64").toString("utf-8");

  const raw = reactBody.replace(/%{/g, "{{").replace(/}%/g, "}}");
  // const fn = jsx.fromString(`({ ${props.join(", ")} }) => ${raw}`, {
  //   factory: "this.createElement'",
  // });

  const source = jsx.fromString(raw, {
    factory: 'this.createElement'
  })
  const fn = new Function('_', `const {${props.join(", ")}} = _; return (${source})`).bind(React)

  return fn;
}

export default function markdownToHtml(markdown: string): ReactNode {
  const customTags = {
    object2: function (props) {
      return <Template {...props} />;
    },
    // "sp-character": createReactNodeGenerator(
    //   ["no", "cv", "name", "ident", "append", "children"],
    //   "ICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ic3AtY2hhcmFjdGVyIG15LTQiPgogICAgICAgICAgPGltZyBjbGFzc05hbWU9InNwLWltYWdlIiBzcmM9e2AuLi9pbWFnZS/nuqLnur8vY2hhcmFjdGVyXyR7bm99LndlYnBgfSAvPgogICAgICAgICAgPGRpdiBjbGFzc05hbWU9InNwLWN2Ij5DVjoge2N2fTwvZGl2PgogICAgICAgICAgPGRpdiBjbGFzc05hbWU9InNwLW5hbWUiPnsKICAgICAgICAgICAgbmFtZS5zcGxpdCgifCIpLm1hcChwYXJ0ID0+IHsKICAgICAgICAgICAgICBjb25zdCBbcmVhbCwgdHJhbl0gPSBwYXJ0LnNwbGl0KCIsIik7CiAgICAgICAgICAgICAgcmV0dXJuIDxydWJ5PntyZWFsfTxydD57dHJhbn08L3J0PjwvcnVieT47CiAgICAgICAgICAgIH0pCiAgICAgICAgICB9PHNwYW4gY2xhc3NOYW1lPSJzcC1hcHBlbmQiPnthcHBlbmR9PC9zcGFuPjwvZGl2PgogICAgICAgICAgPGRpdiBjbGFzc05hbWU9InNwLWlkZW50Ij7jgIx7aWRlbnR944CNPC9kaXY+CiAgICAgICAgICA8ZGl2IGNoaWxkcmVuPXtjaGlsZHJlbn0gLz4KICAgICAgICA8L2Rpdj4="
    // ),
  };

  // markdown string pre-processing
  markdown = extractHtmlTemplate(markdown, customTags);
  markdown = checkOtherTemplates(markdown);
  // markdown = checkNewLine(markdown);

  return (
    <Markdown
      remarkPlugins={[
        [remarkGfm, {}],
        [remarkBreaks, {}],
        [mdastCheck, {}],
      ]}
      rehypePlugins={[
        [hastCheck, {}],
        [rehypeRaw, {}],
      ]}
      components={{
        h1: "h2",
        img(props) {
          const { className, ...others } = props;
          return (
            <>
              <SmartImage
                className={`box-shadow ${className} ${markdownStyles.articleImage}`}
                {...others}
              />
              <p className={markdownStyles.articleImageCaption}>{props.alt}</p>
            </>
          );
        },
        script(props) {
          return <ClientScript children={props.children} />;
          //return <script dangerouslySetInnerHTML={{__html: props.children}} />;
        },
        button(props) {
          const { className, ...others } = props;
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: `<button class="${className}" ${Object.keys(others)
                  .map((key) => `${key}="${others[key]}"`)
                  .join(" ")}>${props.children}
            </button>`,
              }}
            ></div>
          );
        },
        a(props) {
          const { href, ref, ...others } = props;
          return <Link href={href || ""} {...others} />;
        },
        style(props) {
          //console.log(props.children);
          const { children, ...others } = props;
          return (
            <style
              {...others}
              dangerouslySetInnerHTML={{ __html: props.children }}
            ></style>
          );
        },
        object: function (props) {
          return <Template {...props} />;
        },
        ...customTags,
      }}
    >
      {markdown}
    </Markdown>
  );
}

type TemplateProps =
  | Omit<
      DetailedHTMLProps<
        ObjectHTMLAttributes<HTMLObjectElement>,
        HTMLObjectElement
      >,
      "ref"
    >
  | Omit<
      DetailedHTMLProps<
        ObjectHTMLAttributes<HTMLObjectElement>,
        HTMLObjectElement
      >,
      "ref"
    >;

function Template(props: TemplateProps): ReactNode {
  const { data, type, ...others } = props;

  switch (type) {
    case "telegram_channel":
      const params = JSON.parse(data);
      return <TGChannel channelName={params[1]} msg={params[0]} />;

    case "gallery":
      const params2 = JSON.parse(data);
      const galleryId = params2[0];
      const galleryImages = others.children
        .toString()
        .split("\n")
        .filter((child: string) => child.length > 0);
      const newGalleryImages = [];
      for (let i = 0; i < galleryImages.length; i++) {
        galleryImages[i] = galleryImages[i].trim();
        if (galleryImages[i]) {
          newGalleryImages.push(galleryImages[i]);
        }
      }

      return (
        <BsGallery
          id={galleryId}
          images={newGalleryImages.map((image: string, index: number) => {
            return (
              <SmartImage
                key={index}
                src={image}
                alt={`gallery ${galleryId} image ${index}`}
              />
            );
          })}
        />
      );

    case "vndb":
      const params3 = JSON.parse(data);
      const vndbId = params3[0];
      return <VndbStats vndbId={vndbId} />;

    case "steam_widget":
      const param4 = JSON.parse(data);
      const gameId = param4[0];
      return <SteamWidget gameId={gameId} />;

    case "steam_player":
      const param5 = JSON.parse(data);
      const playId = param5[0];
      return <SteamPlayer playId={playId} />;

    default:
      const field = others.children.toString();
      return (
        <div>
          <p>Unsupported template type: {type}</p>
          <p>Params: {data}</p>
          <p>Content: {field}</p>
        </div>
      );
  }
}

function mdastCheck() {
  return mdastInspect;
}

function mdastInspect(tree, file) {
  visit(tree, "object", nodeInspect);
}

function hastCheck() {
  return hastInspect;
}

function hastInspect(tree, file) {
  visit(tree, "object", nodeInspect);
}

function nodeInspect(node, index, parent) {
  console.log(node);
  console.log(index);
  console.log(parent);
  //delete this node
  //parent.children.splice(index, 1);
}
