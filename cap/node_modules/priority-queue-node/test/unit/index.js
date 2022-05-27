'use strict'

const {test, threw} = require('tap')
const PriorityQueue = require('../../index.js')

test('Priority Queue', async (t) => {
  t.test('constructor - default comparator', async (t) => {
    const pq = new PriorityQueue()

    t.equal(pq._comparator, pq._defaultComparator, '_comparator initialized to default')
    t.same(pq._queue, [], '_queue is initialized to empty array')
  })

  t.test('constructor - custom comparator', async (t) => {
    const comparator = (a, b) => {
      return a.property - b.property
    }

    const pq = new PriorityQueue(comparator)

    t.equal(pq._comparator, comparator, '_comparator initialized to constructor argument')
    t.same(pq._queue, [], '_queue initialized to empty array')
  })

  t.test('enqueue - attempt to enqueue undefined', async (t) => {
    const pq = new PriorityQueue()
    pq.enqueue(undefined)

    t.equal(pq._queue.length, 0, '_queue is empty')
    t.same(pq._queue, [], '_queue is equal to an empty array')
  })

  t.test('enqueue - attempt to enqueue null', async (t) => {
    const pq = new PriorityQueue()
    pq.enqueue(null)

    t.equal(pq._queue.length, 0, '_queue is empty')
    t.same(pq._queue, [], '_queue is equal to an empty array')
  })

  t.test('enqueue - enqueue one number', async (t) => {
    const pq = new PriorityQueue()
    pq.enqueue(1)

    t.equal(pq._queue[0], 1, 'number was enqueued')
  })

  t.test('enqueue - enqueue one object', async (t) => {
    const pq = new PriorityQueue()
    pq.enqueue({
      key: 5
    , value: 'stub'
    })

    t.same(
      pq._queue[0]
    , {
        key: 5
      , value: 'stub'
      }
    , 'object was enqueued'
    )
  })

  t.test('enqueue - enqueue multiple numbers', async (t) => {
    const pq = new PriorityQueue()
    pq.enqueue(5)
    pq.enqueue(1)
    pq.enqueue(10)
    const expected = [1, 5, 10]

    t.equal(pq._queue.length, 3, 'length matches expected')
    t.same(pq._queue, expected, 'current queue matches expected')
  })

  t.test('enqueue - enqueue numbers with custom comparator', async (t) => {
    const comparator = (a, b) => {
      return b - a
    }
    
    const pq = new PriorityQueue(comparator)
    pq.enqueue(5)
    pq.enqueue(1)
    pq.enqueue(10)
    const expected = [10, 1, 5]

    t.equal(pq._comparator, comparator, '_comparator initialized to constructor argument')
    t.equal(pq._queue.length, 3, 'length matches expected')
    t.same(pq._queue, expected, 'current queue matches expected')
  })

  t.test('enqueue - enqueue objects with custom comparator', async (t) => {
    const comparator = (a, b) => {
      return a.key - b.key
    }
    
    const pq = new PriorityQueue(comparator)
    pq.enqueue({
      key: 25
      , value: 'stub'
    })
    pq.enqueue({
      key: 12
      , value: 'example'
    })
    pq.enqueue({
      key: 1
      , value: 'test'
    })
    const expected = [
      {
        key: 1
      , value: 'test'
      }
    , {
        key: 25
      , value: 'stub'
      }
    , {
        key: 12
      , value: 'example'
      }
    ]

    t.equal(pq._comparator, comparator, '_comparator initialized to constructor argument')
    t.equal(pq._queue.length, 3, 'length matches expected')
    t.same(pq._queue, expected, 'current queue matches expected')
  })

  t.test('dequeue - no action when queue is empty', async (t) => {
    const pq = new PriorityQueue()

    t.equal(pq.dequeue(), null, 'dequeue returns null when queue is empty')
  })

  t.test('dequeue - number is dequeued', async (t) => {
    const pq = new PriorityQueue()
    pq.enqueue(2)
    pq.enqueue(1)
    pq.enqueue(3)
    const expected = [2, 3]

    t.equal(pq.dequeue(), 1, 'number is dequeued')
    t.equal(pq._queue.length, 2, 'length matches expected')
    t.same(pq._queue, expected, 'current queue matches expected')
  })

  t.test('dequeue - string is dequeued', async (t) => {
    const pq = new PriorityQueue()
    pq.enqueue('stub')
    pq.enqueue('testing')
    pq.enqueue('word')
    pq.enqueue('str')
    const expected = ['stub', 'testing', 'word']

    t.equal(pq.dequeue(), 'str', 'string is dequeued')
    t.equal(pq._queue.length, 3, 'length matches expected')
    t.same(pq._queue, expected, 'current queue matches expected')
  })

  t.test('dequeue - object is dequeued', async (t) => {
    const pq = new PriorityQueue()
    pq.enqueue({item: 3})
    pq.enqueue({item: 6})
    pq.enqueue({item: 1})
    pq.enqueue({item: 9})
    const expected = [{item: 3}, {item: 6}, {item: 9}]

    t.same(pq.dequeue(), {item: 1}, 'object is dequeued')
    t.equal(pq._queue.length, 3, 'length matches expected')
    t.same(pq._queue, expected, 'current queue matches expected')
  })

  t.test('dequeue - custom comparator', async (t) => {
    const comparator = (a, b) => {
      return b.item - a.item
    }

    const pq = new PriorityQueue(comparator)
    pq.enqueue({item: 5})
    pq.enqueue({item: 10})
    pq.enqueue({item: 1})
    pq.enqueue({item: 20})
    pq.enqueue({item: 3})
    const expected = [{item: 10}, {item: 5}, {item: 1}, {item: 3}]

    t.equal(pq._comparator, comparator, '_comparator initialized to constructor argument')
    t.same(pq.dequeue(), {item: 20}, 'object is dequeued')
    t.equal(pq._queue.length, 4, 'length matches expected')
    t.same(pq._queue, expected, 'current queue matches expected')
  })

  t.test('peek - returns first item - number', async(t) => {
    const pq = new PriorityQueue()
    pq.enqueue(5)

    t.equal(pq.peek(), 5, 'peeked item equals expected result')
  })

  t.test('peek - returns first item - string', async(t) => {
    const pq = new PriorityQueue()
    pq.enqueue('stub')

    t.equal(pq.peek(), 'stub', 'peeked item equals expected result')
  })

  t.test('peek - returns null when queue is empty', async(t) => {
    const pq = new PriorityQueue()

    t.equal(pq.peek(), null, 'peeked item equals expected result')
  })

  t.test('size - returns correct size after one enqueue', async(t) => {
    const pq = new PriorityQueue()
    pq.enqueue(8)

    t.equal(pq.size(), 1, 'queue size equals expected result')
  })

  t.test('size - returns correct size after multiple enqueues', async(t) => {
    const pq = new PriorityQueue()
    pq.enqueue('test')
    pq.enqueue('stub')
    pq.enqueue('abc123')
    pq.enqueue('example')

    t.equal(pq.size(), 4, 'queue size equals expected result')
  })

  t.test('size - returns correct size if empty', async(t) => {
    const pq = new PriorityQueue()

    t.equal(pq.size(), 0, 'queue size equals expected result')
  })

  t.test('isEmpty - returns false after one enqueue', async(t) => {
    const pq = new PriorityQueue()
    pq.enqueue(3)

    t.equal(pq.isEmpty(), false, 'queue is not empty')
  })

  t.test('isEmpty - returns false after multiple enqueues', async(t) => {
    const pq = new PriorityQueue()
    pq.enqueue({field: 'test'})
    pq.enqueue({field: 'stub'})

    t.equal(pq.isEmpty(), false, 'queue is not empty')
  })

  t.test('isEmpty - returns true if empty', async(t) => {
    const pq = new PriorityQueue()

    t.equal(pq.isEmpty(), true, 'queue is empty')
  })

  t.test('_defaultComparator - types do not match', async (t) => {
    const pq = new PriorityQueue()
    
    t.equal(pq._defaultComparator(2 , 'str'), 0, 'zero expected')
    t.equal(pq._defaultComparator('str', {field: 1}), 0, 'zero expected')
    t.equal(pq._defaultComparator({key: 'val'}, 5), 0, 'zero expected')
  })

  t.test('_defaultComparator - numbers', async (t) => {
    const pq = new PriorityQueue()
    
    t.equal(pq._defaultComparator(2 , 5), -3, 'negative number expected')
    t.equal(pq._defaultComparator(1, 1), 0, 'zero expected')
    t.equal(pq._defaultComparator(8, 4), 4, 'positive number expected')
  })

  t.test('_defaultComparator - strings', async (t) => {
    const pq = new PriorityQueue()
    
    t.equal(pq._defaultComparator('abc', 'zzz'), -1, 'negative number expected')
    t.equal(pq._defaultComparator('aaa', 'aaa'), 0, 'zero expected')
    t.equal(pq._defaultComparator('bbb', 'aaa'), 1, 'positive number expected')
  })

  t.test('_defaultComparator - objects', async (t) => {
    const pq = new PriorityQueue()

    t.equal(pq._defaultComparator({key: 'aaa'}, {key: 'bbb'}), -1, 'negative number expected')
    t.equal(pq._defaultComparator({field: 'test'}, {field: 'test'}), 0, 'zero expected')
    t.equal(pq._defaultComparator({stub: 'zzz'}, {stub: 'bbb'}), 1, 'positive number expected')
  })

  t.test('_compare - default - types do not match', async (t) => {
    const pq = new PriorityQueue()
    
    t.equal(pq._compare(2 , 'str'), 0, 'zero expected')
    t.equal(pq._compare('str', {field: 1}), 0, 'zero expected')
    t.equal(pq._compare({key: 'val'}, 5), 0, 'zero expected')
  })

  t.test('_compare - default - numbers', async (t) => {
    const pq = new PriorityQueue()
    
    t.equal(pq._compare(2 , 10), -8, 'negative number expected')
    t.equal(pq._compare(8, 8), 0, 'zero expected')
    t.equal(pq._compare(12, 7), 5, 'positive number expected')
  })

  t.test('_compare - custom - strings', async (t) => {
    const pq = new PriorityQueue((a, b) => {
      return -a.localeCompare(b)
    })
    
    t.equal(pq._compare('def' , 'abc'), -1, 'negative number expected')
    t.equal(pq._compare('xyz', 'xyz'), 0, 'zero expected')
    t.equal(pq._compare('aaa', 'bbb'), 1, 'positive number expected')
  })

  t.test('_compare - custom - objects', async (t) => {
    const pq = new PriorityQueue((a, b) => {
      return b.key - a.key
    })
    
    t.equal(pq._compare({key: 5} , {key: 1}), -4, 'negative number expected')
    t.equal(pq._compare({key: 2}, {key: 2}), 0, 'zero expected')
    t.equal(pq._compare({key: 3}, {key: 6}), 3, 'positive number expected')
  })

  t.test('_siftUp - no action when index is 0', async (t) => {
    const pq = new PriorityQueue()
    pq.enqueue(5)

    pq._siftUp(0)
    t.same(pq._queue, [5], 'no change to the queue')
  })

  t.test('_siftUp - left side child sifts up', async (t) => {
    const pq = new PriorityQueue((a, b) => {
      return b.key - a.key
    })
    pq._queue = [{key: 2}, {key: 4}, {key: 1}]
    const expected = [{key: 4}, {key: 2}, {key: 1}]

    pq._siftUp(1)
    t.same(pq._queue, expected, 'root and left child have swapped')
  })

  t.test('_siftUp - right side child sifts up', async (t) => {
    const pq = new PriorityQueue()
    pq._queue = [10, 9, 5]
    const expected = [5, 9, 10]

    pq._siftUp(2)
    t.same(pq._queue, expected, 'root and right child have swapped')
  })

  t.test('_siftUp - string is sifted up multiple times', async (t) => {
    const pq = new PriorityQueue()
    pq._queue = ['b', 'c', 'd', 'e', 'a', 'f', 'g']
    const expected = ['a', 'b', 'd', 'e', 'c', 'f', 'g']

    pq._siftUp(4)
    t.same(pq._queue, expected, 'element has sifted up to the top')
  })

  t.test('_siftDown - no action when parent is in order', async (t) => {
    const pq = new PriorityQueue()
    pq._queue = [1, 2, 3]
    const expected = [1, 2, 3]

    pq._siftDown(0)
    t.same(pq._queue, expected, 'no change to the queue')
  })

  t.test('_siftDown - parent sifts down left', async (t) => {
    const pq = new PriorityQueue()
    pq._queue = [9, 3, 11]
    const expected = [3, 9, 11]

    pq._siftDown(0)
    t.same(pq._queue, expected, 'parent sifted down left')
  })

  t.test('_siftDown - parent sifts down right', async (t) => {
    const pq = new PriorityQueue()
    pq._queue = [4, 8, 2]
    const expected = [2, 8, 4]

    pq._siftDown(0)
    t.same(pq._queue, expected, 'parent sifted down right')
  })

  t.test('_siftDown - object is sifted down multiple times', async (t) => {
    const pq = new PriorityQueue((a, b) => {
      return a.item - b.item
    })
    pq._queue = [{item: 15}, {item: 3}, {item: 4}, {item: 6}, {item: 8},{item: 9}, {item: 12}]
    const expected = [{item: 3}, {item: 6}, {item: 4}, {item: 15}, {item: 8},{item: 9}, {item: 12}]

    pq._siftDown(0)
    t.same(pq._queue, expected, 'object sifted down multiple times')
  })

  t.test('_swap - numbers swapped', async (t) => {
    const pq = new PriorityQueue()
    pq._queue = [8, 5, 2, 9, 12]
    const expected = [2, 5, 8, 9, 12]

    pq._swap(0, 2)
    t.same(pq._queue, expected, 'numberss were swapped')
  })

  t.test('_swap - strings swapped', async (t) => {
    const pq = new PriorityQueue()
    pq._queue = ['aa', 'bb', 'gg', 'dd', 'ee', 'ff', 'cc']
    const expected = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg']

    pq._swap(2, 6)
    t.same(pq._queue, expected, 'strings were swapped')
  })

  t.test('_swap - objects swapped', async (t) => {
    const pq = new PriorityQueue()
    pq._queue = [{elem: 'stub'}, {elem: 'test'}, {elem: 'example'}, {elem: 'str'}]
    const expected = [{elem: 'test'}, {elem: 'stub'}, {elem: 'example'}, {elem: 'str'}]

    pq._swap(0, 1)
    t.same(pq._queue, expected, 'objects were swapped')
  })
}).catch(threw)
