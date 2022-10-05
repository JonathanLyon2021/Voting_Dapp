contract Voting {
    struct Candidate {
        string name;
        uint32 votes;
    }

    Candidate[] candidates;
    mapping (string => bool) candidateNames;

    
