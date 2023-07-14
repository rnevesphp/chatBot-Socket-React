import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import './App.css'

// import { NativeBaseProvider, Box } from 'native-base';

const socket = io('http://localhost:3000');

function App() {

  // variables / atributos
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [mensaje, setMessages] = useState([]);

  // 
  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));

    socket.on('chatUser', (info) => {
      setMessages(mensaje => [...mensaje, info])
    })

    return () => {
      socket.off('connect')
      socket.off('chatUser')
    }
  }, [])

  // function to send messages
  const sendMessage = () => {
    socket.emit('chatUser', {
      user: socket.id,
      message: newMessage
    })
  }

  return (
    <>
      <div>
        <div className='card-title'>
          <h2>CHAT <span className={isConnected ? 'true' : 'false'}> {isConnected ? 'CONECTADO' : 'NO CONECTADO'}</span> </h2>

          <div className='text'>
            <input onChange={e => setNewMessage(e.target.value)} type="text" />
            <button onClick={sendMessage} >Enviar</button>
          </div>

          <div className='block-message'>
            {mensaje.map(mensaje => (
              <li>{mensaje.user}:<br />{mensaje.message}</li>
            ))}

          </div>
        </div>
      </div>

    </>
  )
}

export default App
