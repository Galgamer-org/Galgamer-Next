import Container from 'components-layout/container'
import cn from 'classnames'
import MainVisualH1 from '@/components/MainVisualH1'
import style from '@/styles/information.module.css'
import { Col, Row } from 'react-bootstrap'
import { ReactNode } from 'react'
import markdownToHtml from '@/lib/markdownToHtml'
import fs from 'fs'
import { join } from 'path'
import '@/styles/github-markdown.css'
import { Metadata } from 'next'

const feedPath = join(process.cwd(), '_feed', 'privacy.md');

export const metadata: Metadata = {
    title: '隱私權政策 - Galgamer',
    description: "Privacy Policy (Draft, not yet effective!!)",
  }
  

export default function TermsPage() {
    const text = fs.readFileSync(feedPath, 'utf8')
    const content = markdownToHtml(text || '');

    return (
        <Container className='px-2'>
            <MainVisualH1
                title="隱私權政策"
                description="Privacy Policy"
                cssClass={style.terms}
            ></MainVisualH1>
            <section>
                <div className={cn('container-board', 'mx-auto p-1 p-md-2 box-shadow')}>
                    <div
                        className={cn('markdown-body', 'p-3 p-lg-5')}
                        children={content}
                    />
                </div>
            </section>
        </Container>
    );
}