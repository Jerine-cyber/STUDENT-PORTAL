import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGamepad } from 'react-icons/fa'; // Added icon for the header

// --- Game Constants ---
const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const INITIAL_DIRECTION = { x: 0, y: 1 };
const BASE_SPEED = 250;
const SPEED_DECREMENT = 5;
const MIN_SPEED = 50;
// --- End Game Constants ---

const GamesPage = () => {
  const navigate = useNavigate();
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const [gameSpeed, setGameSpeed] = useState(BASE_SPEED);

  // 1. Load High Score from Local Storage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // 2. Update High Score on Game Over
  useEffect(() => {
    if (isGameOver && score > highScore) {
      setHighScore(score);
      localStorage.setItem('snakeHighScore', score);
      setIsNewHighScore(true);
    } else {
      setIsNewHighScore(false);
    }
  }, [isGameOver, score, highScore]);

  // 3. Handle speed increase when score changes
  useEffect(() => {
    if (score > 0) {
      setGameSpeed(Math.max(BASE_SPEED - score * SPEED_DECREMENT, MIN_SPEED));
    } else {
        setGameSpeed(BASE_SPEED);
    }
  }, [score]);

  // Collision detection utility
  const isSnakeColliding = (head, body) => {
    return body.some(segment => segment.x === head.x && segment.y === head.y);
  };

  // Food generation utility (memoized)
  const generateFood = React.useCallback((currentSnake) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (isSnakeColliding(newFood, currentSnake));
    setFood(newFood);
  }, []);

  // 4. Keyboard Input Handler
  useEffect(() => {
    if (isGameOver) return;

    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, isGameOver]);

  // 5. Game Loop (Movement and Logic)
  useEffect(() => {
    if (isGameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const newSnake = [...prevSnake];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

        // Check for border collision or self-collision
        if (
          head.x < 0 || head.x >= BOARD_SIZE ||
          head.y < 0 || head.y >= BOARD_SIZE ||
          isSnakeColliding(head, newSnake.slice(1)) 
        ) {
          setIsGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head); // Add new head

        // Check for food consumption
        if (head.x === food.x && head.y === food.y) {
          setScore(prevScore => prevScore + 1);
          generateFood(newSnake);
        } else {
          newSnake.pop(); // Remove tail if no food consumed
        }

        return newSnake;
      });
    };

    const gameTick = setInterval(moveSnake, gameSpeed);

    return () => clearInterval(gameTick); // Cleanup
  }, [isGameOver, direction, food, gameSpeed, generateFood]);

  // 6. Reset Game Function
  const initializeGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setIsGameOver(false);
    setScore(0);
    setGameSpeed(BASE_SPEED);
    setIsNewHighScore(false);
  };

  // 7. Render Function for Grid Cells
  const renderCell = (x, y) => {
    const isSnake = snake.some(segment => segment.x === x && segment.y === y);
    const isFood = food.x === x && food.y === y;
    const isHead = snake[0].x === x && snake[0].y === y && !isGameOver;

    let cellClass = 'bg-gray-800';
    if (isHead) {
        cellClass = 'bg-indigo-500 rounded-sm shadow-xl'; // Snake head
    } else if (isSnake) {
      cellClass = 'bg-green-500 rounded-sm transition-transform duration-100 shadow-lg';
    } else if (isFood) {
      cellClass = 'bg-red-500 rounded-full transform scale-125 shadow-xl';
    } else {
        cellClass += ' hover:bg-gray-700 transition-colors duration-100';
    }

    return (
      <div
        key={`${x}-${y}`}
        className={`w-full h-full ${cellClass}`}
      />
    );
  };

  return (
    <div className="relative min-h-screen p-6 overflow-hidden font-sans text-white sm:p-10 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950">
      
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute bg-blue-500 rounded-full top-1/4 left-1/4 w-80 h-80 mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute bg-purple-500 rounded-full top-1/2 right-1/4 w-96 h-96 mix-blend-multiply filter blur-xl opacity-30"></div>
        <div className="absolute bg-pink-500 rounded-full bottom-1/4 left-1/3 w-72 h-72 mix-blend-multiply filter blur-xl opacity-30"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg p-8 mx-auto transition-transform duration-300 bg-white border border-white bg-opacity-10 border-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-3d-dark">
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 mr-4 text-white transition-colors duration-200 rounded-full hover:text-gray-200 hover:bg-white hover:bg-opacity-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="flex items-center text-3xl font-extrabold text-white sm:text-4xl">
            <FaGamepad className="mr-3 text-pink-400" /> Snake Game 🐍
          </h1>
        </div>
        
        {/* Game Info and Control Panel */}
        <div className="flex items-center justify-between p-4 mb-6 bg-white shadow-inner bg-opacity-10 rounded-xl">
          <h3 className="text-xl font-bold text-white">Score: <span className="text-yellow-400">{score}</span></h3>
          <h3 className="text-xl font-bold text-white">High Score: <span className="text-blue-400">{highScore}</span></h3>
          
          {(isGameOver || score === 0) && (
            <button
              onClick={initializeGame}
              className={`px-4 py-2 font-semibold text-white transition-colors rounded-md shadow-lg ${isGameOver ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
            >
              {isGameOver ? 'Play Again' : 'Start Game'}
            </button>
          )}
        </div>

        {/* Game Board / Game Over Screen */}
        {isGameOver ? (
          <div className="p-12 mt-10 text-center bg-gray-800 border-4 border-red-500 shadow-xl rounded-xl">
            <h2 className="text-4xl font-black text-red-400">GAME OVER! 💔</h2>
            <p className="mt-4 text-2xl text-gray-300">Final Score: <span className="font-bold text-yellow-300">{score}</span></p>
            {isNewHighScore && (
              <p className="mt-2 text-3xl font-black text-lime-400 animate-pulse">🎉 NEW HIGH SCORE! 🎉</p>
            )}
            <p className="mt-4 text-sm text-gray-400">Use arrow keys or WASD to control the snake.</p>
          </div>
        ) : (
          <div
            className="grid overflow-hidden border-4 border-gray-700 rounded-lg shadow-2xl"
            style={{ gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`, gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`, aspectRatio: '1 / 1' }}
          >
            {/* Render the cells */}
            {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
              const x = index % BOARD_SIZE;
              const y = Math.floor(index / BOARD_SIZE);
              return renderCell(x, y);
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default GamesPage;