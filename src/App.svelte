<script>
    import Introduction from './pages/Introduction.svelte';
    import Next from './components/Next.svelte';
    import KeyDemo from './pages/KeyDemo.svelte';
    import ResizeDemo from './pages/ResizeDemo.svelte';
    import Complete from './pages/Complete.svelte';
    import { onMount } from 'svelte';

    let allowNext;
    let currPage = 0;

    let pages = [
        {id: 'intro', component: Introduction, props: {}},
        {id: 'demo-key-open', component: KeyDemo, props: { open: false }},
        {id: 'demo-close', component: KeyDemo, props: { open: true }},
        {id: 'resize-demo', component: ResizeDemo, props: {}},
        {id: 'complete', component: Complete, props: {}}
    ];

    function onNextClick() {
        allowNext = false;
        currPage++;
    }

    onMount(() => {
        window.addEventListener('wheel', (e) => {
            if (allowNext && e.deltaY > 2) {
                onNextClick();
            }
        });
    });
</script>

<main>
    {#each pages as page, i (page.id)}
        <section class={i < currPage ? "hidden-top" : (i > currPage ? "hidden-bottom" : "visible")}
            aria-hidden={i !== currPage}>
            {#if i == currPage}
                <svelte:component bind:allowNext focused={i == currPage} this={page.component} {...page.props} />
            {:else}
                <svelte:component focused={i == currPage} this={page.component} {...page.props} />
            {/if}
        </section>
    {/each}

    <Next
        allowNext={allowNext && currPage < pages.length - 1}
        on:click={onNextClick} />

    <footer>
        Made by <a tabindex="-1" href="https://github.com/mkotb/">Mazen Kotb</a> with ❤️ on <a tabindex="-1"href="https://github.com/mkotb/Slime-Demo">GitHub</a>
    </footer>
</main>

<style>
	main {
		text-align: center;
        margin: 0 auto;
        width: 100vw;
        height: 100vh;
    }

    .hidden-top {
        position: absolute;
        transform: translateY(-100%);
        transition: transform 0.5s linear;
    }

    .visible {
        position: absolute;
        transform: translateY(0%);
        transition: transform 0.5s linear;
    }

    .hidden-bottom {
        position: absolute;
        transform: translateY(100%);
    }

    footer {
        position: fixed;
        bottom: 10;
        left: 10;
        opacity: 0.6;
    }
    
    :global(.page) {
        width: 100vw;
        height: 100vh;
        background-color: #2ecc71;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>