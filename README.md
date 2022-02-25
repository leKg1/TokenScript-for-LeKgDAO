# TokenScript for LeKgDAO erc20 governance token

These instructions will help you create a TokenScript interface for LeKgDAO erc20 governance token.

User interface code and business logic is organised in XML declarations for a TokenScript engine to render in a mobile wallet. E.g. [AlphaWallet](https://alphawallet.com/).


### 1. Deploy Token Contract

* [Remix](remix.ethereum.org) is a convenient way to deploy


### View in AlphaWallet

To see the default rendering of the contract as a fungible token:

* Open AlphaWallet on your mobile
* Tap the `+` in the top-right corner
  * this is required to manually show tokens that you don't have a balance for
  * (alternately, in remix you can use the `mint` function, to give your wallet address some Coin, eg: `wallet_address, 88000000000000000000`)
* Enter your contract address:
  * A convenient way is (from your computer) to open (etherscan)[etherscan.io], paste in your address (then enter). Then click on the little QR icon to the right of the address in the top-left (next to the copy button).
  * Alternately, paste the contract address into any [QR code generator](https://www.cssscript.com/demo/flexible-client-side-qr-code-generator/) (Like TokenScript, this one rendered locally in the browser)
  * Tap the camera on the address field to scan
* Once you've added the contract address (QR code or otherwise), you should see the token card `LeKgDAO (LKD)`, tagged as `Avalanche FUJI C-Chain`


### Generate your own TokenScript

A really good starting point to generating your own TokenScript (for the 2020/03 schema) is available with this [ABI-to-TokenScript tool](https://alphawallet.github.io/ABI-to-TokenScript/):

* Enter the contract address
* From remix, copy the contract abi, and paste it in the ABI-to-TokenScript tool
* Enter a contract name, eg "LeKgDAO"
* Select erc20 
* Finally, select your network (e.g. Ropsten)
* Click `Create your TokenScript!`, and download `LeKgDAO.zip`

Inside you will find:
* A shared.css file
* javascript files of the form <name>.<lang>.js (e.g. for actions: about.en.js, approve.en.js)
* The precursor to your tokenscript file: LeKgDAO.xml
  * Confirm the network e.g. Avalanche FUJI C-Chain `<ts:address network="43113">...contract_address...`
  * Rename this file to LeKgDAO.xml for simplicity
* A Makefile to combine the above files

In the following section we'll combine these files in the xml.


### Combining files and testing

Disclaimer: iOS users can simply airdrop the set of js/css/xml files to their device.

To combine the files you will need at least [xmllint](#xmllint) to combine the files, this will give you an unsigned (.canonicalized.xml) file for testing.
When you want to have the file associated with your domain's SSL key, you will then need [xmlsectool](#xmlsectool-optional-signing) create a signed file (.tsml).

* download/install the xmllint command line tool (See instructions [below](#xmllint))
  * can check with `xmllint --version`
* in terminal, from the project directory, run `make LeKgDAO.canonicalized.xml`
  * this will look for Coin.xml and use xmllint to combine resources into the output file

Congratulations, you can now add `LeKgDAO.canonicalized.xml` TokenScript for use in AlphaWallet!

* Note: Android users will have to ensure "TokenScript Overrides" is turned on in the Settings tab to give access to locally stored xml files.
* Using your tool of choice, copy the file to your device that has AlphaWallet installed
* you can either open the file directly, or manually move it to the AlphaWallet directory
  * eg Android: Internal storage `/AlphaWallet`
* Now in AlphaWallet's Wallet tab, you should see the Coin token card.
* Tapping on the token card will go to the token view, and the row of buttons (or "...") will see additional actions
  * Tap the action to see your action card, enter inputs, then `Confirm` to execute the transaction


## Add your personal note to your token:

* Create a file called hello.en.js.
* Copy the content of about.en.js in this file.
* Change the part inside the rendered div to display your personal message and save it.
* Open the xml file.
* Declare your JavaScript file in the header.
* Copy the Action Card for "about" and paste it into the Card section.
* Modify the content that it loads the hello.en.js file.

## Canonicalize your TokenScript

Now you just need to canonicalize the file it so that you can import it in AlphaWallet.

Thanks to Makefile the canonicalization is easy: Type "make token.canonicalized.xml" in the console while being in the folder with the TokenScript files, with "token" as the name of your token. If your system has all dependencies, you will get a file named "token.canonicalized.xml.TEST". Rename the file into token.canonicalized.xml.