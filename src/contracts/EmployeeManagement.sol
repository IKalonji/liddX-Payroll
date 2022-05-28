// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./chainlink/KeeperCompatible.sol"; 

contract pmCrudCon is KeeperCompatibleInterface{

  struct dataRecord {
    string empName;
    uint empSalary;
    uint empID;
    string empStartDate;
    string empDesignation;
  }
  
  mapping(uint => dataRecord) private dataBase9;
  uint[] private db9Index;


  event LogNewEmp   (string empName,uint empSalary, string empStartDate, uint empID);
  event LogUpdateEmpSal(string empName, uint empSalary);
  event LogDeleteEmp(string empName, uint empIdIndex);
  
  function isEmp(uint empIDck)
    public view
    returns(bool isIndeed) 
  {
    if(db9Index.length == 0) return false;
    return (db9Index[empIDck] == empIDck);
  }

  function insertEmp(
    string memory empName,
    uint empSalary,
    uint    empID
    ) 
    public
  {
    if(isEmp(empID)) revert('duplicate'); 
    dataBase9[empID].empName = empName;
    dataBase9[empID].empSalary   = empSalary;
    emit LogNewEmp(
        dataBase9[empID].empName, 
        dataBase9[empID].empSalary,
        dataBase9[empID].empStartDate,
        empID);
  }
  
  function getEmpData(uint empIDck)
    public view
    returns(string memory empName, uint empSalary)
  {
    if(!isEmp(empIDck)) return('not found',0); 
    return(
      dataBase9[empIDck].empName, 
      dataBase9[empIDck].empSalary);

  } 

  function updateEmpSalary(uint empID, uint newSalary) 
    public
    returns(bool success) 
  {
    if(!isEmp(empID)) revert('not found'); 
    dataBase9[empID].empSalary = newSalary;
    emit LogUpdateEmpSal(
      dataBase9[empID].empName,
      dataBase9[empID].empSalary);
    return true;
  }
  

  function getEmpCount() 
    public view
    returns(uint count, string memory retString)
  {
    return (db9Index.length,'Hello Prithwis - v1.0 ');
  }

function deleteEmp(uint empID) 
    public
  {
    if(!isEmp(empID)) revert('not found'); 
    string storage empNameToDelete = dataBase9[empID].empName;
    uint rowToDelete = dataBase9[empID].empID;
    uint keyToMove = db9Index[db9Index.length-1];
    db9Index[rowToDelete] = keyToMove;
    emit LogDeleteEmp(
      empNameToDelete, 
      rowToDelete);
  }

    function checkUpkeep(bytes calldata checkData ) external view override returns (bool upkeepNeeded, bytes memory /* performData */) {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
        
    }

    function performUpkeep(bytes calldata performData ) external payable override {
        if ((block.timestamp - lastTimeStamp) > interval ) {
            lastTimeStamp = block.timestamp;
            address(this).transfer(dataRecord['empSalary']);
        }
      
    }  

}
