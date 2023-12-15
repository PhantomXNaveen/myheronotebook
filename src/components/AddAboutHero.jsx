import React, { useState } from 'react';
import { dbFirestore } from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import toast from 'react-hot-toast';


function AddAboutHero({heroName, data}) {
    const [text, setText] = useState("");
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            x = collection(dbFirestore, `${localStorage.getItem('uid')}/${heroName}/About`);
            const docRef = await addDoc(x, {
                abouthero: text
            });
            setText("")
            toast.success("Data added successfully");
        }
        catch(e){
            alert("Error adding document");
        }
    }

    

  return (
    <div className='container my-5'>
        <h1>Add about hero</h1>
        <form onSubmit={handleSubmit} className='my-2'>
            <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <button type="submit" className="btn btn-primary my-2">ADD</button>
        </form>
        <h1>{heroName} Data</h1>
        {
            data.map((x)=>{
                return <p key={x.id}>{x.abouthero}</p>
            })
        }
    </div>
  )
}

export default AddAboutHero