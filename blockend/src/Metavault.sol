// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Ownable {
    address public owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Ownable: caller is not the owner");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}

contract MapCoinVault is Ownable {
    uint256 public constant INITIAL_SUPPLY = 500;
    uint256 public constant INITIAL_TOKEN_BALANCE = 30;
    uint256 public constant TOKEN_DEDUCTED = 5;
    address payable ownerAddress;

    struct UserInfo {
        string username;
        string email;
        string phoneNumber;
        string profileImgUrl;
        string about;
        bool access;
        uint256 tokenBalance;
    }

    struct FileMetaData {
        string file_name;
        string file_url;
        string file_type;
        uint256 upload_timestamp;
        string description;
    }

    struct Access {
        address user; 
        bool access; // true or false
    }

    struct Commuinity{
        string username;
        string content;
        string profileImage;
        address account;
        uint256 timestamp;

    }

    mapping(address => UserInfo) public users;
    mapping(address => FileMetaData[]) public userImages;
    Commuinity[] private chats;

    // Access mapping 
    mapping(address => mapping(address => bool)) ownership;
    mapping(address => Access[]) accessList;
    mapping(address => mapping(address => bool)) previousData;

    event TokensMinted(address indexed user, uint256 amount);
    event TokensBurned(address indexed user, uint256 amount);
    event TransactionDetailsStored(
        uint256 blockNumber,
        bytes32 blockHash,
        uint256 gasUsed,
        uint256 gasPrice,
        uint256 timestamp,
        address sender
    );

    string public name = "MapCoin";
    string public symbol = "MAP";

    constructor() {
        _mint(msg.sender, INITIAL_SUPPLY);
        ownerAddress = payable(msg.sender);
    }

    function _mint(address _account, uint256 _amount) internal {
        require(_account != address(0), "ERC20: mint to the zero address");
        users[_account].tokenBalance += _amount;
        emit TokensMinted(_account, _amount);
    }

    function _burn(address _account, uint256 _amount) internal {
        require(_account != address(0), "ERC20: burn from the zero address");
        require(users[_account].tokenBalance >= _amount, "ERC20: burn amount exceeds balance");
        users[_account].tokenBalance -= _amount;
        emit TokensBurned(_account, _amount);
    }

      function logTransactionDetails() public {
        emit TransactionDetailsStored(
            block.number,
            blockhash(block.number - 1),
            gasleft(),
            tx.gasprice,
            block.timestamp,
            msg.sender
        );
    }

    function addUser(
        string memory _username,
        string memory _email,
        string memory _phoneNumber,
        address _account,
        string memory _profileImgUrl,
        string memory _about,
        bool _access
    ) external {
        require(!isUserRegistered(_account), "User is already registered");
        UserInfo memory newUser;
        newUser.username = _username;
        newUser.profileImgUrl = _profileImgUrl;
        newUser.about = _about;
        newUser.access = _access;
        newUser.email = _email;
        newUser.phoneNumber = _phoneNumber;

        users[_account] = newUser;
        mintTokensForUser(_account, INITIAL_TOKEN_BALANCE);
        logTransactionDetails();
    }

    function addUserImage(
        string memory _file_name,
        string memory _file_url,
        string memory _file_type,
        uint256 _upload_timestamp,
        string memory _description
    ) external {
        UserInfo storage user = users[msg.sender];
        require(user.tokenBalance >= TOKEN_DEDUCTED, "Insufficient balance");

        userImages[msg.sender].push(FileMetaData(
            _file_name,
            _file_url,
            _file_type,
            _upload_timestamp,
            _description
        ));
    logTransactionDetails();
        _burn(msg.sender, TOKEN_DEDUCTED);

    }

    function mintTokensForUser(address _user, uint256 _amount) internal {
        _mint(_user, _amount);
    }

    function isUserRegistered(address _userAddress) public view returns (bool) {
        UserInfo storage user = users[_userAddress];
        return bytes(user.username).length > 0; 
    }

    function getUser(address _userAddress) external view returns (
        string memory username,
        string memory profileImgUrl,
        string memory email,
        string memory phoneNumber,
        string memory about,
        bool access,
        uint256 tokenBalance
    ) {
        UserInfo memory user = users[_userAddress];

        return (
            user.username,
            user.profileImgUrl,
            user.email,
            user.phoneNumber,
            user.about,
            user.access,
            user.tokenBalance
        );
    }

    function getUserFiles(address _userAddress) external view returns (FileMetaData[] memory) {
        require(_userAddress == msg.sender || ownership[_userAddress][msg.sender], "You don't have access");
        return userImages[_userAddress];
    }

    function deleteFileByAttributes(
        string memory _file_name,
        string memory _file_url
    ) external {
        FileMetaData[] storage userFiles = userImages[msg.sender];
        for (uint256 i = 0; i < userFiles.length; i++) {
            if (
                keccak256(bytes(userFiles[i].file_name)) == keccak256(bytes(_file_name)) &&
                keccak256(bytes(userFiles[i].file_url)) == keccak256(bytes(_file_url))
            ) {
                delete userImages[msg.sender][i];
                return;
            }
        }
        revert("File not found");
    }

    // Payment Integration 
    function mintTokensWithSubscription_0_0001Ether() external payable {
        require(msg.value == 100000000000000, "Ether amount must be 0.0001");
        address sender = msg.sender;
        ownerAddress.transfer(msg.value); 
        mintTokensForUser(sender, 30);
        logTransactionDetails();
    }

    function mintTokensWithSubscription_0_001Ether() external payable {
        require(msg.value == 1000000000000000, "Ether amount must be 0.001");
        address sender = msg.sender;
        ownerAddress.transfer(msg.value); 
        mintTokensForUser(sender, 60);
        logTransactionDetails();
    }

    function mintTokensWithSubscription_0_01Ether() external payable {
        require(msg.value == 10000000000000000, "Ether amount must be 0.01");
        address sender = msg.sender;
        ownerAddress.transfer(msg.value); 
        mintTokensForUser(sender, 100);
        logTransactionDetails();
    }

    // Access functions 

    function allow(address user) external {
        ownership[msg.sender][user] = true; 
        if (previousData[msg.sender][user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true; 
                }
            }
        } else {
            accessList[msg.sender].push(Access(user, true));  
            previousData[msg.sender][user] = true;  
        }
    }

    function disallow(address user) public {
        ownership[msg.sender][user] = false;
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) { 
                accessList[msg.sender][i].access = false;  
            }
        }
    }

    function shareAccess() public view returns (Access[] memory) {
        return accessList[msg.sender];
    }

    //community
      
    function addChat(string memory _username, string memory _url ,string memory _content) public {
        
        Commuinity memory newChat = Commuinity({
            username: _username,
            content: _content,
            profileImage:_url,
            account: msg.sender,
            timestamp: block.timestamp
        });

      
        chats.push(newChat);

       
    }

    
    function getAllChats() public view returns (Commuinity[] memory) {
        return chats;
    }
}
