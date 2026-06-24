const { performance } = require('perf_hooks');

const WIN_LINES = [
  [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];
const ADJACENCY = {
  0:[1,3,4],1:[0,2,4],2:[1,4,5],3:[0,4,6],4:[0,1,2,3,5,6,7,8],5:[2,4,8],6:[3,4,7],7:[4,6,8],8:[4,5,7]
};
const opponentOf = (p) => p === 'X' ? 'O' : 'X';
const lineScore = (line, board, player) => {
  const values = line.map(i=>board[i]);
  const own = values.filter(c=>c===player).length;
  const opp = values.filter(c=>c && c!==player).length;
  if (own>0 && opp>0) return 0;
  if (own===0 && opp===0) return 1;
  if (own>0) return own*own*4;
  return -(opp*opp*5);
};
const checkWinner = (board) => {
  for (const line of WIN_LINES) {
    const [a,b,c]=line;
    if (board[a] && board[a]===board[b] && board[a]===board[c]) return board[a];
  }
  return null;
};
const getLegalMoves = (snapshot, player=snapshot.currentPlayer) => {
  if (snapshot.phase === 'finished') return [];
  const { board } = snapshot;
  if (snapshot.phase === 'placement') {
    if (snapshot.piecesInHand[player] <= 0) return [];
    return board.map((cell,index)=>(cell===null?{from:null,to:index}:null)).filter(m=>m!==null);
  }
  const moves=[];
  board.forEach((cell,index)=>{ if(cell!==player) return; for(const next of ADJACENCY[index]){ if(board[next]===null) moves.push({from:index,to:next}); }});
  return moves;
};
const cloneBoard = (board)=>[...board];
const applyMove = (snapshot, move) => {
  const legal = getLegalMoves(snapshot, snapshot.currentPlayer);
  if (!legal.some(m=>m.from===move.from && m.to===move.to)) return snapshot;
  const board = cloneBoard(snapshot.board);
  const player = snapshot.currentPlayer;
  const piecesInHand = {...snapshot.piecesInHand};
  if (move.from===null) { board[move.to]=player; piecesInHand[player] -=1; }
  else { board[move.from]=null; board[move.to]=player; }
  const winner = checkWinner(board);
  const phase = winner ? 'finished' : (piecesInHand.X===0 && piecesInHand.O===0 ? 'movement' : 'placement');
  const nextPlayer = winner ? player : opponentOf(player);
  const nextSnapshot = { board, currentPlayer: nextPlayer, phase, piecesInHand, winner, isDraw:false, moveHistory:[] };
  if (!winner && phase==='movement' && getLegalMoves(nextSnapshot,nextPlayer).length===0) {
    return {...nextSnapshot, phase:'finished', isDraw:true};
  }
  return nextSnapshot;
};
const serializeSnapshot = (snapshot) => snapshot.board.map(c=>c??'_').join('')+'|'+snapshot.currentPlayer+'|'+snapshot.phase+'|'+snapshot.piecesInHand.X+'|'+snapshot.piecesInHand.O;
const evaluateSnapshot = (snapshot, aiPlayer) => {
  if (snapshot.winner === aiPlayer) return 1000;
  if (snapshot.winner && snapshot.winner !== aiPlayer) return -1000;
  if (snapshot.isDraw) return 0;
  const opponent = opponentOf(aiPlayer);
  const lineHeuristic = WIN_LINES.reduce((acc,line)=>acc+lineScore(line,snapshot.board,aiPlayer),0);
  const aiMobility = getLegalMoves(snapshot, aiPlayer).length;
  const oppMobility = getLegalMoves(snapshot, opponent).length;
  const mobility = (aiMobility - oppMobility) * (snapshot.phase==='movement'?2:1);
  return lineHeuristic + mobility;
};
const isTerminal = (snapshot) => snapshot.phase === 'finished' || snapshot.winner !== null;
const minimaxCore = (snapshot, aiPlayer, depth, maximizing, alpha, beta, options, transposition, startTime) => {
  if (options.timeLimitMs && performance.now() - startTime >= options.timeLimitMs) {
    return { score: evaluateSnapshot(snapshot, aiPlayer), move: null };
  }
  if (depth === 0 || isTerminal(snapshot)) {
    return { score: evaluateSnapshot(snapshot, aiPlayer), move: null };
  }
  const key = serializeSnapshot(snapshot);
  const cached = transposition.get(key);
  if (cached && cached.depth >= depth) return { score: cached.score, move: null };
  const legalMoves = getLegalMoves(snapshot, snapshot.currentPlayer);
  if (legalMoves.length === 0) return { score: evaluateSnapshot(snapshot, aiPlayer), move: null };
  let bestMove = null;
  let bestScore = maximizing ? -Infinity : Infinity;
  for (const move of legalMoves) {
    const nextSnapshot = applyMove(snapshot, move);
    const result = minimaxCore(nextSnapshot, aiPlayer, depth-1, !maximizing, alpha, beta, options, transposition, startTime);
    if (maximizing) {
      if (result.score > bestScore) { bestScore = result.score; bestMove = move; }
      alpha = Math.max(alpha, bestScore);
    } else {
      if (result.score < bestScore) { bestScore = result.score; bestMove = move; }
      beta = Math.min(beta, bestScore);
    }
    if (options.useAlphaBeta && beta <= alpha) break;
  }
  transposition.set(key, { depth, score: bestScore });
  return { score: bestScore, move: bestMove };
};
const pickBestMove = (snapshot, aiPlayer, options) => {
  const maximizing = snapshot.currentPlayer === aiPlayer;
  const transposition = new Map();
  const startTime = performance.now();
  if (!options.useAlphaBeta) {
    return minimaxCore(snapshot, aiPlayer, options.maxDepth, maximizing, -Infinity, Infinity, options, transposition, startTime).move;
  }
  let bestMove = null;
  for (let depth=1; depth<=options.maxDepth; depth++) {
    const result = minimaxCore(snapshot, aiPlayer, depth, maximizing, -Infinity, Infinity, options, transposition, startTime);
    if (result.move) bestMove = result.move;
    if (options.timeLimitMs && performance.now() - startTime >= options.timeLimitMs) break;
  }
  return bestMove;
};
const pickMediumMove = (snapshot, aiPlayer) => pickBestMove(snapshot, aiPlayer, { maxDepth: 3, useAlphaBeta: false });
const pickHardMove = (snapshot, aiPlayer) => pickBestMove(snapshot, aiPlayer, { maxDepth: 7, useAlphaBeta: true, timeLimitMs: 450 });
const initial = { board:Array(9).fill(null), currentPlayer:'X', phase:'placement', piecesInHand:{X:3,O:3}, winner:null, isDraw:false, moveHistory:[] };
const trials = 30;
const runTest = (label, fn) => {
  const start = performance.now();
  for (let i=0;i<trials;i++) { fn(initial); }
  const end = performance.now();
  return (end-start)/trials;
};
console.log('Average medium move time (ms):', runTest('medium', snap=>{ pickMediumMove(snap, 'X'); }).toFixed(2));
console.log('Average hard move time (ms):', runTest('hard', snap=>{ pickHardMove(snap, 'X'); }).toFixed(2));
