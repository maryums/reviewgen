import React from 'react'
import Response from './Response'

const Responses = ({ requests, setRequests }) => {
    return (
        <div className='md:col-span-2'>

            {requests.length > 1 &&
                <h1 className="md:mt-6 text-2xl">Responses</h1>
            }

            {requests.map(item => (
                <Response
                    setRequests={setRequests}
                    key={item.id}
                    request={item}
                    requests={requests}
                />
            ))}

        </div>
    )
}

export default Responses