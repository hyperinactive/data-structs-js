import { Vertex } from './Vertex.js';

class Graph {
  constructor() {
    this.vetrices = new Array();
    this.edges = new Map();
    this.vertexCount = 0;
    this.edgeCount = 0;
  }
  // todo error handling
  // todo input flexibility
  addVertex(value) {
    // make a vertex and its edges
    const vertex = new Vertex();
    this.vetrices.push(vertex);
    if (!this.edges.has(value)) {
      this.edges.set(value, new Map());
    }
    this.vertexCount++;
    return true;
  }
  // todo error handling
  // todo input flexibility
  // assuming the vertices exist, add them to the map
  addEdge(vertexFrom, vertexTo, weight) {
    this.edges.get(vertexFrom).set(vertexTo, weight);
    this.edgeCount++;
  }
}

export { Graph };
