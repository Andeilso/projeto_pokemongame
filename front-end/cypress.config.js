const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e:{
        baseUrl: "http://localhost:5500",
        setupNodeEvents(on, config){
            // implemente observadores de eventos node aqui
        },
    },
});