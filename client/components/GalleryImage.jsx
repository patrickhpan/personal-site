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
        } else {
            // Image has not been loaded before, should cascade
            console.log("Loaded first time")
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