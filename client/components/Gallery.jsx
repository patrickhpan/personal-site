import React from 'react';

import GalleryImage from './GalleryImage';

import { getImages } from '../js/lightroom';

class Gallery extends React.Component { 
    constructor() {
        super();
        this.state = {
            content: []
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
    renderImage(item) {
        return <GalleryImage src={item.thumbnail} />
    }
    render() {
        return <div className="Gallery Portfolio">
            {this.state.content.map(this.renderImage)}
        </div>
    }
}

export default Gallery;