import React from 'react';

class GalleryImage extends React.Component {
    render() {
        let src = this.props.src;
        let style;
        let classList = ['GalleryImage']; 
        if (src) {
            style = {
                backgroundImage: `url(${src})`
            }
        } else {
            classList.push('loading')
        }

        return <div 
            className={classList.join(' ')}
            style={style}
            onClick={this.props.onClick}
        />
    }
}

export default GalleryImage;