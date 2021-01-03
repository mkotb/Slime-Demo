<script>
    import { onDestroy, onMount } from "svelte";

    export var allowNext = false;
    export let open;
    export let focused = false;

    const isMac = window.navigator.platform.indexOf("Mac") >= 0;
    const beginningKey = isMac ? "CMD" : "CTRL";
    const beginningKeyName = isMac ? "meta" : "control";

    const header = !open ?
        "Let's get started! To begin, try sticking this window on top by pressing the following keys:" : 
        "To close the window, either enter the (same) key combination below, or click the X on your popped up window.";
    const footer = !open ? 
        "Nice! Let's see how to close this window" :
        "Voila! Press the arrow to continue";

    var ctrlHeld = false;
    var shiftHeld = false;
    var pHeld = false;
    var showHint = false;

    function onKey(event, down) {
        switch(event.key.toLowerCase()) {
            case beginningKeyName:
                ctrlHeld = down;
                break;
            case "shift":
                shiftHeld = down;
                break;
            case "p":
                pHeld = down;
                
                // usually something captures the combo, so we do not receive the up event
                if (down) {
                    resetP();

                    if (ctrlHeld && shiftHeld && !allowNext) {
                        showHint = true;
                    }
                }
                break;
        }
    }

    function onStick() {
        if (!focused) {
            return;
        }

        pHeld = true;
        allowNext = true;

        resetP();
    }

    function resetP() {
        setTimeout(() => {
            pHeld = false;
        }, 1000);
    }

    document.addEventListener("keydown", (event) => onKey(event, true));
    document.addEventListener("keyup", (event) => onKey(event, false));

    onMount(() => {
        slimeIntegration.stickListeners.push(onStick);
    });

    onDestroy(() => {
        const index = slimeIntegration.stickListeners.indexOf(onStick);

        if (index > -1) {
            slimeIntegration.stickListeners.splice(index, 1);
        }
    })
</script>

<div class="page">
    <h1>
        {header}
    </h1>

    <span class="instructions">
        <span class:hidden={!ctrlHeld}>
            {beginningKey} + 
        </span>

        <span class:hidden={!(ctrlHeld && shiftHeld)}>
            SHIFT + 
        </span>

        <span class:hidden={!(ctrlHeld && shiftHeld && pHeld)}>
            P
        </span>
    </span>

    {#if showHint}
        <span class="hint">
            Not working? Make sure the chrome extension is installed, and that
            the command is configured as {beginningKey} + SHIFT + P on
            this config panel: <br/>

            <pre>chrome://extensions/configureCommands</pre>
        </span>
    {/if}

    {#if allowNext}
        <span class="next">
            {footer}
        </span>
    {/if}
</div>

<style>
    h1 {
        margin-top: 10vh;
        max-width: 85vw;
    }

    .instructions {
        margin-top: 15vh;
        font-size: 10vw;
    }

    .hidden {
        opacity: 0.5;
    }

    .hint {
        font-weight: 200;
        font-size: 1.5vh;
        margin-top: 5vh;
        max-width: 75vw;
    }

    .next {
        margin-top: 10vh;
        font-size: 5vh;
        max-width: 85vw;
    }
</style>