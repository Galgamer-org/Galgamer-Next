import PostType from '@/interfaces/post'
import BookmarkContainer from './bookmark-container';
import PostPreview from './post-preview';
import { Row, Col } from 'react-bootstrap';
import cn from 'classnames';

export default function PostsByYears({ posts }: { posts: PostType[] }) {
    const years = new Set(posts.map((post) => post.date.getFullYear()));
    const yearsArray = Array.from(years).sort().reverse();
    return (
      <div>
        {yearsArray.map((year) => {
          const postsInYear = posts.filter((post) => post.date.getFullYear() === year);
          return (
            <BookmarkContainer key={year} title={
              <><i className='bi-calendar3 me-2'></i> {year}</>
            }>
              <Row className={cn('pt-4 pt-md-4 mt-2 mx-0 px-1 px-md-2 px-xl-4 o-hidden')}>
                {postsInYear.map((post) => (
                  <Col key={post.slug} className='col-12 col-md-6 col-xl-4'>
                    <PostPreview post={post} />
                  </Col>
                ))}
              </Row>
            </BookmarkContainer>
          );
        })}
      </div>
  
    );
  }