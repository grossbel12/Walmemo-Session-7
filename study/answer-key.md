# Facilitator answer key

Do not open this while answering the Session 1 diagnostic.

1. **Confidentiality:** ordinary Walrus blobs are public and discoverable; anyone with the blob ID can retrieve the blob. Sensitive content must be encrypted before storage.
2. **Two identifiers:** the content-derived blob ID is used to retrieve data; the Sui object ID identifies the onchain object used to manage metadata such as lifetime.
3. **Determinism:** the blob ID is derived from the blob's erasure-encoded content/slivers, so identical content produces the same ID.
4. **Permanence:** a permanent blob cannot be deleted before its expiry epoch; a deletable blob can be deleted during its lifetime by the relevant owner. Both still have an expiry period.
5. **Certificate:** it proves that storage nodes controlling the required shard threshold signed receipts and the blob was certified available for its storage period.
6. **Availability:** erasure coding distributes recoverable slivers across shards; after a valid write, reads remain possible with as few as one third of nodes available.
7. **Two layers:** encrypted Walrus blobs are the durable source of truth; PostgreSQL with pgvector/HNSW provides fast semantic recall and can be rebuilt.
8. **Memory space:** owner address, developer-defined namespace, and Walrus Memory app/package ID.
9. **Read-after-write:** remember is asynchronous; embedding/indexing can lag behind the accepted write, so immediate recall can briefly be empty.
10. **Trust boundary:** the managed relayer sees plaintext to embed/encrypt and decrypted recall results. Reduce trust by self-hosting or using the manual client flow for client-side encryption/embedding.

Sources are listed in `SOURCES.md`.

