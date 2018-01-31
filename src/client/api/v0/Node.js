import BaseAPI from './base-api'

class NodeAPI extends BaseAPI {

  upvote(nodeId) {
    return this._post(`/nodes/${nodeId}/upvote/`)
  }

}

export default new NodeAPI()
