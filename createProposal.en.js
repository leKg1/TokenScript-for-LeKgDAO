//<![CDATA[
class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance;
    }

    render() {

        return`
        <div class="ui container">
          <div class="ui segment">         
            <span><bold><h1>Create a new proposal</h1></bold></span>
          </div>
          <div id="inputBox">    
              <bold><h3>Please enter your proposal</h3></bold>
              <span><input id="proposalName" type="text" placeholder="new proposal..."></span>
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
