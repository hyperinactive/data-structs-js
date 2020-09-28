class Graph {
  constructor() {
    this.vertices = new Map();
    this.edges = new Map();
    this.vertexCount = 0;
    this.edgeCount = 0;
  }
  // todo error handling
  // todo input flexibility
  addVertex(key, value) {
    // make a vertex and its edges
    // const vertex = new Vertex(value); // kind of works without Vertex, keep the class (?)
    this.vertices.set(key, value);
    // add an empty map for the vertex -> to be populated in the future
    this.edges.set(key, new Map());
    this.vertexCount++;
    return value;
  }
  // todo error handling
  // todo input flexibility
  // assuming the vertices exist, add them to the map
  addEdge(fromVertex, toVertex, weight) {
    // edge has key of the start vertex and value of its weight
    this.edges.get(fromVertex).set(toVertex, weight);
    this.edgeCount++;
  }
  removeVertex(key) {
    if (!this.vertices.has(key)) {
      console.log('No vertices match the key');
      return false;
    }
    this.removeAllEdges(key);
    this.edges.delete(key);
    this.vertices.delete(key);
    this.vertexCount--;
    return true;
  }
  removeEdge(fromVertex, toVertex) {
    // if the vertices exist
    if (
      this.vertices.has(fromVertex) &&
      this.vertices.has(toVertex) &&
      this.edges.get(fromVertex).has(toVertex)
    ) {
      // delete the edge between them
      // console.log(this.edges.get(fromVertex));
      this.edges.get(fromVertex).delete(toVertex);
      this.edgeCount--;
      return true;
    }
    console.log('No edges match the args provided');
    return false;
  }
  removeAllEdges(fromKey) {
    if (!this.vertices.has(fromKey)) {
      console.log('No vertices removed');
      return 0;
    }
    // use the iterator to get the keys of starting vertices
    let keysIterator = this.edges.get(fromKey).keys();
    // console.log(keysIterator);
    // convert the iterator to an array
    let keys = Array.from(keysIterator);
    console.log(keys);
    keys.forEach((toKey) => {
      this.removeEdge(fromKey, toKey);
    });
    return;
  }
  print() {
    if (this.vertexCount === 0) {
      return console.log('The graph is empty');
    }

    /**
     * iterate over the this.edges -> get all vertices with their edges
     * if there are no edges in the map return the the key of the vertex
     * iterate over all edges verts have
     * return the log string
     */

    console.log('Graph: ');
    // this.edges contains all vertices regardless of them (not) having edges
    // keys of all vertices
    let vertexKeysIterator = this.edges.keys();
    let vertexKey = Array.from(vertexKeysIterator);
    // console.log(vertexKey);
    // console.log('Print the edges');
    vertexKey.forEach((element) => {
      let log = '';
      log += element;
      if (this.edges.get(element).size === 0) {
        console.log(log);
        return;
      }
      let edgesKeyIterator = this.edges.get(element).keys();
      let edgesKey = Array.from(edgesKeyIterator);
      // console.log(edgesKey);
      log += ` -> `;
      edgesKey.forEach((el) => {
        log += `${el}, `;
      });
      // remove the extra ',' from the log string
      log = log.substring(0, log.length - 2);
      return console.log(log);
    });
  }
}

export { Graph };
