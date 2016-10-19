import React from 'react';

class GalleryImage extends React.Component {
    render() {
        let src = this.props.src;
        let onClick = () => {
            this.props.onClick();
        }

        let style = {
            backgroundImage: `url(${src})`
        }

        return <div 
            className="GalleryImage"
            style={style}
        />
    }
}

export default GalleryImage;