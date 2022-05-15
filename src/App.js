import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Responses from './components/Responses'
import Header from './components/Header'


const App = () => {

  const [formData, setFormData] = useState(
    {
      request: "",
      reply: "",
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


        formData={formData}
        setFormData={setFormData}

      // inputReply={inputReply}
      // setInputReply={setInputReply}
      // inputText={inputText}
      // setInputText={setInputText}

      />

      <Responses
        setRequests={setRequests}
        requests={requests}

      />
    </div>
  )
}

export default App