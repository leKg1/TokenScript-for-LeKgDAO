//<![CDATA[
class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance;
    }

    render() {
        let message = "Approve someone to use your tokens!";
        return`
        <div class="ui container">
          <div class="ui segment">
          
            <span><bold><h3>${message}</h3></bold></span>
            <input id="approvalAddress" type="text">
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
