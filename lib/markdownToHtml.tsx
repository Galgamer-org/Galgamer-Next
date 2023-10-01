import { ReactNode } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import SmartImage from '../components/smart-image'
import Link from 'next/link'
import ClientScript from '../components/client-script'
import { DetailedHTMLProps, ObjectHTMLAttributes } from 'react'
import { ReactMarkdownProps } from 'react-markdown/lib/ast-to-react'
import { ca } from 'date-fns/locale'
import BsGallery from '../components/bs-gallery'

import markdownStyles from '/styles/github-markdown-light.module.css'



function checkNewLine(markdown: string) : string{
  // if a line is followed by a new line with non-zero length, add two spaces at the end of the line
  // check \r\n
  markdown = markdown.replace(/\r\n/g, '\n');
  const lines = markdown.split('\n');
  const newLines = [];
  for(let i = 0; i < lines.length; i++) {
    if(i < lines.length - 1 && lines[i + 1].length > 0 && lines[i].length > 0) {
      newLines.push(lines[i] + '  ');
    }else {
      newLines.push(lines[i]);
    }
  }
  // console.log(lines);
  // console.log(newLines);
  return newLines.join('\n');
}

function checkTemplate(markdown: string) : string{
  // search for {% template_name param1 param2 ... paramN %} in markdown and replace it with <object type="template_name" data="[param1, param2, ..., paramN]"></object>

  const templateRegex = /{%\s(\w+)\s((?:\w+\s*)*)%}/g;
  const matches = markdown.matchAll(templateRegex);
  const newMatches = [];
  for(const match of matches) {
    newMatches.push(match);
  }


  for(let i = newMatches.length - 1; i >= 0; i--) {
    const match = newMatches[i];
    const replaceTarget = match[0];
    const templateName = match[1].toLowerCase();
    const params = match[2].split(' ').filter(param => param.length > 0);
    
    const templateParams = JSON.stringify(params);

    switch(templateName) {
      case 'telegram_channel':
        const newTGChannel = `<object type="telegram_channel" data='${templateParams}'></object>`;
        markdown = markdown.replace(replaceTarget, newTGChannel);
        break;
      case 'steam_widget':
        const newSteamWidget = `<iframe src="https://store.steampowered.com/widget/${params[0]}/" frameborder="0" width="100%" height="200px" loading="lazy"></iframe>`;
        markdown = markdown.replace(replaceTarget, newSteamWidget);
        break;

      case 'gallery':
        const newGallery = `<object type="gallery" data='${templateParams}'>`;
        markdown = markdown.replace(replaceTarget, newGallery);
        break;
      case 'endgallery':
        const newEndGallery = `</object>`;
        markdown = markdown.replace(replaceTarget, newEndGallery);
        break;
      
      default:  // unsupported template
        markdown = markdown.replace(replaceTarget, `{% unsupported_template ${templateName} ${templateParams} %}}`);
        break;
    }
  }

  return markdown;
}


export default function markdownToHtml(markdown: string) : ReactNode{

  // markdown string pre-processing
  markdown = checkTemplate(markdown);
  markdown = checkNewLine(markdown);

  return <Markdown 
    remarkPlugins={[[remarkGfm, {}]]}
    rehypePlugins={[rehypeRaw]}
    components={{
      h1: 'h2',
      img(props){
          const {className, ...others} = props;
          return <SmartImage className={`${className} ${markdownStyles.articleImage}`} {...others} />
      },
      script(props){
          return <ClientScript 
            children={props.children.toString().split('\n')}
          />
          //return <script dangerouslySetInnerHTML={{__html: props.children}} />;
      },
      button(props){
          const {className, ...others} = props;
          return <div dangerouslySetInnerHTML={{
            __html: `<button class="${className}" ${Object.keys(others).map(key => `${key}="${others[key]}"`).join(' ')}>${props.children}
            </button>`
          }}></div>;
      },
      a(props){
          const {href, ...others} = props;
          return <Link href={href} {...others} />;
      },
      style(props){
          //console.log(props.children);
          const {children, ...others} = props;
          return <style {...others} dangerouslySetInnerHTML={{__html: props.children}}  ></style>;
      },
      object(props){
        return <Template {...props} />
      }
    }}
  >
    {markdown}
  </Markdown>
}


type TemplateProps = Omit<DetailedHTMLProps<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>, "ref"> & ReactMarkdownProps | Omit<DetailedHTMLProps<ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>, "ref">

function Template(props: TemplateProps): ReactNode {
  const {data, type, ...others} = props;
  switch(type) {
    case 'telegram_channel':
      const params = JSON.parse(data);
      return <a href={`tg://resolve?domain=${params[1] ? params[1] : 'KiritouKureha'}&post=${params[0]}`}>🔗前往 Telegram 頻道</a>

    case 'gallery':
      const params2 = JSON.parse(data);
      const galleryId = params2[0];
      const galleryImages = others.children.toString().split('\n').filter((child: string) => child.length > 0);
      const newGalleryImages = [];
      for(let i = 0; i < galleryImages.length; i++) {
        galleryImages[i] = galleryImages[i].trim();
        if(galleryImages[i]) {
          newGalleryImages.push(galleryImages[i]);
        }
      }

      return <BsGallery id={galleryId} images={
        newGalleryImages.map((image: string, index: number) => {
          return <SmartImage key={index} src={image} alt={`gallery ${galleryId} image ${index}`} />
        })
      } />;

    default:
      return <></>;
  }
}