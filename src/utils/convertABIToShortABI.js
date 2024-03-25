import {ethers} from "ethers";

export default function convertABIToShortABI(abi){
    return new ethers.Interface(abi).format();
}
