import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Responses from './components/Responses'
import Header from './components/Header'


const App = () => {


  const [inputText, setInputText] = useState('')
  const [inputReply, setInputReply] = useState('')
  const [formData, setFormData] = useState(
    {
      clothing: "",
      fit: "",
      wouldRecommend: false,
    }
  )
  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("requests");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  })

  console.log(requests)

  useEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests))
  }, [requests])


  const saveRequests = newRequest => {
    setRequests([newRequest, ...requests])
  }

  return (
    <div className="container px-3 mx-auto">
      <Header />
      <Form
        saveRequests={saveRequests}
        setInputText={setInputText}
        setInputReply={setInputReply}
        setFormData={setFormData}
        inputText={inputText}
        inputReply={inputReply}
        formData={formData}
      />

      <Responses
        setRequests={setRequests}
        requests={requests}

      />
    </div>
  )
}

export default App