import * as React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import WineCard from '../../components/wineCard';
import { useLocalStorage } from 'react-use';

const dummyPrice = 20000

function PosPage() {

    const [wine, setWine] = useLocalStorage('wine', 'Latte')

    let [wineTitles, setWineTitles] = React.useState([])
    let [subMenu, setSubMenu] = React.useState('reds')
    let [cart, setCart] = useLocalStorage('cart',[])

    function addToCard(wine) {
        cart.push(wine)
        console.table(cart)
        setCart([...cart])
    }


    React.useEffect(() => {
            let items = []

            fetch(`https://api.sampleapis.com/wines/${subMenu}`)
                .then(res => res.json())
                .then((wines) => {
                    for (let i = 0; i < wines.length; i++) {
                        
                        items.push(
                            <WineCard
                                key={i}
                                image={wines[i].image}
                                title={wines[i].wine}
                                description={wines[i].winery}
                                price={dummyPrice}
                                handleClick={()=> {addToCard(wines[i]) }}
                            />
                        )       
                    }    
                setWineTitles(items)
            })
    },[subMenu])

    return <Container>
        <h1>POS</h1>
        <ButtonGroup aria-label="Basic Example">
            <Button variant="secondary" onClick={() => {setSubMenu('reds')}}>Red Wine</Button>
            <Button variant="secondary" onClick={() => {setSubMenu('whites')}}>White Wine</Button>
        </ButtonGroup>
        <Row>
            <Col>
                <Row>
                    {wineTitles}
                </Row>
            </Col>
            <Col sm={3}>
                <h2>Cart {wine}</h2>
                {cart.map((item, i) => {
                    return <Row key={i}>
                        <Col>{item.wine}</Col>
                        <Col>{dummyPrice}</Col>
                    </Row>
                })}
                <Row>
                    Total: {cart.length * dummyPrice} Baht
                </Row>
            </Col>
        </Row>
    </Container>
}

export default PosPage