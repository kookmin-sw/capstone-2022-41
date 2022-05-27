'use strict'

/**
 * PriorityQueue class
 * Maintains a sorted queue of items
 * Use a custom comparator to determine how to order items in the queue
 * If comparator function returns a value <= 0, the first argument will be sorted before the second
 * If comparator function returns a value > 0, the second argument will be sorted before the first
 * For a min priority queue, compare first argument to the second
 * For a max priority queue, compare second argument to the first
 */
module.exports = class PriorityQueue {
  /**
   * Priority Queue constructor
   * @public
   * @constructor
   * @param {Function} comparator - Function used to compare items in the queue
   */
  constructor(comparator) {
    this._comparator = comparator || this._defaultComparator
    this._queue = []
  }

  /**
   * Add an item to the PriorityQueue
   * @public
   * @param {*} item Item to add to the queue
   * @returns - undefined
   */
  enqueue(item) {
    if (!item) return

    this._queue.push(item)
    this._siftUp(this._queue.length - 1)
  }

  /**
   * Remove and return the item from the beginning of the PriorityQueue
   * @public
   * @returns {*} - Item at the beginning of the queue
   */
  dequeue() {
    if (!this._queue.length) return null

    this._swap(0, this._queue.length - 1)
    const res = this._queue.pop()
    this._siftDown(0)
    return res
  }

  /**
   * Return the item at the beginning of the PriorityQueue
   * @public
   * @returns {*} - Item at the beinning of the queue
   */
  peek() {
    if (!this._queue.length) return null

    return this._queue[0]
  }

  /**
   * Return the current size of the PriorityQueue
   * @public
   * @returns {Number} - The current size of the queue
   */
  size() {
    return this._queue.length
  }

  /**
   * Return true if the PriorityQueue is empty, false if not
   * @public
   * @returns {Boolean} - true if the queue is empty, false if not
   */
  isEmpty() {
    return !this._queue.length
  }

  /**
   * PRIVATE - Default comparator for numbers, strings and objects
   * @private
   * @param {*} a - First item to compare
   * @param {*} b - Second item to compare
   * @returns {Number} - Number used for sort function
   */
  _defaultComparator(a, b) {
    if (typeof a !== typeof b) return 0
    if (typeof a === 'number') return a - b
    if (typeof a === 'string') return a.localeCompare(b)

    const strA = JSON.stringify(a)
    const strB = JSON.stringify(b)
    return strA.localeCompare(strB)
  }

  /**
   * PRIVATE - Call the comparator function on two items to compare
   * @private
   * @param {*} a - First item to compare
   * @param {*} b - Second item to compare
   * @returns {Number} - Number used for sort function
   */
  _compare(a, b) {
    return this._comparator(a, b)
  }

  /**
   * PRIVATE - Recursively sift an item at a given index higher in the queue if possible
   * @private
   * @param {*} i - Index to attempt to sift up for
   * @returns - undefined
   */
  _siftUp(i) {
    if (i === 0) return

    const parent = Math.floor((i - 1) / 2)
    if (this._compare(this._queue[i], this._queue[parent]) < 0) {
      this._swap(i, parent)
      this._siftUp(parent)
    }
  }

  /**
   * PRIVATE - Recursively sift an item at a given index lower in the queue if possible
   * @private
   * @param {*} i - Index to attempt to sift down for
   * @returns - undefined
   */
  _siftDown(i) {
    const left = (i * 2) + 1
    const right = (i * 2) + 2

    let curr = i
    if (
      left < this._queue.length
        && this._compare(this._queue[left], this._queue[curr]) < 0
    ) {
      curr = left
    }

    if (
      right < this._queue.length
        && this._compare(this._queue[right], this._queue[curr]) < 0
    ) {
      curr = right
    }

    if (curr !== i) {
      this._swap(i, curr)
      this._siftDown(curr)
    }
  }

  /**
   * PRIVATE - Swap values in the queue at two given indices
   * @private
   * @param {*} i - First index to swap
   * @param {*} j - Second index to swap
   * @returns - undefined
   */
  _swap(i, j) {
    const temp = this._queue[i]
    this._queue[i] = this._queue[j]
    this._queue[j] = temp
  }
}
