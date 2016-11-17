import React from 'react';
import Content from './_Content';

import aboutContent from '../json/About.json';
import projectsContent from '../json/Projects.json';

const About = (props) => <Content 
    {...props}
    data={aboutContent} 
/>

// const Projects = (props) => <Content  
//     {...props}
//     data={projectsContent}
// />

export {
    About,
    // Projects
};