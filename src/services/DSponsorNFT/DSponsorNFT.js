import {ethers} from "ethers";

import getTotalSupply from "./methods/getTotalSupply.js";
import getMaxSupply from "./methods/getMaxSupply.js";
import ChainNetwork from "../../primitives/ChainNetwork/ChainNetwork.js";
import generatePrivateKey from "../../utils/generatePrivateKey.js";
import getTokenURI from "./methods/getTokenURI.js";
import getTokenURIs from "./methods/getTokenURIs.js";
import approve from "./methods/approve.js";
import getAds from "./methods/getAds.js";
import getApproved from "./methods/getApproved.js";
import getBalanceOf from "./methods/getBalanceOf.js";
import getIsApprovedForAll from "./methods/getIsApprovedForAll.js";
import getName from "./methods/getName.js";
import getOwnerAddress from "./methods/getOwnerAddress.js";
import getOwnerOf from "./methods/getOwnerOf.js";
import getSymbol from "./methods/getSymbol.js";
import mint from "./methods/mint.js";
import safeTransferFrom from "./methods/safeTransferFrom.js";
import setApprovalForAll from "./methods/setApprovalForAll.js";
import setBaseURI from "./methods/setBaseURI.js";
import setContractURI from "./methods/setContractURI.js";
import supportsInterface from "./methods/supportsInterface.js";
import transferFrom from "./methods/transferFrom.js";
import transferOwnership from "./methods/transferOwnership.js";
import {ApolloClient, InMemoryCache} from "@apollo/client";

const APIURL = 'https://api.studio.thegraph.com/proxy/65744/dsponsor-mumbai/0.0.4/'

