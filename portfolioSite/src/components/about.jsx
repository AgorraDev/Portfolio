import './style/about.css'

const About = () => {
    return(
      <section id='about'>
            <div className='title'>
                <h1 className='about-title'>ABOUT ME</h1>
            </div>
            <div className="img">
                    <img loading='lazy' className='img-container' src='src/assets/portfolio_bg1.png' alt="Image of Hagen" />
            </div>
            <div className='main'>
                <div className='main-text'>
                    <p>Hey! I'm Hagen. </p>
                    <br />
                    <p>
                        I'm a creative who loves to design and build software that meets user needs. From simple one page webistes to
                        web apps that require databases or APIs. I enjoy working with clients through every stage of building.
                    </p>
                    <br />
                    <p>
                        If you're looking to hire for a new or existing project get in touch to discuss your needs. 
                    </p>
                       <br />
                       <p>
                        I am currently taking on freelance work. If any employers or recruiters would like to reach out regarding work, feel
                        free to send a message.
                       </p>
                </div>
            </div>
            <footer className='footer'>
                <div className='contact-info'>
                    <p>Email: hgnwebservices@gmail.com</p>
                </div>
                <div className='socials'>
                    <p>Insta | Facebook </p>
                </div>
                
            </footer>
      </section>

    )
}

export default About