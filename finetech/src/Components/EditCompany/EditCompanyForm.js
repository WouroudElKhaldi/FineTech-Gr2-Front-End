import React, { useState } from 'react'
import style from './EditCompanyForm.module.css'
import { IoClose } from "react-icons/io5"
import { Button } from '../Button/Button.js'

const EditCompanyForm = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        closeModal()
    }

    const handleFromClear = (e) => {
        e.preventDefault()
        const form = e.target.form
        const inputFields = form.querySelector('.inputStyle')
        inputFields.forEach((input) => {
            input.value = ''
        })
    }

    return (
        <>
            <button onClick={openModal}>Open Modal</button>
            {isModalOpen &&
                (
                    <section className={style.modalOverlay}>
                        <form className={style.editForm} onSubmit={handleFormSubmit}>
                            <section className={style.editFormHeader}>
                                <h1 className={style.editFormTitle}>Edit Company Info</h1>
                                <IoClose className={style.closeIcon} onClick={closeModal} />
                            </section>
                            <section className={style.editFormInputs}>
                                <div className={style.inputGroup}>
                                    <label for='name' className={style.labelStyle} >Name</label>
                                    <input name='name' type='text' id='name' className={style.inputStyle} />
                                </div>
                                <div className={style.inputGroup}>
                                    <label for='capital' className={style.labelStyle} >Capital</label>
                                    <input name='capital' type='text' id='capital' className={style.inputStyle} />
                                </div>
                                <div className={style.inputGroup}>
                                    <label for='editedCapital' className={style.labelStyle} >Edited Capital</label>
                                    <input name='editedCapital' type='text' id='editedCapital' className={style.inputStyle} />
                                </div>
                                <div className={style.inputGroup}>
                                    <label for='address' className={style.labelStyle} >Address</label>
                                    <input name='address' type='text' id='address' className={style.inputStyle} />
                                </div>
                            </section>
                            <section className={style.formSubmit}>
                                <Button type='submit' color='blue' size='small' text='Add' />
                                {/* The clear button is not working */}
                                <Button type='button' color='gray' size='small' text='Clear' onClick={handleFromClear} />
                            </section>
                        </form>
                    </section>
                )
            }
        </>
    )
}

export default EditCompanyForm