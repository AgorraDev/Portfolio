import { useState } from "react"
import './style/gallery.css'
const Gallery = () => {

    const [projects, setProjects] = useState([
        {'id' : 1, 'title' : 'Agora Store', 'description': 'A basic eccommerce site using my own brand of t-shirts', 'link': 'https://agora-new-three.vercel.app/', 'image' : 'portfolioSite/src/assets/AgoraStore_portfolio_bg.png' },
        // {'id' : 2, 'title' : 'Project2', 'description': 'Describing what I have worked on', 'link': '/projects/2' },
        // {'id' : 3, 'title' : 'Project3', 'description': 'Describing what I have worked on', 'link': '/projects/3' },
        // {'id' : 4, 'title' : 'Project4', 'description': 'Describing what I have worked on', 'link': '/projects/4' }, 
        // {'id' : 5, 'title' : 'Project4', 'description': 'Describing what I have worked on', 'link': '/projects/4' },
        // {'id' : 6, 'title' : 'Project4', 'description': 'Describing what I have worked on', 'link': '/projects/4' },
    ])
    console.log(projects[0].title)


    return( 
        
        <section id='projects'>
        <div className="project-wrapper">
        <h3>Previous work</h3>

        <div className="gallery">
            {
            projects.length > 0 ? (
            projects.map(project => (
                <a key={project.id} href={project.link}>
                <div className="project-card" style={{backgroundImage: `url(${project.image})`, backgroundSize: 'cover' }}>
                </div>
                <p style={{textAlign: 'center' }}>{project.title}</p>
                <p style={{textAlign: 'center'}}>{project.description}</p>
                </a>
            ))
        ) : (<p>Loading...</p>)
        }
        </div>
        </div>    
        </section>
    )
}

export default Gallery