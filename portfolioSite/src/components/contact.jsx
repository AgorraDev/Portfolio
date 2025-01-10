import axios from 'axios'
import React from 'react'
import { useState } from 'react'

import './style/contact.css'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [status, setStatus] = useState({ message: '', success: false});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        
        try {
            const res = await axios.post('http://localhost:5000/api/send-email', formData);
            setStatus({ message: 'Message sent successfully', success: true});
        } catch (error) {
            console.log(formData);
            
            console.error(error);
            setStatus({
                message: error.repsonse?.data?.message || 'Error sending message',
                success: false,
            });
        }
    };

    return (
        <section id='contact'>
        <div className='contact-copy'>
        <h1 className='contact-header'>What can I help you with?</h1>
        <ul className='contact-list'>
            <li className='contact-li'>Developing functional websites that draw in customers</li>
            <li className='contact-li'>Designing tailored graphics for web</li>
            <li className='contact-li'>Creating captivating copy</li>
        </ul>
        <p className='contact-hook'>I offer creative solutions to help solve your problems. From building websites from the ground up, to UX/UI expertise, and graphic design. 
           I work collaboratively with clients to provide the best results. Sound good? Get in touch!
        </p>
        </div>
        <div className="form-container"> 

            <form action="contact-me" id="contact-me" onSubmit={handleSubmit}>
                <label  htmlFor="name"> Name
                    <input 
                    type="text" 
                    name='name'
                    id='name'
                    value={formData.name}
                    onChange={handleChange}
                    
                    required
                    /></label>
                <label htmlFor="email">Email
                    <input 
                    type="email" 
                    name='email'
                    id='email'
                    value={formData.email}
                    onChange={handleChange}
                    
                    required
                    /></label>
                <label htmlFor="message" className='texta'>Message
                    <textarea 
                    name="message" 
                    id="message" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder='Tell me about your project...'
                    rows={8}
                    cols={4}
                    required
                    ></textarea></label>

                <button aria-label='Submit' type='submit'>Get in touch!</button>
                <p style={{ textAlign: 'center', color: status.success ? 'green' : 'red'}}>{status.message}</p>
            </form>
        </div>
        </section>
    )
}

export default Contact