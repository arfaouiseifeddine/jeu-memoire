import './App.css';
import Shape from './shape.js';
import {useState , useEffect} from "react";
import {shuffle} from'lodash';

function App() {
  const [cards,setCards]= useState ( shuffle ( [...Shape,...Shape]));
  const [clicks,setClicks] = useState(0);
  const [won,setWon] = useState(false);
  const [activeCards,setActiveCards] = useState([]);
  const [foundPairs,setFoundPairs] = useState([]);
  const [timer,setTime] = useState(0);

  var time;
  useEffect(()=>{
    time = setInterval(() => {
      setTime(timer+1);
    }, 1000)
    return () => clearInterval(time);
  });
  
 
  function flipCard(index) {
    if (won) {
      setCards(shuffle([...Shape, ...Shape]));
      setFoundPairs([]);
      setWon(false);
      setClicks(0);
      setTime(0);
      
      
    }
    
    if (activeCards.length === 0) {
      setActiveCards([index]);
    }
    if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondsIndex = index;
      if (cards[firstIndex] === cards[secondsIndex]) {
        if (foundPairs.length + 2 === cards.length) {
          setWon(true);
        }
        setFoundPairs( [...foundPairs, firstIndex, secondsIndex] );
      }
      setActiveCards([...activeCards, index]);
    }
    if (activeCards.length === 2) {
      setActiveCards([index]);
      
    }
    setClicks(clicks + 1);
    
  }

  return (
    <div>
      <div className="board">
        {cards.map((card,index) => {
          const flippedToFront =  (activeCards.indexOf(index) !== -1) || foundPairs.indexOf(index) !== -1;
          return (
            <div className={"card-outer " + (flippedToFront ? 'flipped' : '')}
                 onClick={() => flipCard(index)}>
              <div className="card">
                <div className="front">
                  <img src={card} alt=""/>
                </div>
                <div className="back" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="stats" >
        {won && (
          <>Gagner!<br />
            Cliquer n'import card pour commencer noveau jeu.<br /><br />
          </>
        )}
        Clicks: {clicks} ; Found pairs:{foundPairs.length/2} ; time : {timer}
      </div>
    </div>
  );
}
export default App;
