import React from 'react';

const CASCADE_TIME = 150;
const LOAD_THRESHOLD = 100;
let loadedOnce = false;

class GalleryImage extends React.Component {
    constructor() {
        super();
        this.initDate = +new Date();
        this.state = {
            loaded: loadedOnce
        }
    }
    onImageLoad() {
        let randomDelay = 0;
        if (!loadedOnce && (+new Date() - this.initDate < LOAD_THRESHOLD)) {
            // Image has been loaded before, initiate random cascade
            randomDelay = Math.random() * CASCADE_TIME
        }
        setTimeout(() => {
            this.setState({
                loaded: true
            }, () => {
                loadedOnce = true;
            })
        }, randomDelay);
    }
    render() {
        // get image source from props
        let src = this.props.src;        

        // the image will have classes image and one other        
        let classList = ['image'];
        let style;
        if (src && this.state.loaded) {
            // if the source exists and the image has been loaded before,
            // apply the image source and show it
            style = {
                backgroundImage: `url(${src})`
            };
            classList.push('loaded');
        } else {
            // if the source does not exist, or the image has not been loaded before,
            // trigger a cascade
            classList.push('loading')
        }

        let caption = this.props.caption;
        let captionDiv = <div className='image-caption'>{caption}</div>;
         
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
            {captionDiv}
        </div>    
    }
}

export default GalleryImage;