import React from 'react'
import Card from 'react-bootstrap/Card';
import prayerImf from '../assets/icons/prayer.png'
import cash from '../assets/icons/cash.png'
import moreImg from '../assets/icons/more.png'
import smImg from '../assets/icons/smoke.png'
import DeitImG from '../assets/icons/diet.png'
import { useNavigate } from 'react-router-dom';

function Todo() {

  const navigate = useNavigate()
  const navigateNext = ()=>{
    navigate('/todoTable')
  }
  
  const navigateNextdept = ()=>{
    navigate('/dept')
  }
  return (
    <div className='todo d-flex gap-5 justify-content-center align-items-center'>


      <Card onClick={navigateNext} style={{ width: '18rem', padding: '20px', cursor: 'pointer',border:'0'}} className='card shadow custom-card'>
        <Card.Body className='d-flex flex-column justify-content-center align-items-center gap-2 pointer-event'>
          <img src={prayerImf} alt="" />
          <Card.Title>Prayer</Card.Title>
        </Card.Body>
      </Card>

      



      <Card  onClick={navigateNextdept} style={{ width: '18rem', padding: '20px', cursor: 'pointer' ,border:'0'}} className='card shadow custom-card'>
        <Card.Body className='d-flex flex-column justify-content-center align-items-center gap-2 pointer-event'>
          <img src={cash} alt="" />
          <Card.Title>Debt</Card.Title>
        </Card.Body>
      </Card>

      <Card  onClick={navigateNext} style={{ width: '18rem', padding: '20px', cursor: 'pointer' ,border:'0'}} className='card shadow custom-card'>
        <Card.Body className='d-flex flex-column justify-content-center align-items-center gap-2 pointer-event'>
          <img src={cash} alt="" />
          <Card.Title>Opp</Card.Title>
        </Card.Body>
      </Card>

      <Card  onClick={navigateNext} style={{ width: '18rem', padding: '20px', cursor: 'pointer' ,border:'0'}} className='card shadow custom-card'>
        <Card.Body className='d-flex flex-column justify-content-center align-items-center gap-2 pointer-event'>
          <img src={smImg} alt="" />
          <Card.Title>Sm</Card.Title>
        </Card.Body>
      </Card>

      <Card  onClick={navigateNext} style={{ width: '18rem', padding: '20px', cursor: 'pointer' ,border:'0'}} className='card shadow custom-card'>
        <Card.Body className='d-flex flex-column justify-content-center align-items-center gap-2 pointer-event'>
          <img style={{width:'50px'}} src={DeitImG} alt="" />
          <Card.Title>Diet</Card.Title>
        </Card.Body>
      </Card>
      <Card  onClick={navigateNext} style={{ width: '18rem', padding: '20px', cursor: 'pointer' ,border:'0'}} className='card shadow custom-card'>
        <Card.Body className='d-flex flex-column justify-content-center align-items-center gap-2 pointer-event'>
          <img src={moreImg} alt="" />
          <Card.Title>More</Card.Title>
        </Card.Body>
      </Card>
    </div>

    


  )
}

export default Todo
