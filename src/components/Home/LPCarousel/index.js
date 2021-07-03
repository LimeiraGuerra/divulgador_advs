import React from 'react';
import { Carousel } from 'react-responsive-carousel';
// eslint-disable-next-line no-unused-vars
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import law1 from './law1.jpg';
import law2 from './law2.jpg';
import { Link } from 'react-router-dom';

import {
    Item
} from './style';

const LPCarousel = () => {
    return (
        <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true} showStatus={false} showArrows={false}>
            <div>
                <Item style={{backgroundImage: `url(${law1})`}}>
                    <h3>Novo no Law 4U?</h3>
                    <p>Comece procurando um advogado perto de você</p>
                    <p>usando os campos abaixo</p>
                </Item>
            </div>
            <div>
                <Item style={{backgroundImage: `url(${law2})`}}>
                    <h3>Advogado?</h3>
                    <p>Faça o <Link to='/cadastro' className="link">cadastro</Link> do seu perfil</p>
                    <p>e começe a divulgar seus serviços aqui no Law 4U</p>
                </Item>
            </div>
        </Carousel>
    );
}

export default LPCarousel;