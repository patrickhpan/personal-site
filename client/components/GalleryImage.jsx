import React from 'react';

class GalleryImage extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false
        }
    }
    onImageLoad() {
        this.setState({
            loaded: true
        })
    }
    render() {
        let src = this.props.src;        

        let classList = ['image'];
        let style;
        if (src && this.state.loaded) {
            style = {
                backgroundImage: `url(${src})`
            };
            classList.push('loaded');
        } else {
            classList.push('loading')
        }
         
        let img = <div
            className={classList.join(' ')}
            style={style}
        />
        
        let onLoad = this.onImageLoad.bind(this)

        let loader = src && !this.state.loaded ?
            <img
                src={src}
                onLoad={onLoad}
                className="hidden"
            /> :
            null;


        return <div 
            className='GalleryImage'
            onClick={this.props.onClick}
        >
            {loader}
            {img}
        </div>    
    }
}

export default GalleryImage;