I evolved Exam Mistake Memory into an append-only learning ledger on Walrus.

10/10 real baseline mistakes were recalled at the next session boundary. V2 ranked weaknesses transparently and refused to count assistant-supplied answers as progress.

Surprise: exact-key recall stopped an indexed duplicate, but an async indexing race still produced 2 blobs for 1 event key. Server-side idempotency would fix it.

Article: [LINK]
Prompt + evidence: https://github.com/grossbel12/Walmemo-Session-7

@WalrusProtocol #WalrusMemory
