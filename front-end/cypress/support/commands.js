
// Exemplo de montagem de comando personalizado do Cypress
// Cypress.Commands.add( nome_do_comando , ( parametros_opcional ) => {
    // lógica do comando
// })

Cypress.Commands.add('verificarCartaoJogador', (usuarioEsperado) => {
    cy.getAllLocalStorage().then( $localstorage => {
        const cartaoJogador = JSON.parse($localstorage["http://localhost:5500"].cartaoJogador);
        
        expect( cartaoJogador ).to.deep.equal(usuarioEsperado);
    })
})
