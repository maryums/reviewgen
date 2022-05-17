import React, { useState, useEffect } from 'react'
import Nav from './components/Nav'
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

    <>
      <Nav />
      <div className="bg-slate-50 py-12">
        <div className='container mx-auto bg-slate-50 px-3'>
          <Header />
          <main className='bg-slate-50'>
            <div className='grid w-full max-w-screen-lg grid-cols-1 gap-12 md:grid-cols-4 lg:grid-cols-4'>
              <Form
                saveRequests={saveRequests}
                formData={formData}
                setFormData={setFormData}
              />

              <Responses
                setRequests={setRequests}
                requests={requests}
              />
            </div>
          </main>


          <Footer />

        </div>
      </div>
    </>

  )
}

export default App