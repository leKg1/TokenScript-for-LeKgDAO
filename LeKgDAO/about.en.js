//<![CDATA[
class Token {

    constructor(tokenInstance) {
        this.props = tokenInstance;
        this.setConfirm();
    }

    setConfirm() {
        window.onConfirm = function() {
            window.close();
        }
    }

    render() {
        let message = "Here the token info";
        const name = this.props.name;
        const symbol = this.props.symbol;
        const decimals = this.props.decimals;
        if(name == null) {
            message = "No info found for this token";
            window.onConfirm = function() { window.close() };
        } else {
            message = "name: " + name + " " + "symbol: " + symbol + " " + "decimals: " + decimals;
        }
        return`
        <div class="ui container">
          <div class="ui segment">         
            <span><bold><h1>Welcome to the DAO-erc20 token</h1></bold></span><br /><br />
            <span><bold><h3>${message}</h3></bold></span>
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
