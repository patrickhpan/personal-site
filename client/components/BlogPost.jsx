import React from 'react';
import marked from 'marked';

import { renderItem } from './_Content';
import keyify from '../js/keyify'
import { getEntryBySlug } from '../js/contentful';
import { footer } from '../json/BlogPost.json';

class BlogPost extends React.Component {
    constructor() {
        super();
        this.state = {
            post: null
        }
    }
    componentDidMount() {
        if(!this.props.params || !this.props.params.slug) {
            return;
        }
        let slug = this.props.params.slug;
        getEntryBySlug(data => {
            console.log(data);
            this.setState({
                post: data.items[0]
            })
        }, 'blog-post', slug);
    }
    formatPost(post) {
        if(post === undefined) {
            return {
                title: "Post not found."
            }
        }

        let splitBody = post.fields.body.split(/\n\n/g);

        return {
            title: post.fields.title,
            markdowns: splitBody.map(item => { return {
                __html: marked(item)
            }})
        }
    }
    render() {
        console.log(this.state.post)
        if(!this.state.post) {
            return null;
        }

        let { title, markdowns } = this.formatPost(this.state.post);

        let content = keyify(markdowns.map(md => <div className="content-md" dangerouslySetInnerHTML={md} />));

        let renderedFooter = keyify(renderItem(footer));

        return <div className="BlogPost"> 
            <h2>{title}</h2>
            <div className="content-container">
                {content}
                {renderedFooter}
            </div>
        </div>
    }
}

export default BlogPost