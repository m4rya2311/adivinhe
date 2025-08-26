const { useState, useEffect } = React;

const EMOJIS = ['🎮', '🎯', '🎲', '🎪', '🎨', '🎭', '🎵', '⭐', '🔥', '💎', '🚀', '🌈'];

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
    const shuffledEmojis = shuffleArray(EMOJIS.concat(EMOJIS)); // Duplicar para formar os pares
    const shuffledCards = shuffledEmojis.map((emoji, index) => ({
      id: index,
      emoji,
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

      if (firstCard.emoji === secondCard.emoji) {
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
      <h1>Jogo da Memória</h1>
      <p>Movimentos: {moves} | Pares: {matches}</p>
      <div className="grid">
        {cards.map(card => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? 'flipped' : ''}`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="emoji">{card.isFlipped || card.isMatched ? card.emoji : '❓'}</div>
            <div className="back">❓</div>
          </div>
        ))}
      </div>
      {matches === EMOJIS.length && <h2>Parabéns! Você ganhou!</h2>}
    </div>
  );
}

ReactDOM.render(<MemoryGame />, document.getElementById('root'));

