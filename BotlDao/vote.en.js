//<![CDATA[
class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance;
    }

    render() {

        return`
        <div class="ui container">
          <div class="ui segment">         
            <span><bold><h1>Let's vote!</h1></bold></span>
          </div>
          <div id="inputBox">
              <bold><h3>Please enter the proposal id</h3></bold>
              <span><input id="proposalId" type="number" placeholder="proposal id..."></span>
    
              <bold><h3>Please provide your vote</h3></bold>
              <span><input id="vote" type="number" placeholder="vote..."></span>
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
