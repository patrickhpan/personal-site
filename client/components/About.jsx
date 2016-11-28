import React from 'react';
import Content from './_Content';

import content from '../json/About.json';

const About = (props) => <Content 
    {...props}
    data={content} 
    elementId="About"
/>

export default About;