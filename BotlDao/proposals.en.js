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
        let message = "Here will be the proposal details";

        const proposals = this.props.proposals;
        if(proposals == undefined) {
            message = "No proposal found for this id";
            // window.onConfirm = function() { window.close() };
        } else {
            message = proposals;
        }
        return`
        <div class="ui container">
          <div class="ui segment">         
            <span><bold><h1>Show proposal</h1></bold></span>
          </div>
          <div id="inputBox">    
              <bold><h3>Please enter the proposal id</h3></bold>
              <span><input id="proposalId" type="number" placeholder="proposal id..."></span>
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
