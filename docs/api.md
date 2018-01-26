# API

Notes: 
- Nodes can be associated only to one story.
- JavaScript API support promises to chain API calls to improve code quality
- An abstraction on top of API can make things easier to develop and produce better code to read
- Right now we don't need this kind of complexity, for sure it can be reduced avoiding promises since 
  this is a prototype, data will be retrieved locally and it will be fast. For the prototype I think
  I can just get the full JSON and update it too. High payload but this doesn't matter right now. I will
  ensure to use proper abstractions like the ones shown on the example of usage so we can easily plug-in
  the real implementation of the API anytime.
- There is a problem to be thought of, imagine having a Story with 200 nodes, a long one. Right now the Story
  object doesn't know all it's nodes, just the first one. So we will have to sequentially retrieve every node
  in the story. If delay to get one response is, let's say, 50ms, then we have 200*50ms = 10 seconds to load
  the full graph (I am thinking on the story builder)


## Stories API

`GET /stories/` - Get the list of stories

`GET /stories/{id}/` - Get a story

`POST /stories/` - Create a story

`PUT /stories/{id}/` - Modify a story

`DELETE /stories/{id}/` - Delete a story, will delete all the story nodes

Or, as JavaScript:

`Stories.list()`

`Stories.get(id)`

`Stories.create(definition)`

`Stories.modify(id, changes)`

`Stories.delete(id)`

**Story JSON model**

```es6
{
  id: int,
  title: string,
  description: string, // optional
  start_node_id: int
}
```


## Nodes API

`GET /nodes/{id}/` - Get a node

`POST /nodes/` - Create a node

`PUT /nodes/{id}/` - Modify a node

`DELETE /nodes/{id}/` - Delete a node

`POST /nodes/{id}/vote/` - Up vote a node

`DELETE /nodes/{id}/vote/` - Down vote a node (remove's your vote)

Or, as JavaScript:

`Nodes.get(id)`

`Nodes.create(story, definition)`

`Nodes.modify(id, changes)`

`Nodes.delete(id)`

`Nodes.upvote()`

`Nodes.downvote()`


**General Node JSON model**

```es6
{
  id: int,
  story_id: int,
  votes: int,
  
  // Optional attributes
  
  next_node_id: int, // optional if last node of the story or choices is defined

  background_image_id: int,
  music_id: int,
  text: string,
  
  choices: [
    { 
      text: string,
      next_node_id: int,
    },
    ...
  ]
  
}
```


## Example of usage

### Create a story with four nodes, one choice

**Using abstractions over the API**


```es6
import { Stories } from './api'
import { Nodes } from './api'

const story = Stories.create({ title: 'A Midsummer Night\'s Dream' })

story
  .addNode({ 
    text : "Now, fair Hippolyta, our nuptial hour draws on apace; four happy days bring in another moon: but, O, methinks, how slow this old moon wanes! She lingers my desires, like to a step-dame or a dowager long withering out a young man revenue."
  })
  .addNode({
    text: "Four days will quickly steep themselves in night; Four nights will quickly dream away the time; And then the moon, like to a silver bow new-bent in heaven, shall behold the night of our solemnities."
  })
  .addNode({ text: "Answer?" })
    .addChoice("Yes")
      .addNode({ text: "Ok. This is the end of your story."})
    .addChoice("No")
      .addNode({ text: "Well, then this is the end of your story."})
```

**Using API**

```es6
import { Stories } from './api'
import { Nodes } from './api'

// Create the story
Stories.create({ title: 'A Midsummer Night\'s Dream' })
  .then((story) => {
    
    // Create first node
    Nodes.create(story, { 
      text : "Now, fair Hippolyta, our nuptial hour draws on apace; four happy days bring in another moon: but, O, methinks, how slow this old moon wanes! She lingers my desires, like to a step-dame or a dowager long withering out a young man revenue."
    })
    
    .then((firstNode) => {
      // Set first node as the starting node for the story
      story.update({ start_node_id : firstNode.id })
      
      // Create second node
      return Nodes.create(story, {
        text: "Four days will quickly steep themselves in night; Four nights will quickly dream away the time; And then the moon, like to a silver bow new-bent in heaven, shall behold the night of our solemnities."
        })
        .then((nextNode) => {
          // Link first node to second node
          firstNode.update({ next_node_id : nextNode.id })
          // Return next node, this will be used as argument for the next promise
          return nextNode
        })
    })
    
    // We have created the second node on our last promise, let's add the third
    .then((secondNode) =>
      // Create the third node
      Nodes.create(story, {
          text: "Answer?"
        })
        .then((nextNode) => {
          // Link second node to third node
          secondNode.update({ next_node_id : nextNode.id })
          // Return
          return nextNode
        })
    )
    
    .then((thirdNode) =>
      // Create choice nodes for the third node
      Promise.all([
        Nodes.create({ text: "Ok. This is the end of your story." }),
        Nodes.create({ text: "Well, then this is the end of your story." })
      ])
      // Update third node with the choices
      .then((choiceNodes) =>
        thirdNode.update({
          choices: [
            "Yes" : choiceNodes[0].id,
            "No"  : choiceNodes[1].id
          ]
        })
      )
    )
  
  })

```

