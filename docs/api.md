# API

Note: Nodes can be associated only to one story.


## Stories API

`GET /stories/` - Get the list of stories

`GET /stories/{id}/` - Get a story

`POST /stories/` - Create a story

`PUT /stories/{id}/` - Modify a story

`DELETE /stories/{id}/` - Delete a story, will delete all the story nodes

Or, as JavaScript:

`Stories.list()`
`Stories.get(id)`
`Stories.create(id, definition)`
`Stories.modify(id, changes)`
`Stories.delete(id)`

**Story JSON model**

```
{
  id: int,
  title: string,
  description: string,
  start_node_id: int
}
```


## Nodes API

`GET /nodes/{id}/` - Get a node

`POST /nodes/` - Create a node

`PUT /nodes/{id}/` - Modify a node

`DELETE /nodes/{id}/` - Delete a node

Or, as JavaScript:

`Nodes.get(id)`
`Nodes.create(id, definition)`
`Nodes.modify(id, changes)`
`Nodes.delete(id)`

**General Node JSON model**

```
{
  id: int,
  story_id: int,
  next_node_id: int,
  
  type: int, 

  background_image_id: int,
  music_id: int,
  text: string,
  
  // Type-specific attributes
}
```


**Choice Node JSON model**

```
{
  id: int,
  story_id: int,
  next_node_id: int,
  
  type: int, 

  background_image_id: int,
  music_id: int,
  text: string,
  
  // Type-specific attributes
  choices: [
    { 
      text: string,
      next_node_id: int,
    },
    ...
  ]
  
}
```
