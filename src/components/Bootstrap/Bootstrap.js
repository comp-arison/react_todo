import './Bootstrap.css'
import React from 'react'
import { Carousel } from 'react-bootstrap'
import image from '../../images/background.jpg'
import image2 from '../../images/background2.jpg'
import image3 from '../../images/background3.jpg'

export default function Bootstrap() {
  return (
    <section className="bootstrap">
      <main>
        <Carousel controls={false} fade>
          <Carousel.Item>
            <img src={image} alt="First slide" className='d-block w-100'/>
            <Carousel.Caption>
              <h3>Welcome to ToDo Manager!</h3>
              <p>The easy way to manage tasks.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={image2} alt="Second slide" className='d-block w-100'/>
            <Carousel.Caption>
              <h3>Create tasks to manage</h3>
              <p>Mark them as complete as you go.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={image3} alt="Third slide" className='d-block w-100'/>
            <Carousel.Caption>
              <h3>Organize them with categories</h3>
              <p>Categorize them however you like.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

      </main>
    </section>
  )
}
