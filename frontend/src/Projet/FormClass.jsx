import React, { useState } from 'react';
import items from './form';
import NavBar from './NavBar'
import Modal from 'react-modal';
import formM from './formMeat'
import options from './option';
import Swal from "sweetalert2";
import Footer from './Footer';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';



function FormClass() {
  const { user } = useAuthContext()

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemsMeat, setSelectedItemsMeat] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showMe, setShowMe] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [modalLogin, setModalLogin] = useState(false);
  // const [userName, setUserName] = useState('');
  // const [userEmail, setUserEmail] = useState('');
  const [userNumberPhone, setUserNumberPhone] = useState('');
  const [userAdress, setUserAdress] = useState('');

  // const [showMeAgain, setShowMeAgain] = useState(false);






  function sendEmail(e) {
    e.preventDefault()
    const itemsToSend = selectedItems.concat(selectedItemsMeat, selectedOption);
    const emailBody = itemsToSend.map((item) => item.name).join(', ');

    const templateParams = {
      to_email: 'imrantafawi4@gmail.com',
      from_name: `form ${user.name}`,
      from_email: `form ${user.email}`,
      from_number_phone: `form ${userNumberPhone}`,
      from_adress: `form ${userAdress}`,
      subject: 'Selected Items',
      body: emailBody,
    };

    if (userAdress === '' || userNumberPhone === '') {
      Swal.fire({
        title: "Please check your informations",
        icon: "warning",
        timer: 5000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
    else {
      emailjs.send(
        'service_w0ga2i9',
        'template_5tur44x',
        templateParams,
        'GUfISAYGHcv6uWh5N' // Replace with your user ID from EmailJS
      )
        .then((response) => {
          console.log('Email sent successfully!', response);
        })
        .catch((error) => {
          console.error('Error sending email:', error);
        });
      Swal.fire({
        title: "Thanks For Your Commande",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
      // window.location.reload()
    }

  }







  const handleCheckboxChange = (event) => {
    const itemId = parseInt(event.target.value);
    const item = items.find((item) => item.id === itemId);
    const isSelected = event.target.checked;
    if (isSelected) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((i) => i.id !== itemId)
      );
    }
  };
  const handleCheckboxChangeMeat = (event) => {
    const itemId = parseInt(event.target.value);
    const item = formM.find((item) => item.id === itemId);
    const isSelected = event.target.checked;
    if (isSelected) {
      setSelectedItemsMeat((prevSelectedItems) => [...prevSelectedItems, item]);
    } else {
      setSelectedItemsMeat((prevSelectedItems) =>
        prevSelectedItems.filter((i) => i.id !== itemId)
      );
    }
  };

  function handleSelectChange(event) {
    const selectedOption = event.target.value;
    const selected = options.find((option) => option.value === selectedOption);
    setSelectedOption(selectedOption);
    setSelectedImage(selected.image);
  }

  function handleButtonClick(e) {
    e.preventDefault()
    if (selectedOption === "" && selectedItems.length === 0) {
      Swal.fire({
        title: "Please Select Something",
        icon: "warning",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    } else {
      setModalIsOpen(true);
    }
  }
  const open = () => {
    setShowMe(true);
  };

  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  const handleModalCloseLogin = () => {
    setModalLogin(false);
  };

  function handleDeleteAll() {
    setSelectedOption(0);
  }
  function isLogin(e) {
    e.preventDefault()
    setModalLogin(true);
  }

  return (
    <div>

      <div className='formClass'>
        <NavBar />
        <div className="type">
          <h1>Please choose a type of <span className='spn1'>Cous</span><span>Cous</span>  </h1>
          <a href="#cous"> <button className='btn1' onClick={open} >Vegetables CousCous</button></a>
          <a href="#tfaya"><button className='btn2'>CousCous T-faya</button></a>
          <a href="#tfaya"><button className='btn3'>Customize Your Own CousCous</button></a>

        </div><br /><br /><br />
        {showMe ? (
          <div className='choose-form'>
            <div className='title-cous'>


              <h1> Vegetables <span className='spn1'>Cous</span><span>Cous</span></h1>
              <br />
              <center>
                <div className='hr'>
                  <hr />
                </div>
              </center>


              <div className='vegetables-form'>
                <div className="vegetables">
                  <a name="cous"></a>
                  <form>
                    <h4>Choose CousCous Type</h4>
                    <select value={selectedOption} onChange={handleSelectChange}>
                      <option value="">Select an option</option>
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <br /><br />
                    <hr />
                    <hr />                    <br />
                    <h4>Choose The Type Of Meat </h4>
                    {
                      formM.map((frm) =>
                        <div key={frm.id}>
                          <input disabled={!selectedOption} onChange={handleCheckboxChangeMeat} value={frm.id} type="checkbox" id={frm.label} /><label htmlFor={frm.label}>{frm.label} <strong>{frm.arabName}</strong></label><br />
                        </div>
                      )
                    }
                    <br />
                    <hr /><br />
                    <h4>Choose Vegetables</h4>
                    {items.map((item) => (
                      <div key={item.id}>
                        <input
                          type="checkbox"
                          value={item.id}
                          onChange={handleCheckboxChange}
                          disabled={!selectedOption}

                        />
                        <label htmlFor={item.label}>{item.label} <strong>{item.arabName}</strong></label>

                      </div>
                    ))}
                    <br />

                    {/* ------------------------Save-All--------------------------- */}
                    <button className='btn1' onClick={handleButtonClick}>Send</button>
                    {/* ------------------------Delete-All--------------------------- */}
                    <button className='btn2' onClick={handleDeleteAll}>Delete All</button>
                  </form>
                </div>
                <img className='vegeta-img' src="../image/kasriya.png" alt="" />

                {selectedImage && <img className='vegeta-img' src={selectedImage} alt={selectedOption} />}

                {formM.map((item, i) =>
                  selectedItemsMeat.some((selectedItem) => selectedItem.id === item.id) && (
                    <img key={i} className='vegeta-img' width={"105px"} src={item.image} alt={item.name} />
                  )

                )}
                {items.map((item, i) =>

                  selectedItems.some((selectedItem) => selectedItem.id === item.id) && (
                    <img key={i} className='vegeta-img' width={"105px"} src={item.image} alt={item.name} />
                  )


                )}
              </div>
              {/* {selectedItems.length > 0 && (
              <div>
                <h2>Selected Items</h2>
                <ul>
                  {selectedItems.map((item) => (
                    <li key={item.id}>{item.label}</li>
                  ))}
                </ul>
              </div>
            )} */}
            </div>
          </div>
        ) : (
          <p></p>



        )}
      </div>



      {/* //////////////////////////////Modal/////////////////////////// */}

      <Modal isOpen={modalIsOpen} >
        <div className='modal' id="myModal">
          <div className="modal-dialog modal-dialog-centered modal-lg" >
            {/* -----------------------------IMAGE-MODAL---------------------- */}
            <div className="img-modal">

              <img className='img-img-modal' src="../image/kasriya.png" alt="" />
              <img className='img-img-modal' src={selectedImage} alt={selectedOption} />
              {formM.map((item, i) =>
                selectedItemsMeat.some((selectedItem) => selectedItem.id === item.id) && (
                  <img key={i} className='img-img-modal' width={"105px"} src={item.image} alt={item.name} />
                )

              )}
              {items.map((item, i) =>
                selectedItems.some((selectedItem) => selectedItem.id === item.id) && (
                  <img key={i} className='img-img-modal' width={"105px"} src={item.image} alt={item.name} />
                )
              )}

            </div>
            <div class="modal-content">
              <div className='modal-header'>
                <h2 className="modal-title" >Selected <span>Items</span></h2>
              </div>

              <div className="modal-body">

                {/* -----------------------------ITEMS-MODAL---------------------- */}
                <div className="items-modal">
                  <ul>
                    {selectedItems.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                    {selectedItemsMeat.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                    <li>{selectedOption}</li>
                  </ul>
                </div>
              </div>
              <div className="modal-footer">

                <button className="btn2 btn-secondary" data-dismiss="modal" onClick={handleModalClose}>Close</button>
                <button className="btn1 btn-primary" onClick={isLogin}> Send </button>
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={modalLogin}>
          <div className='modal-content'>
            <div className="modal-header">
              <center>
                <h2 className='modal-title'>Please Add Your Informations</h2>
              </center>
            </div>
            <div className="modal-body">
              <form className='formk'>

                <label>User Name</label><br />
                <input
                  type="text"
                  placeholder="Your Name"
                  value={user.name}
                  onChange={() => setUserName(user.name)}
                  readOnly
                /> <br /><br />

                <label>Email</label><br />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={user.email}
                  readOnly
                  onChange={() => setUserEmail(user.email)}
                /> <br /><br />

                <label>Phone Number</label><br />
                <input
                  type="text"
                  placeholder="Your Phone Number"
                  value={userNumberPhone}
                  onChange={(event) => setUserNumberPhone(event.target.value)}
                /> <br /><br />
                <label>Address</label><br />
                <input
                  type="text"
                  placeholder="Your Address"
                  value={userAdress}
                  onChange={(event) => setUserAdress(event.target.value)}
                /> <br /><br />
                <div className="modal-footer">
                  <center>
                    <button onClick={sendEmail} className="btn1 btn-primary"> Submit </button>
                    <button className="btn2 btn-secondary" data-dismiss="modal" onClick={handleModalCloseLogin}>Close</button>
                  </center>
                </div>
              </form>
            </div>
          </div>

        </Modal>
      </Modal>
      <Footer />
    </div>

  );
}

export default FormClass;
