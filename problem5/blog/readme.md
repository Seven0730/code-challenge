# blog

**blog** is a blockchain built using Cosmos SDK(v0.50.12) and Tendermint and created with [Ignite CLI](https://ignite.com/cli)(v28.8.1-dev).

## Get started

```bash
ignite chain build
ignite chain serve
```

---

### a. Explain what does it mean by breaking consensus

Breaking consensus refers to the disruption of the unified agreement among all nodes. Hence, changes that make all the nodes unable to follow a specific common logic will break consensus. As a result, nodes might begin to follow different protocols or maintain conflicting versions of the ledger.

---

### b. Explain why your change would break the consensus

Breaking consensus cannot be achieved on a local environment running on a single node. Therefore, I assume that while one group of nodes executes the logic on the main branch, another group runs the logic on this branch incorporating a consensus-breaking change.


### My Change

**Modification:**  
Add a new field `created_at` to the `Post` message in `proto/blog/blog/post.proto`.

```proto
message Post {
  // Existing fields...
  string title = 1; 
  string body = 2; 
  string creator = 3; 
  uint64 id = 4; 
  // New field: Every Post must now include a creation timestamp.
  uint64 created_at = 5;
}
```

By adding a mandatory created_at field, nodes running the new branch will require every Post message to include a creation timestamp. Nodes that remain on the main branch (without this field) will compute a different state or validate messages differently, leading to a consensus break.