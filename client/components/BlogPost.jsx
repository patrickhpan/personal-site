import React from 'react';

import { getEntryBySlug } from '../js/contentful';

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
        return {
            title: post.fields.title,
            md: post.fields.body
        }
    }
    render() {
        console.log(this.state.post)
        if(!this.state.post) {
            return null;
        }

        let { title, md } = this.formatPost(this.state.post);

        return <div className="BlogPost"> 
            <h2>{title}</h2>
            {md}
        </div>
    }
}

export default BlogPost