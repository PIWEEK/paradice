import Home from './routes/Home.svelte';
import Game from './routes/Game.svelte';
import HowItWorks from './routes/HowItWorks.svelte';
import Player from './routes/Player.svelte';
import NotFound from './routes/NotFound.svelte';

const routes = {
    '/': Home,
    '/how-it-works': HowItWorks,
    '/player': Player,
    '/game/:id': Game,
    '*': NotFound
}

export { routes }
