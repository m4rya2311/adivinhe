const { useState, useEffect } = React;

// Substitua estas URLs pelas URLs das suas imagens ou use caminhos locais
const IMAGES = [
  'https://via.placeholder.com/150?text=Foto1', // Imagem 1
  'https://via.placeholder.com/150?text=Foto2', // Imagem 2
  'https://via.placeholder.com/150?text=Foto3', // Imagem 3
  'https://via.placeholder.com/150?text=Foto4', // Imagem 4
  'https://via.placeholder.com/150?text=Foto5', // Imagem 5
  'https://via.placeholder.com/150?text=Foto6', // Imagem 6
  'https://via.placeholder.com/150?text=Foto7', // Imagem 7
  'https://via.placeholder.com/150?text=Foto8', // Imagem 8
  'https://via.placeholder.com/150?text=Foto9', // Imagem 9
  'https://via.placeholder.com/150?text=Foto10', // Imagem 10
  'https://via.placeholder.com/150?text=Foto11', // Imagem 11
  'https://via.placeholder.com/150?text=Foto12', // Imagem 12
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);

  const initializeGame = () => {
    const shuffledImages = shuffleArray(IMAGES.concat(IMAGES)); // Duplicar para formar os pares
    const shuffledCards = shuffledImages.map((image, index) => ({
      id: index,
      image,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (id) => {
    if (flippedCards.length === 2) return;

    const newCards = [...cards];
    const cardIndex = newCards.findIndex(card => card.id === id);
    
    if (newCards[cardIndex].isFlipped || newCards[cardIndex].isMatched) return;

    newCards[cardIndex].isFlipped = true;
    setFlippedCards(prev => [...prev, id]);
    setCards(newCards);
    setMoves(prev => prev + 1);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard = cards.find(card => card.id === firstId);
      const secondCard = cards.find(card => card.id === secondId);

      if (firstCard.image === secondCard.image) {
        const newCards = [...cards];
        newCards[firstId].isMatched = true;
        newCards[secondId].isMatched = true;
        setCards(newCards);
        setMatches(prev => prev + 1);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstId].isFlipped = false;
          newCards[secondId].isFlipped = false;
          setCards(newCards);
        }, 1000);
      }

      setFlippedCards([]);
    }
  }, [flippedCards, cards]);

  return (
    <div>
      <h1>Jogo da Memória com Imagens</h1>
      <p>Movimentos: {moves} | Pares: {matches}</p>
      <div className="grid">
        {cards.map(card => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <img src={card.isFlipped || card.isMatched ? card.image : 'https://via.placeholder.com/150'} alt="Carta" />
            <div className="back">❓</div>
          </div>
        ))}
      </div>
      {matches === IMAGES.length && <h2>Parabéns! Você ganhou!</h2>}
    </div>
  );
}

ReactDOM.render(<MemoryGame />, document.getElementById('root'));
