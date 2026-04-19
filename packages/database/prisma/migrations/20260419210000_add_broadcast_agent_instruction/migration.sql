-- CreateTable
CREATE TABLE "BroadcastAgentInstruction" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "priority" INTEGER NOT NULL DEFAULT 0,
    "claimedAt" TIMESTAMP(3),
    "ackedAt" TIMESTAMP(3),
    "result" JSONB,
    "error" TEXT,
    "issuedBy" TEXT,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BroadcastAgentInstruction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BroadcastAgentInstruction_status_priority_issuedAt_idx" ON "BroadcastAgentInstruction"("status", "priority", "issuedAt");

-- CreateIndex
CREATE INDEX "BroadcastAgentInstruction_status_claimedAt_idx" ON "BroadcastAgentInstruction"("status", "claimedAt");

