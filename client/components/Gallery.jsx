import React from 'react';
import Lightbox from 'react-image-lightbox';
import GalleryImage from './GalleryImage';

import keyify from '../js/keyify';
import { getImages } from '../js/lightroom';

class Gallery extends React.Component { 
    constructor() {
        super();
        let empty = {}
        let placeholder = Array.from(new Array(12)).map(x => empty)
        this.state = {
            content: placeholder,
            openIndex: -1
        };
    }
    componentDidMount() {
        getImages()
            .then(data => {
                this.setState({
                    content: data
                })
            })
    }
    renderImage(item, index) {
        let onClick = () => {
            this.setState({
                openIndex: index
            })
        }
        return <GalleryImage src={item.small} onClick={onClick}/>
    }
    openLightbox(index) {
        this.setState({
            openIndex: index
        })
    }
    closeLightbox() {
        this.setState({
            openIndex: -1
        })
    }
    render() {
        let renderImage = this.renderImage.bind(this)
        let thumbnails = keyify(this.state.content.map(renderImage));
        let lightbox = this.state.openIndex !== -1 ? 
            <Lightbox
                mainSrc={this.state.content[this.state.openIndex].full}
                onCloseRequest={this.closeLightbox.bind(this)}
            /> :
            null
        return <div className="gallery-container">
            {thumbnails} 
            { lightbox }
        </div>          
    }
}

export default Gallery;