contract Voting {
    struct Candidate {
        string name;
        uint32 votes;
    }

    Candidate[] candidates;
    mapping (string => bool) candidateNames;

    function addCandidate(string name) public {
        require(!candidateNames[name]);
        candidates.push(Candidate(name, 0));
        candidateNames[name] = true;
    }
    
    function candidatesCount() view public returns (uint32) {
        return uint32(candidates.length);
    }

     function getCandidate(uint32 index) view public returns (string) {
        return candidates[index].name;
    }
