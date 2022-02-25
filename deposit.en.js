//<![CDATA[
class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance;
    }

    render() {

        return`
        <div class="ui container">
          <div class="ui segment">         
            <span><bold><h1>Deposit token</h1></bold></span>
          </div>
          <div id="inputBox">    
              <bold><h3>Please enter the amount to Deposit</h3></bold>
              <span><input id="amountToDeposit" type="number" placeholder="amount to deposit..."></span>
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
