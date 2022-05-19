# Priority Queue for Node.js

[![Coverage Status](https://coveralls.io/repos/github/vincegando/priority-queue-node/badge.svg?branch=main)](https://coveralls.io/github/vincegando/priority-queue-node?branch=main)

A Priority Queue implementation that maintains a sorted queue of items.
Use a custom comparator function to compare items in the queue.
If a custom comparator is not passed to the PriorityQueue's constructor, a default comparator will be used.
Based on the comparator used, the queue can store items in ascending or descending order.

## Installation

NPM:
```bash
npm install priority-queue-node
```

Github Packages: (Note: Ensure your registry url is pointed at `https://npm.pkg.github.com`)
```bash
npm install @vincegando/priority-queue-node
```

- [API](#api)
  - [`constructor`([comparator: Function)]](#constructorcomparator-function)
  - [`enqueue`(item: `any`)](#enqueueitem-any)
  - [`dequeue`(): `any`](#dequeue-any)
  - [`peek`(): `any`](#peek-any)
  - [`size`(): Number](#size-number)
  - [`isEmpty`(): Boolean](#isempty-boolean)

## API

### `constructor`([comparator: [Function][]])

Initialize the Priority Queue.

**Arguments**

- (optional) `comparator` ([Function][]) - The compare function used to order items in the queue

To use the default comparator, pass no arguments to the constructor.

```javascript
const PriorityQueue = require('priority-queue-node')

const priorityQueue = new PriorityQueue()
```

To use a custom comparator, pass a compare function as the only argument to the constructor.

```javascript
const PriorityQueue = require('priority-queue-node')

const customQueue = new PriorityQueue((a, b) => {
  return b - a
})
```

### `enqueue`(item: `any`)

Add an item to the PriorityQueue.

**Arguments**

- `item` (`any`) - The item to add to the queue

NOTE: If `undefined` or `null` is passed as the item argument, nothing will be added to the queue.

```javascript
// Add a number
priorityQueue.enqueue(5)

// Add a string
priorityQueue.enqueue('foo')

// Add an object
priorityQueue.enqueue({ bar: 'baz' })
```

### `dequeue`(): `any`

Remove and return the item from the beginning of the PriorityQueue.

**returns** `any`: The item at the beginning of the queue

```javascript
// Starting queue: [1, 3, 5], comparator: default

const item1 = priorityQueue.dequeue() // 1
const item2 = priorityQueue.dequeue() // 3
const item3 = priorityQueue.dequeue() // 5
```

### `peek`(): `any`

Return the item from the beginning of the PriorityQueue.

**returns** `any`: The item at the beginning of the queue

```javascript
// Starting queue: [1, 3, 5], comparator: default

const item1 = priorityQueue.peek() // 1
const item2 = priorityQueue.peek() // 1
const item3 = priorityQueue.peek() // 1
```

### `size`(): [Number][]

Return the current size of the PriorityQueue.

**returns** [Number][]: The current size of the queue

```javascript
priorityQueue.enqueue(1)
priorityQueue.enqueue(2)
priorityQueue.enqueue(3)

const size = priorityQueue.size() // 3
```

### `isEmpty`(): [Boolean][]

Return `true` if the PriorityQueue is empty, `false` if not.

**returns** [Boolean][]: `true` if the queue is empty, `false` if not

```javascript
const empty1 = priorityQueue.isEmpty() // true

priorityQueue.enqueue(1)
const empty2 = priorityQueue.isEmpty() // false
```

[Function]: https://mdn.io/function
[Number]: https://mdn.io/number
[Boolean]: https://mdn.io/boolean
