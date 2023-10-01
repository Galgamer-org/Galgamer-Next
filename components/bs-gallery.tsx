'use client'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image';
import SmartImage from './smart-image';
import { ReactNode } from 'react';
import styles from '../styles/bs-gallery.module.css';


type Props = {
    images: ReactNode[],
    id?: string
}

export default function BsGallery(props: Props) {
    const { images, id } = props;

    return (
        <Carousel id={id} className={styles.bsGallery}>
            {
                images.map((image, index) => 
                        <Carousel.Item key={index}>
                            {image}
                        </Carousel.Item>
                    )
            }
        </Carousel>
    )
}