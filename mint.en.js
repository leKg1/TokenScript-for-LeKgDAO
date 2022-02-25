//<![CDATA[
class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance;
        // this.setConfirm();
    }

    // setConfirm() {
    //     window.onConfirm = function() {
    //         window.close();
    //     }
    // }

    render() {

        return`
        <div class="ui container">
          <div class="ui segment">         
            <span><bold><h1>Let's mint some token!</h1></bold></span>
          </div>
          <div id="inputBox">
              <bold><h3>Please enter the receiver address</h3></bold>
              <span><input id="receiverAddress" type="text" placeholder="receiver address..."></span>
    
              <bold><h3>Please provide the amount to Mint</h3></bold>
              <span><input id="mintAmount" type="number" placeholder="amount to mint..."></span>
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