class DSponsorNFT {
    constructor({address, signer, chain} = {}) {
        this.chain = new ChainNetwork(chain);

        this.signer = (signer) ? signer : new ethers.Wallet(generatePrivateKey(), this.chain.provider);

        this.address = address

        this.contract = new ethers.Contract(
            this.address,
            [
                'error AddressEmptyCode(address target)',
                'error AddressInsufficientBalance(address account)',
                'error AlreadyMinted(uint256 tokenId)',
                'error AmountValueTooLow(uint256 value)',
                'error CannotBeZeroAddress()',
                'error ERC2981InvalidDefaultRoyalty(uint256 numerator, uint256 denominator)',
                'error ERC2981InvalidDefaultRoyaltyReceiver(address receiver)',
                'error ERC2981InvalidTokenRoyalty(uint256 tokenId, uint256 numerator, uint256 denominator)',
                'error ERC2981InvalidTokenRoyaltyReceiver(uint256 tokenId, address receiver)',
                'error ERC721IncorrectOwner(address sender, uint256 tokenId, address owner)',
                'error ERC721InsufficientApproval(address operator, uint256 tokenId)',
                'error ERC721InvalidApprover(address approver)',
                'error ERC721InvalidOperator(address operator)',
                'error ERC721InvalidOwner(address owner)',
                'error ERC721InvalidReceiver(address receiver)',
                'error ERC721InvalidSender(address sender)',
                'error ERC721NonexistentToken(uint256 tokenId)',
                'error FailedInnerCall()',
                'error ForbiddenCurrency(address currency)',
                'error InvalidInitialization()',
                'error InvalidInputLengths()',
                'error InvalidPricingStructure(address[] currencies, uint256[] prices)',
                'error MaxSupplyExceeded()',
                'error MaxSupplyShouldBeGreaterThan0()',
                'error NotInitializing()',
                'error OwnableInvalidOwner(address owner)',
                'error OwnableUnauthorizedAccount(address account)',
                'error ReentrancyGuardReentrantCall()',
                'error SafeERC20FailedOperation(address token)',
                'error TokenNotAllowed(uint256 tokenId)',
                'error UnauthorizedToMint()',
                'event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)',
                'event ApprovalForAll(address indexed owner, address indexed operator, bool approved)',
                'event ContractURIUpdated()',
                'event Initialized(uint64 version)',
                'event Mint(uint256 tokenId, address indexed from, address indexed to, address indexed currency, uint256 amount, string tokenData)',
                'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
                'event TokensAllowlist(bool indexed allowed)',
                'event TokensAllowlistUpdated(uint256 tokenId, bool indexed allowed)',
                'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
                'event UpdateDefaultMintPrice(address indexed currency, bool indexed enabled, uint256 indexed amount)',
                'event UpdateMintPrice(uint256 tokenId, address indexed currency, bool indexed enabled, uint256 indexed amount)',
                'event UpdateUser(uint256 indexed tokenId, address indexed user, uint256 expires)',
                'function MAX_SUPPLY() view returns (uint256)',
                'function MINTER() view returns (address)',
                'function applyTokensAllowlist() view returns (bool)',
                'function approve(address to, uint256 tokenId)',
                'function balanceOf(address owner) view returns (uint256)',
                'function baseURI() view returns (string)',
                'function contractURI() view returns (string)',
                'function getApproved(uint256 tokenId) view returns (address)',
                'function getMintPrice(uint256 tokenId, address currency) view returns (bool enabled, uint256 amount)',
                'function getOwner() view returns (address)',
                'function initialize((string name, string symbol, string baseURI, string contractURI, address minter, uint256 maxSupply, address forwarder, address initialOwner, uint96 royaltyBps, address[] currencies, uint256[] prices, uint256[] allowedTokenIds) params)',
                'function isApprovedForAll(address owner, address operator) view returns (bool)',
                'function isTrustedForwarder(address forwarder) view returns (bool)',
                'function mint(uint256 tokenId, address to, address currency, string tokenData) payable',
                'function mintFromData(address to, address currency, string tokenData) payable',
                'function name() view returns (string)',
                'function owner() view returns (address)',
                'function ownerOf(uint256 tokenId) view returns (address)',
                'function renounceOwnership()',
                'function royaltyInfo(uint256 tokenId, uint256 salePrice) view returns (address, uint256)',
                'function safeTransferFrom(address from, address to, uint256 tokenId)',
                'function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)',
                'function setApprovalForAll(address operator, bool approved)',
                'function setBaseURI(string _baseURI)',
                'function setContractURI(string _contractURI)',
                'function setDefaultMintPrice(address currency, bool enabled, uint256 amount)',
                'function setMintPrice(uint256 tokenId, address currency, bool enabled, uint256 amount)',
                'function setRoyalty(address receiver, uint96 feeBps)',
                'function setTokenURI(uint256 tokenId, string _tokenURI)',
                'function setTokensAllowlist(bool _applyTokensAllowlist)',
                'function setTokensAreAllowed(uint256[] tokenIds, bool[] allowed)',
                'function setTrustedForwarder(address forwarder)',
                'function setUser(uint256 tokenId, address user, uint64 expires)',
                'function supportsInterface(bytes4 interfaceId) view returns (bool)',
                'function symbol() view returns (string)',
                'function tokenIdIsAllowedToMint(uint256 tokenId) view returns (bool)',
                'function tokenURI(uint256 tokenId) view returns (string)',
                'function tokenURIs(uint256) view returns (string)',
                'function totalSupply() view returns (uint256)',
                'function transferFrom(address from, address to, uint256 tokenId)',
                'function transferOwnership(address newOwner)',
                'function trustedForwarder() view returns (address)',
                'function userExpires(uint256 tokenId) view returns (uint256)',
                'function userOf(uint256 tokenId) view returns (address)'
            ],
            this.signer
        )

        this.client = new ApolloClient({
            uri: APIURL,
            cache: new InMemoryCache(),
        });
    }
}

DSponsorNFT.prototype.approve = approve;
DSponsorNFT.prototype.getAds = getAds;
DSponsorNFT.prototype.getApproved = getApproved;
DSponsorNFT.prototype.getBalanceOf = getBalanceOf;
DSponsorNFT.prototype.getIsApprovedForAll = getIsApprovedForAll;
DSponsorNFT.prototype.getMaxSupply = getMaxSupply;
DSponsorNFT.prototype.getName = getName;
DSponsorNFT.prototype.getOwnerAddress = getOwnerAddress;
DSponsorNFT.prototype.getOwnerOf = getOwnerOf;
DSponsorNFT.prototype.getSymbol = getSymbol;
DSponsorNFT.prototype.getTokenURI = getTokenURI;
DSponsorNFT.prototype.getTokenURIs = getTokenURIs;
DSponsorNFT.prototype.getTotalSupply = getTotalSupply;
DSponsorNFT.prototype.mint = mint;
DSponsorNFT.prototype.safeTransferFrom = safeTransferFrom;
DSponsorNFT.prototype.setApprovalForAll = setApprovalForAll;
DSponsorNFT.prototype.setBaseURI = setBaseURI;
DSponsorNFT.prototype.setContractURI = setContractURI;
DSponsorNFT.prototype.supportsInterface = supportsInterface;
DSponsorNFT.prototype.transferFrom = transferFrom;
DSponsorNFT.prototype.transferOwnership = transferOwnership;
export default DSponsorNFT;
