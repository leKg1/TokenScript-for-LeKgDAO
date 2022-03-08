//<![CDATA[
class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance;
    }

    render() {

        return`
        <div class="ui container">
          <div class="ui segment">         
            <span><bold><h1>Create a new project proposal</h1></bold></span>
          </div>
          <div id="inputBox">    
              <bold><h3>Please enter the project name</h3></bold>
              <span><input id="proposalName" type="text" placeholder="project name..."></span>

                  <bold><h3>Please enter the amount of bottles</h3></bold>
                  <span><input id="amountBotls" type="number" placeholder="bottles amount..."></span>
                  <bold><h3>Please enter your position latitude</h3></bold>
                  <span><input id="geoPosLat" type="number" placeholder="latitude..."></span>
                  <bold><h3>Please enter your position longitude</h3></bold>
                  <span><input id="geoPosLong" type="number" placeholder="longitude..."></span>
          </div>
        </div>
`;
    }
}

web3.tokens.dataChanged = (oldTokens, updatedTokens, tokenIdCard) => {
    const currentTokenInstance = web3.tokens.data.currentInstance;
    document.getElementById(tokenIdCard).innerHTML = new Token(currentTokenInstance).render();
};
//]]>
