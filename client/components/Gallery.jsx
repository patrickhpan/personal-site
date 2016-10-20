import React from 'react';
import Lightbox from 'react-image-lightbox';
import GalleryImage from './GalleryImage';

import keyify from '../js/keyify';
import { getImages } from '../js/lightroom';

class Gallery extends React.Component { 
    constructor() {
        super();
        this.state = {
            content: [],
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
        console.log(this)
        let onClick = function () {
            console.log(this)
            this.setState({
                openIndex: index
            })
        }.bind(this)
        return <GalleryImage src={item.thumbnail} onClick={onClick}/>
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
        let thumbnails = keyify(this.state.content.map(this.renderImage.bind(this)));
        let lightbox = this.state.openIndex !== -1 ? 
            <Lightbox
                mainSrc={this.state.content[this.state.openIndex].full}
                onCloseRequest={this.closeLightbox.bind(this)}
            /> :
            null
        return <div className="Portfolio">
            <h2>Photography</h2>
            <div className="gallery-container">
                {thumbnails}
            </div>          
            { lightbox }
        </div>
    }
}

export default Gallery;