<script>
    import { onMount } from "svelte";

    export let allowNext = false;
    let video;

    onMount(() => {
        video.play();

        slimeIntegration.onResize = function () {
            allowNext = true;
        };
    })
</script>

<div class="page">
    <h1>Let's test your knowledge 😉 Stick this tab on top and try resizing it</h1>

    <video class="video" bind:this={video} muted loop>
        <source src="assets/demo.mp4" type="video/mp4">
    </video>

    {#if allowNext}
        <h1>Nice! Now when you're ready, click the arrow below to continue.</h1>
    {/if}
</div>

<style>
    h1 {
        margin-top: 10vh;
    }

    .video {
        height: 40vh;
        width: 76vh;
        clip-path: inset(10px 0px 10px 0px);
        margin-top: 10vh;
    }

    h1 {
        margin-top: 10vh;
    }
</style>