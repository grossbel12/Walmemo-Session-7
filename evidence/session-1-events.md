# Session 1 pending memory ledger

These entries record real baseline answers. All ten events were accepted through one official SDK bulk request, reached `done`, and were returned by a subsequent semantic recall.

## Event 1

- Status: CONFIRMED
- Namespace: `sui-walrus`
- Topic: Walrus blob confidentiality
- Question: Are ordinary Walrus blobs confidential by default, and who can retrieve them?
- User answer: `Нет. Но могут у кого приватник`
- Assessment: Partially correct
- Misconception: Correctly recognized that ordinary blobs are not confidential, but believed retrieval requires possession of a private key.
- Correct: Ordinary Walrus blobs are public and discoverable; anyone with the blob ID can retrieve the content. Sensitive content must be encrypted separately, as Walrus provides availability and integrity rather than native confidentiality.
- Severity: medium
- Recalled miss count: 1 (session-local; lifetime recall unavailable)

## Event 3

- Status: CONFIRMED
- Namespace: `sui-walrus`
- Topic: Content-derived Walrus blob IDs
- Question: Why does uploading identical content twice produce the same Walrus blob ID?
- User answer: `Незнаю`
- Assessment: Wrong / no model available
- Misconception: The deterministic, content-derived nature of a Walrus blob ID is unknown.
- Correct: Walrus deterministically derives the blob ID from the erasure-encoded content/slivers. Identical content produces identical encoded data and therefore the same blob ID.
- Severity: high
- Recalled miss count: 1 (session-local; lifetime recall unavailable)

## Event 2

- Status: CONFIRMED
- Namespace: `sui-walrus`
- Topic: Walrus blob ID versus Sui object ID
- Question: What is the practical difference between a Walrus blob ID and its Sui object ID?
- User answer: `Незнаю`
- Assessment: Wrong / no model available
- Misconception: The roles of the content identifier and the onchain management object are unknown.
- Correct: The content-derived Walrus blob ID is used to locate and retrieve blob data. The Sui object ID identifies the corresponding onchain object and is used to manage metadata and lifecycle operations such as extending storage duration.
- Severity: high
- Recalled miss count: 1 (session-local; lifetime recall unavailable)

## Event 4

- Status: CONFIRMED
- Namespace: `sui-walrus`
- Topic: Permanent versus deletable Walrus blobs
- Question: How does a permanent blob differ from a deletable blob, and does permanent mean forever?
- User answer: `незнаяю`
- Assessment: Wrong / no model available
- Misconception: The difference between early-deletion policy and storage expiry is unknown.
- Correct: A permanent blob cannot be deleted before its configured expiry epoch, while an authorized owner can delete a deletable blob during its lifetime. Permanent does not mean forever; both types have an availability period and expire at their end epoch unless extended beforehand.
- Severity: high
- Recalled miss count: 1 (session-local; lifetime recall unavailable)

## Event 5

- Status: CONFIRMED
- Namespace: `sui-walrus`
- Topic: Walrus certificate of availability
- Question: What does a Walrus certificate of availability prove, and how is it obtained?
- User answer: `не знаю`
- Assessment: Wrong / no model available
- Misconception: The certification threshold and meaning of availability are unknown.
- Correct: Storage nodes receive the blob's slivers and sign receipts. When signatures covering the required threshold (at least two thirds of shards) are aggregated, the blob is certified; the certificate proves the blob is available for its registered storage period.
- Severity: high
- Recalled miss count: 1 (session-local; lifetime recall unavailable)

## Event 6

- Status: CONFIRMED
- Namespace: `sui-walrus`
- Topic: Walrus erasure-coded read availability
- Question: How can a certified blob remain readable when only one third of storage nodes are available?
- User answer: `не знаю`
- Assessment: Wrong / no model available
- Misconception: The relationship between erasure-coded slivers and read availability is unknown.
- Correct: Walrus erasure-encodes a blob into recoverable slivers distributed across shards. After a valid write, enough encoded information remains for reconstruction even when only one third of storage nodes are available.
- Severity: high
- Recalled miss count: 1 (session-local; lifetime recall unavailable)

## Event 7

- Status: CONFIRMED
- Namespace: `sui-walrus`
- Topic: Walrus Memory durable and indexed layers
- Question: In Walrus Memory, what is the durable source of truth and what provides fast semantic search?
- User answer: `не знаю`
- Assessment: Wrong / no model available
- Misconception: The durable storage layer and rebuildable search layer are not distinguished.
- Correct: Encrypted payload blobs on Walrus are the durable source of truth. PostgreSQL with pgvector and an HNSW index stores embeddings for fast semantic search and can be rebuilt from Walrus through restore.
- Severity: high
- Recalled miss count: 1 (session-local; lifetime recall unavailable)

## Event 8

- Status: CONFIRMED
- Namespace: `sui-walrus`
- Topic: Walrus Memory space identity
- Question: What three values define a Walrus Memory space?
- User answer: `не знаю`
- Assessment: Wrong / no model available
- Misconception: The isolation boundary for a Walrus Memory space is unknown.
- Correct: A memory space is identified by the owner address, the developer-defined namespace, and the Walrus Memory app/package ID.
- Severity: high
- Recalled miss count: 1 (session-local; lifetime recall unavailable)

## Event 9

- Status: CONFIRMED
- Namespace: `sui-walrus`
- Topic: Walrus Memory asynchronous indexing
- Question: Why can recall immediately after a successful remember call return nothing?
- User answer: `не знаю`
- Assessment: Wrong / no model available
- Misconception: Accepted durable writes and search-index visibility are assumed to be synchronous.
- Correct: Remember is processed asynchronously. A write can be accepted while embedding and vector indexing still lag for a few seconds, so immediate recall can temporarily be empty.
- Severity: high
- Recalled miss count: 1 (session-local; lifetime recall unavailable)

## Event 10

- Status: CONFIRMED
- Namespace: `sui-walrus`
- Topic: Walrus Memory relayer trust boundary
- Question: Which component can see plaintext in managed Walrus Memory, and how can a user reduce that trust?
- User answer: `не знаю`
- Assessment: Wrong / no model available
- Misconception: The managed relayer's plaintext visibility and alternative trust models are unknown.
- Correct: The managed relayer sees plaintext to generate embeddings and encrypt writes, and sees decrypted recall results. Users can reduce this trust by self-hosting the relayer or using the manual client flow for client-side encryption and embedding.
- Severity: high
- Recalled miss count: 1 (session-local; lifetime recall unavailable)
