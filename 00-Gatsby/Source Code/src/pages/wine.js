import * as React from 'react'

const wineImage = {
    borderRadius: "5%",
    width: '5rem'
}

const coffeeMenu = {
    borderRadius: "25px",
    width: "40rem",
    overflow: "hidden",
    background: "#774360",
    marginBottom: "2rem",
    padding: "1rem"
}
const coffeeDetails = {
    marginLeft: "9rem",
    background: "#774360",
    color: "#E7AB79"
}

//Fetch the data from the other page 
export default function Wine(){
    /*
    1. Fetch from https://api.sampleapis.com/coffee/hot
    2. Transform into JSX
    */

   let items = []
   let [wineTitles, setWineTitles] = React.useState([])

   React.useEffect(async () => {  
        let res = await fetch('https://api.sampleapis.com/wines/reds')
        let wines = await res.json()
        for (let i=0; i<wines.length;i++) {
            console.log(wines[i].title)
            items.push(
                <div style ={coffeeMenu}>
                    <div style={{ width: "8rem",  float: "left"}}>
                        <img style={wineImage} src={wines[i].image}/>
                    </div>

                    <div style={coffeeDetails}>
                        <h3> {wines[i].winery}</h3> - {wines[i].wine} 
                    </div>
                </div>
            )
                
        }
        setWineTitles(items)
   },[])
   
    return (
        <body style={{backgroundColor: "#4C3A51"}}>
            <div style={{marginLeft: "4rem"}}>
                    <h1 style={{color: "#B25068"}}>Red Wines</h1>
                    <main>
                        {wineTitles}
                    </main>
            </div>
        </body>
    )
}