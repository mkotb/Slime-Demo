<script>
    export let allowNext;
</script>

<div class={allowNext ? "visible" : "hidden"}>
    <button on:click>
        <img src="./assets/down-arrow.svg" alt="Arrow to next page">
    </button>
</div>

<style>
    div {
        position: fixed;
        bottom: 0;
        width: 100%;
    }

    button {
        padding-bottom: 1vh;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-name: bounce;
        animation-timing-function: ease;
        cursor: pointer;
        background-color: transparent;
        border: none;
    }

    img {
        width: 4vh;
        height: 4vh;
    }

    @keyframes bounce {
        0%   { transform: translateY(0); }
        30%  { transform: translateY(-3vh); }
        50%  { transform: translateY(0); }
        100% { transform: translateY(0); }
    }

    .visible {
        visibility: visible;
        opacity: 1;
        transition: opacity 1s linear;
    }

    .hidden {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s 1s, opacity 1s linear;
    }
</style>