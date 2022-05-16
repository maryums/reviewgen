import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Form from './components/Form'
import Responses from './components/Responses'
import Footer from './components/Footer'


const App = () => {

  const [formData, setFormData] = useState(
    {
      request: "",
      reply: "",
      clothing: "",
      fit: "",
      quality: "",
      wouldRecommend: false,
      isQuick: false
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
      <main>
        <Form
          saveRequests={saveRequests}
          formData={formData}
          setFormData={setFormData}
        />
        <Responses
          setRequests={setRequests}
          requests={requests}
        />
      </main>
      <Footer />
    </div>
  )
}

export default App