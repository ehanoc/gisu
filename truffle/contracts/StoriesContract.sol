pragma solidity  ^0.4.19;

contract StoriesContract {

  struct StoryNode {
    uint id;
    string title;
    string body;
    address owner;
    mapping(uint => StoryNode) childNodes;
  }

  // story id maps to start node
  mapping(uint => StoryNode) stories;

  // total nr of stories
  uint nr_stories;

  /**
  *
  *
  *
  */
  function createStory(string title, string body) public payable {
    require(msg.value > 0);

    StoryNode memory newNode = StoryNode(nr_stories, title, body, msg.sender);

    stories[newNode.id] = newNode;

    nr_stories++;
  }
}
