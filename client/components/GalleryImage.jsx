import React from 'react';

class GalleryImage extends React.Component {
    render() {
        let src = this.props.src;
        let style = {
            backgroundImage: `url(${src})`
        }

        return <div 
            className="GalleryImage"
            style={style}
            onClick={this.props.onClick}
        />
    }
}

export default GalleryImage;