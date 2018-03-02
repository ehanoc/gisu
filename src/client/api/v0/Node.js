import BaseAPI from './base-api'

class NodeAPI extends BaseAPI {

  upvote(nodeId) {
    return this._post(`/nodes/${nodeId}/upvote/`)
  }

  update(id, data) {
    console.log('[NodeAPI] update(id, data) is not implemented yet')
  }

}

export default new NodeAPI()
