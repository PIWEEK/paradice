import Home from './routes/Home.svelte';
import Game from './routes/Game.svelte';
import HowItWorks from './routes/HowItWorks.svelte';
import Player from './routes/Player.svelte';
import NotFound from './routes/NotFound.svelte';
import CreateParadice from './routes/CreateParadice.svelte';

const routes = {
    '/': Home,
    '/create': CreateParadice,
    '/how-it-works': HowItWorks,
    '/player': Player,
    '/game/:gameId': Game,
    '*': NotFound
}

export { routes }
