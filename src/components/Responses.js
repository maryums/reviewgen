import React from 'react'
import Response from './Response'

const Responses = ({ requests, setRequests }) => {
    return (
        <div>

            {requests.length > 1 &&
                <h1 className="mt-6 text-2xl">Responses</h1>
            }

            <div>
                {requests.map(item => (
                    <Response
                        setRequests={setRequests}
                        key={item.id}
                        request={item}
                        requests={requests}
                    />
                ))}
            </div>

        </div>
    )
}

export default Responses