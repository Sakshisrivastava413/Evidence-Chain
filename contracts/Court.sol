pragma solidity ^0.4.24;

contract Court
{
    struct Evidence{
        string description;
        string fileHash; // ipfs file hash to access the evidence media file
        address owner; // the person who is uploading the evidence (one of either firstParty or the secondParty)
        // string evidenceId;
        string evidenceType; // 'documentary' / 'audio' / 'video'
        uint timestamp; // uploaded to blockchain time
        string createdDateTime; // 'ISO datetime string, tells evidence creation true time reported by party'
    }

    struct Case {
        string courtId;
        string firstParty;
        string secondParty;
        string judge;
        string caseId;
        string caseDescription;
        mapping(uint => Evidence) evidences; // evidence[evidenceNum] = someEvidence
        uint totalEvidences; // length of evidences
        string startDateTime;
        bool initialised;
    }

    mapping(string => Case) cases; // cases[caseId] = someCase;

    constructor() public { }

    function registerCase(
        string _courtId,
        string _firstParty,
        string _secondParty,
        string _judge,
        string _caseId,
        string _caseDescription,
        string _startDateTime
    ) public {
        cases[_caseId] = Case({
            courtId: _courtId,
            firstParty: _firstParty,
            secondParty: _secondParty,
            judge: _judge,
            caseId: _caseId,
            caseDescription: _caseDescription,
            totalEvidences: 0,
            startDateTime: _startDateTime,
            initialised: true
        });
    }

    function registerEvidence(
        string _caseId,
        string _description,
        string _fileHash,
        string _evidenceType,
        string _createdDateTime
    ) public {
        // require(
        //     msg.sender == cases[_caseId].firstParty || msg.sender == cases[_caseId].secondParty,
        //     "You must be either of parties to register an evidence"
        // );
        Case storage contextCase = cases[_caseId];
        Evidence memory newEvidence = Evidence({
            description: _description,
            fileHash: _fileHash,
            owner: msg.sender,
            evidenceType: _evidenceType,
            createdDateTime: _createdDateTime,
            timestamp: now
        });
        contextCase.evidences[contextCase.totalEvidences + 1] = newEvidence;
    }

    function getCaseById(
        string caseId
    ) view external returns (string, string, string, uint) {
        require(cases[caseId].initialised, "No such case exists!");
        Case memory reqcase = cases[caseId];
        return (
            reqcase.courtId,
            reqcase.caseDescription,
            reqcase.startDateTime,
            reqcase.totalEvidences
        );
    }

    function getEvidenceById(
        string caseId,
        uint evidenceId
    ) view external returns (string, string, string, string) {
        Evidence memory evd = cases[caseId].evidences[evidenceId];
        return (
            evd.description,
            evd.fileHash,
            evd.evidenceType,
            evd.createdDateTime
        );
    }

    // function registerDetective() public returns (address) {
    //     players.push(msg.sender);
    //     return detective;
    // }

    // function registerForensic() public returns (address) {
    //     players.push(msg.sender);
    //     return forensic;
    // }

    // function getEvidence(uint _id) public view returns(string, uint, string, address, uint) {
    //     Evidence memory evd = evds[_id];
    //     return (
    //         evd.description,
    //         evd.caseNumber,
    //         evd.hash,
    //         evd.owner,
    //         evd.timestamp
    //     );
    // }

}
