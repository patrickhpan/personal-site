import React from 'react';
import { Link } from 'react-router';
import marked from 'marked';
import flatten from 'array-flatten';

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
        getEntryBySlug(slug)
            .then(data => {
                this.setState({
                    post: data.items[0]
                })
            });
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
            items: splitBody.map(item => { 
                let md = marked(item);
                let isLink = !!(md.match(/<a /))
                return {
                    __html: md
                };
            })
        }
    }

    renderTags(tags) {
        let spanComma = <span>, </span>;
        tags = tags.sort()
        let tagLinks = tags.map((tag, i) => {
            let urlTag = tag.replace(/\s+/g, '-');
            return <Link className="tag" to={`/blog/tag/${urlTag}`}>
                    {tag}
                </Link>
        })
        let createdTags = keyify(flatten(tagLinks.map(tag => [
            tag,
            spanComma
        ])));
        if (createdTags.length > 1) {
            createdTags.pop();   
        }
        return <div className="tags content-md">
            <p>Tags: {createdTags}</p> 
        </div>
    }
    
    render() {
        if(!this.state.post) {
            return null;
        }

        let { title, items } = this.formatPost(this.state.post);

        let content = keyify(items.map(item => {
                return <div className="content-md" dangerouslySetInnerHTML={item} />
            }
        ));

        let renderedTags = this.renderTags(this.state.post.fields.tags);        
        let renderedFooter = keyify(renderItem(footer));

        return <div className="BlogPost"> 
            <h2 className="title">{title}</h2>
            <div className="content-container">
                {content}
                {renderedTags}
                {renderedFooter}
            </div>
        </div>
    }
}

export default BlogPost