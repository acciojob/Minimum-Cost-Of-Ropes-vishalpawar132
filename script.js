function calculateMinCost() {
  const inputElement = document.getElementById('rope-lengths');
  const resultElement = document.getElementById('result');
  
  const ropeLengths = inputElement.value.split(',').map(Number);
  const minCost = findMinimumCost(ropeLengths);
  
  resultElement.textContent = `Minimum cost: ${minCost}`;
}

function findMinimumCost(ropeLengths) {
  if (ropeLengths.length < 2) {
    return 0;
  }

  let minCost = 0;
  
  // Create a priority queue (min heap) to store rope lengths
  const minHeap = new MinHeap();
  
  // Insert all rope lengths into the min heap
  for (let i = 0; i < ropeLengths.length; i++) {
    minHeap.insert(ropeLengths[i]);
  }
  
  // Keep merging the two smallest ropes until only one rope remains in the min heap
  while (minHeap.size() > 1) {
    // Extract the two smallest ropes from the min heap
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();
    
    // Calculate the cost of merging the two ropes
    const cost = rope1 + rope2;
    
    // Add the cost to the total minimum cost
    minCost += cost;
    
    // Insert the merged rope back into the min heap
    minHeap.insert(cost);
  }
  
  return minCost;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  size() {
    return this.heap.length;
  }
  
  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }
  
  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }
    
    const min = this.heap[0];
    const last = this.heap.pop();
    
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    
    return min;
  }
  
  bubbleUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);
    
    if (parentIndex >= 0 && this.heap[parentIndex] > this.heap[index]) {
      [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
      this.bubbleUp(parentIndex);
    }
  }
  
  bubbleDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallestIndex = index;
    
    if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = leftChildIndex;
    }
    
    if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
      smallestIndex = rightChildIndex;
    }
    
    if (smallestIndex !== index) {
      [this.heap[smallestIndex], this.heap[index]] = [this.heap[index], this.heap[smallestIndex]];
      this.bubbleDown(smallestIndex);
    }
  }
}

