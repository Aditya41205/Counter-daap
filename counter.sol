// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;


//contract address =0x3bc803a51068b7e0c4d3c613ab15e2da28eaa74d
contract calculator{
    uint256 public a;
    

    function sum(uint256 _a)public{
    a=_a+10;
    }

    function returna() public  view returns(uint256){
        return a ;
    }


}