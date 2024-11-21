import React from 'react'

export const SectionFooter = () => {
  return (
    <>
        <section className='bg-orange-500 font-bold'>
            <div className='w-[90%] mx-auto overflow-hidden max-w-screen-xl text-center
            text-white grid gap-6 md:grid-cols-[40%_40%] justify-items-center items-center py-24
            md:justify-between md:items-center md:text-left
            '>
                <h2 className='text-3xl md:text-4xl'>Simplifica tus operaciones y se mas efectivo</h2>
                <a className='inline-block bg-violet-950 text-white px-4 py-4 rounded-full w-max shadow-2xl
                md:mx-0 md:justify-self-end
                ' href="/register">Crea tu cuenta</a>
            </div>
        </section>
    </>
  )
}
