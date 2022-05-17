import React from 'react'

const Header = () => {
    return (
        <header className='mb-6 border-b pb-6'>

            <span className='m-0 block text-center'> 👕 👖🧥👗</span>
            <h1 className="text-center text-2xl font-bold text-pink-700">
                myWardrobe Review Generator
            </h1>

            <div className="mt-5 font-light">
                If you love online shopping, you know that reviews are key when you are finally ready to pull the trigger! We always intend to leave a review, but sometimes it feels like there's just no time. Enter OpenAI. In a few clicks, generate a review you feel confident with and help other shoppers in their pursuit to find the best fit!
            </div>

        </header>
    )
}

export default Header