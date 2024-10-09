module.exports = (sequelize, DataTypes) =>
    sequelize.define("question_tag", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        tag_name: {
            type: DataTypes.ENUM(
                "Array", "String", "Hash Table", "Dynamic Programming", "Math", "Sorting",
                "Greedy", "Depth-First Search", "Database", "Binary Search", "Matrix", "Breadth-First Search",
                "Tree", "Bit Manipulation", "Two Pointers", "Binary Tree", "Heap (Priority Queue)", "Prefix Sum",
                "Simulation", "Stack", "Counting", "Graph", "Sliding Window", "Design", "Backtracking", "Enumeration",
                "Union Find", "Linked List", "Ordered Set", "Monotonic Stack", "Number Theory", "Trie", "Segment Tree",
                "Bitmask", "Divide and Conquer", "Queue", "Recursion", "Binary Search Tree", "Combinatorics", "Binary Indexed Tree",
                "Hash Function", "Geometry", "Memoization", "String Matching", "Topological Sort", "Rolling Hash", "Shortest Path",
                "Game Theory", "Interactive", "Data Stream", "Monotonic Queue", "Brainteaser", "Randomized", "Merge Sort",
                "Doubly-Linked List", "Counting Sort", "Iterator", "Concurrency", "Probability and Statistics", "Quicksort",
                "Suffix Array", "Bucket Sort", "Minimum Spanning Tree", "Shell", "Line Sweep", "Reservoir Sampling",
                "Strongly Connected Component", "Eulerian Circuit", "Radix Sort", "Rejection Sampling", "Biconnected Component"
            ),
            allowNull: false,
        }
    }, {
      timestamps: false
    });