import React, {useState, useContext, useEffect} from 'react'
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);
    const { addContact, current, clearCurrent, updateContact} = contactContext;

    useEffect(()=> {
      if(current !== null){
        setContact(current);
      }else{
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        });
      }
  

    },[contactContext, current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const onChange = e => {
        setContact({...contact, [e.target.name]:e.target.value});
    }

    const onSubmit = e => {
        e.preventDefault();
        if(current === null){
          
            addContact({...contact, name,email,phone,type});
        }else{
            updateContact(contact);
        }
      clearAll();
    }
   

    const clearAll = ()=> {
        clearCurrent();
    }
    const { name, email, phone, type } = contact;
  return (
    <form onSubmit={onSubmit}>
         <h2 className="text-primary">{current? 'Edit Contact': 'Add contact'}</h2>
         <input type="text" name='name' placeholder='name' value={name} onChange={onChange}/>
         <input type="text" name='email' placeholder='email' value={email} onChange={onChange}/>
         <input type="text" name='phone' placeholder='phone' value={phone} onChange={onChange}/>
         <h3>Contact Type</h3>
         <input type="radio" name="type" value='personal' checked={type === 'personal'} onChange={onChange}/>Personal {' '}
         <input type="radio" name="type" value='professional' checked={type === 'professional'} onChange={onChange}/>Professional
         <div>
            <input type="submit" value={current? 'Update Contact': 'Add contact'} className='btn btn-primary btn-block' />
         </div>
         {current && <div ><button className='btn btn-light btn-block' onClick={clearAll}>Clear contact</button></div>}
    </form>
  )
}

export default ContactForm