let slimeIntegration = {
    stickListeners: []
};

slimeIntegration.onStick = function () {
    slimeIntegration.stickListeners.forEach(listener => {
        listener();
    });
}