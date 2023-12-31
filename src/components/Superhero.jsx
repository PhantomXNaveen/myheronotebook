import React, { useEffect, useState } from 'react';
import '../styles/superhero.css';
import Slider from '../components/slider/Slider'
import toast from 'react-hot-toast';
import AddAboutHero from './AddAboutHero';
import { collection, getDocs } from 'firebase/firestore';
import { dbFirestore } from './firebase';


function Superhero() {
    const [inputName, setInputName] = useState("");
    const [imageUrl, setImageUrl] = useState('https://www.superherodb.com/pictures2/portraits/10/100/85.jpg')
    const [heroName, setName] = useState(null)
    const [powers, setheroPowers] = useState("intelligence: 100, strength: 85, speed: 58, durability: 85, power: 100, combat: 64")

    const AccessToken = '320666043629812'
    const BaseURL = `https://www.superheroapi.com/api.php/${AccessToken}`;

    //*******search by name of superhero******
    const searchByNameFun = (name)=>{
        fetch(`${BaseURL}/search/${name}`).then((res)=>{return res.json()}).then((json)=>{
            showSuperHero(json.results[0])
        }).catch(()=>{
            return alert("Something went to be wrong, please check your network connection")
        })
    }

    //**************search by id of superhero**************
    const searchByIdFun = (id)=>{
        fetch(`${BaseURL}/${id}`).then((res)=>{return res.json()}).then((json)=>{
            showSuperHero(json);
        }).catch(()=>{
            return alert("Something went to be wrong, please check your network connection")
        })
    }
    const getRandomId = ()=>{
        let a = 731
        let idRandom = Number( 1 + (a-1)*Math.random() ).toFixed(0);
        return idRandom
    }
    const handleSearchByIdBtn = ()=>{
        searchByIdFun(getRandomId());
    }

    //show superhero on dom
    const showSuperHero = (json)=>{
        let heroPowerstats = Object.keys(json.powerstats).map((element)=>{
            return `${element}: ${json.powerstats[element]}, `
        })
        setImageUrl(json.image.url);
        setName(json.name);
        setheroPowers(heroPowerstats)
        fetchdataofhero(json.name)
    }
    
    const handleCopyUrl = ()=>{
        navigator.clipboard.writeText(imageUrl);
        toast.success("image url copy successfully")
    }


    //To fetch hero data
    const [data, setData] = useState([])
    const fetchdataofhero = async(heroName)=>{
        const querySnapshot = await getDocs(collection(dbFirestore, `${localStorage.getItem('uid')}/${heroName}/About`));
        let arr = [];
        let i = 0;
        querySnapshot.forEach((doc) => {
            arr[i] = {
              id:doc.id,
              abouthero:doc.data().abouthero
            }
            i++;
          });
          setData(arr) 
    }

    useEffect(()=>{
        fetchdataofhero();
    }, [])
    
  return (
    <div className='mainDiv__superhero'>
         <Slider/>
        <div className="hero__container">
            <input type="text" value={inputName} onChange={(e)=>{setInputName(e.target.value)}} id="inputName" placeholder='Enter name of superhero' />
            <button className='superhero__button' id="searchBynameBtn" onClick={()=>{searchByNameFun(inputName)}}>Search</button>
            <button className='superhero__button' id="searchByIdBtn" onClick={handleSearchByIdBtn}>Get Random superhero</button>
            <button className='superhero__button' id="copyurl" onClick={handleCopyUrl}>Copy image Url</button>
        </div>
        <div id="imgDiv">
            <h1>{heroName}</h1>
            <img src={imageUrl} alt="" width="250px" height="350px" />
            <div className='superhero__powers'>{powers}</div>
        </div>
        {
            localStorage.getItem('token')?<AddAboutHero heroName={heroName} data={data}/>:""
        }
    </div>
  )
}

export default Superhero