import Home from './routes/Home.svelte';
import Game from './routes/Game.svelte';
import NotFound from './routes/NotFound.svelte';
import CreateParadice from './routes/CreateParadice.svelte';

const routes = {
    '/': Home,
    '/create': CreateParadice,
    '/game/:gameId': Game,
    '*': NotFound
}

export { routes }
