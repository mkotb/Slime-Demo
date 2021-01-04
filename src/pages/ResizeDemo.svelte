<script>
    import { onMount } from "svelte";

    export let allowNext = false;
    let needHelp = false;
    let video;

    onMount(() => {
        video.play();

        slimeIntegration.onResize = function () {
            allowNext = true;
        };

        setTimeout(() => {
            needHelp = true;
        }, 5000);
    });

    const isMac = window.navigator.platform.indexOf("Mac") >= 0;
    const beginningKey = isMac ? "CMD" : "CTRL";
</script>

<div class="page">
    <h1>Let's test your knowledge 😉 Stick this tab on top and try resizing it</h1>

    <video class="video" bind:this={video} muted loop>
        <source src="assets/demo.mp4" type="video/mp4">
    </video>

    {#if allowNext}
        <h1>Nice! Now when you're ready, click the arrow below to continue.</h1>
    {:else if needHelp}
        <p>Need help?</p>
        <p>
            Here's a hint: You can stick this tab on top either by clicking the
            extension icon on your top toolbar, or use the {beginningKey} + SHIFT + Y hotkey.
        </p>
    {/if}
</div>

<style>
    h1 {
        margin-top: 10vh;
    }

    .video {
        height: 40vh;
        width: 76vh;
        clip-path: inset(2vh 0px 1.5vh 0px);
        margin-top: 10vh;
        margin-bottom: 5vh;
    }

    h1 {
        margin-top: 5vh;
    }

    p {
        font-weight: 200;
        font-size: 2rem;
        max-width: 80vw;
    }
</style>