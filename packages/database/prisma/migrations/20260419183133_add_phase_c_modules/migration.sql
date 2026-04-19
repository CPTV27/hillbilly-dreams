-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "interval" TEXT NOT NULL,
    "intervalCount" INTEGER NOT NULL DEFAULT 1,
    "trialDays" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "features" JSONB NOT NULL,
    "metadata" JSONB,
    "stripePriceId" TEXT,
    "stripeProductId" TEXT,
    "platformFeePercent" DECIMAL(5,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "clientId" INTEGER,
    "customerEmail" TEXT NOT NULL,
    "customerName" TEXT,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "status" TEXT NOT NULL,
    "currentPeriodStart" TIMESTAMP(3) NOT NULL,
    "currentPeriodEnd" TIMESTAMP(3) NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "canceledAt" TIMESTAMP(3),
    "trialEndsAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "inventoryLevel" INTEGER,
    "trackInventory" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "weight" INTEGER,
    "shippable" BOOLEAN NOT NULL DEFAULT false,
    "taxable" BOOLEAN NOT NULL DEFAULT true,
    "imageUrls" TEXT[],
    "metadata" JSONB,
    "stripeProductId" TEXT,
    "stripePriceId" TEXT,
    "platformFeePercent" DECIMAL(5,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "clientId" INTEGER,
    "customerEmail" TEXT NOT NULL,
    "customerName" TEXT,
    "status" TEXT NOT NULL,
    "subtotalCents" INTEGER NOT NULL,
    "taxCents" INTEGER NOT NULL DEFAULT 0,
    "shippingCents" INTEGER NOT NULL DEFAULT 0,
    "totalCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "stripeCheckoutId" TEXT,
    "stripePaymentIntentId" TEXT,
    "shippingAddress" JSONB,
    "fulfilledAt" TIMESTAMP(3),
    "shippedAt" TIMESTAMP(3),
    "trackingNumber" TEXT,
    "metadata" JSONB,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "totalCents" INTEGER NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleLicenseProfile" (
    "id" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "monthlyMinimumCents" INTEGER NOT NULL DEFAULT 0,
    "feePercent" DECIMAL(5,2) NOT NULL,
    "scope" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModuleLicenseProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModuleEngagement" (
    "id" TEXT NOT NULL,
    "vendorTenantId" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "subscriptionId" TEXT,
    "modules" TEXT[],
    "monthlyRevenueCents" INTEGER NOT NULL,
    "platformFeePercent" DECIMAL(5,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ModuleEngagement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetainerHour" (
    "id" TEXT NOT NULL,
    "bucketMonth" TEXT NOT NULL,
    "consumingEntityId" TEXT NOT NULL,
    "projectRef" TEXT,
    "hoursWorked" DECIMAL(7,2) NOT NULL,
    "hourlyRateCents" INTEGER NOT NULL DEFAULT 5000,
    "totalCents" INTEGER NOT NULL,
    "workedBy" TEXT,
    "workType" TEXT,
    "workedDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "invoiceRef" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RetainerHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusEvent" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "source" TEXT NOT NULL,
    "correlationId" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobId" TEXT,

    CONSTRAINT "BusEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventHandler" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "module" TEXT NOT NULL,
    "tenantScope" TEXT NOT NULL DEFAULT 'own',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "maxRetries" INTEGER NOT NULL DEFAULT 5,
    "timeoutMs" INTEGER NOT NULL DEFAULT 30000,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventHandler_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventDelivery" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "handlerId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "attempt" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventDelivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PodcastShow" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorEmail" TEXT NOT NULL,
    "artworkUrl" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en-us',
    "explicit" BOOLEAN NOT NULL DEFAULT false,
    "buzzsproutId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PodcastShow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PodcastEpisode" (
    "id" TEXT NOT NULL,
    "showId" TEXT NOT NULL,
    "episodeNumber" INTEGER NOT NULL,
    "seasonNumber" INTEGER,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "audioDurationSec" INTEGER NOT NULL,
    "audioSizeBytes" INTEGER NOT NULL,
    "audioMimeType" TEXT NOT NULL DEFAULT 'audio/mpeg',
    "publishedAt" TIMESTAMP(3),
    "buzzsproutEpisodeId" TEXT,
    "sourceClipIds" TEXT[],
    "transcript" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PodcastEpisode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveBroadcast" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scheduledStart" TIMESTAMP(3) NOT NULL,
    "scheduledEnd" TIMESTAMP(3) NOT NULL,
    "actualStart" TIMESTAMP(3),
    "actualEnd" TIMESTAMP(3),
    "platform" TEXT NOT NULL DEFAULT 'tiktok_live',
    "obsScene" TEXT,
    "cameras" JSONB NOT NULL,
    "thumbnailUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "hostUserIds" TEXT[],
    "associatedShowId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LiveBroadcast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BroadcastClip" (
    "id" TEXT NOT NULL,
    "broadcastId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "startSec" INTEGER NOT NULL,
    "endSec" INTEGER NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "caption" TEXT,
    "voiceProfile" TEXT,
    "status" TEXT NOT NULL DEFAULT 'raw',
    "publishedTo" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BroadcastClip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "totalCapacity" INTEGER NOT NULL,
    "reservedCount" INTEGER NOT NULL DEFAULT 0,
    "priceCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerName" TEXT,
    "customerPhone" TEXT,
    "status" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "totalCents" INTEGER NOT NULL,
    "depositCents" INTEGER NOT NULL DEFAULT 0,
    "stripeCheckoutId" TEXT,
    "heldUntil" TIMESTAMP(3),
    "confirmedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "notes" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "bookingId" TEXT,
    "ticketCode" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerName" TEXT,
    "status" TEXT NOT NULL,
    "scannedAt" TIMESTAMP(3),
    "scannedBy" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerPhone" TEXT,
    "eventType" TEXT NOT NULL,
    "proposedDate" TIMESTAMP(3),
    "flexibleDates" BOOLEAN NOT NULL DEFAULT false,
    "guestCount" INTEGER,
    "description" TEXT NOT NULL,
    "budget" TEXT,
    "status" TEXT NOT NULL DEFAULT 'submitted',
    "quoteCents" INTEGER,
    "quoteValidUntil" TIMESTAMP(3),
    "depositCents" INTEGER,
    "depositPaidAt" TIMESTAMP(3),
    "stripePaymentIntentId" TEXT,
    "bookingId" TEXT,
    "internalNotes" TEXT,
    "customerNotes" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Plan_stripePriceId_key" ON "Plan"("stripePriceId");

-- CreateIndex
CREATE INDEX "Plan_tenantId_brand_active_idx" ON "Plan"("tenantId", "brand", "active");

-- CreateIndex
CREATE INDEX "Plan_active_idx" ON "Plan"("active");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_tenantId_slug_key" ON "Plan"("tenantId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripeSubscriptionId_key" ON "Subscription"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "Subscription_tenantId_status_idx" ON "Subscription"("tenantId", "status");

-- CreateIndex
CREATE INDEX "Subscription_clientId_idx" ON "Subscription"("clientId");

-- CreateIndex
CREATE INDEX "Subscription_customerEmail_idx" ON "Subscription"("customerEmail");

-- CreateIndex
CREATE INDEX "Subscription_status_currentPeriodEnd_idx" ON "Subscription"("status", "currentPeriodEnd");

-- CreateIndex
CREATE INDEX "Product_tenantId_brand_active_idx" ON "Product"("tenantId", "brand", "active");

-- CreateIndex
CREATE UNIQUE INDEX "Product_tenantId_slug_key" ON "Product"("tenantId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripeCheckoutId_key" ON "Order"("stripeCheckoutId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_stripePaymentIntentId_key" ON "Order"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "Order_tenantId_status_idx" ON "Order"("tenantId", "status");

-- CreateIndex
CREATE INDEX "Order_clientId_idx" ON "Order"("clientId");

-- CreateIndex
CREATE INDEX "Order_customerEmail_idx" ON "Order"("customerEmail");

-- CreateIndex
CREATE INDEX "Order_status_createdAt_idx" ON "Order"("status", "createdAt");

-- CreateIndex
CREATE INDEX "OrderItem_orderId_idx" ON "OrderItem"("orderId");

-- CreateIndex
CREATE INDEX "OrderItem_productId_idx" ON "OrderItem"("productId");

-- CreateIndex
CREATE INDEX "ModuleLicenseProfile_module_active_idx" ON "ModuleLicenseProfile"("module", "active");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleLicenseProfile_module_tier_key" ON "ModuleLicenseProfile"("module", "tier");

-- CreateIndex
CREATE UNIQUE INDEX "ModuleEngagement_subscriptionId_key" ON "ModuleEngagement"("subscriptionId");

-- CreateIndex
CREATE INDEX "ModuleEngagement_vendorTenantId_status_idx" ON "ModuleEngagement"("vendorTenantId", "status");

-- CreateIndex
CREATE INDEX "ModuleEngagement_status_startedAt_idx" ON "ModuleEngagement"("status", "startedAt");

-- CreateIndex
CREATE INDEX "ModuleEngagement_customerEmail_idx" ON "ModuleEngagement"("customerEmail");

-- CreateIndex
CREATE INDEX "RetainerHour_bucketMonth_consumingEntityId_idx" ON "RetainerHour"("bucketMonth", "consumingEntityId");

-- CreateIndex
CREATE INDEX "RetainerHour_consumingEntityId_workedDate_idx" ON "RetainerHour"("consumingEntityId", "workedDate");

-- CreateIndex
CREATE INDEX "BusEvent_type_tenantId_publishedAt_idx" ON "BusEvent"("type", "tenantId", "publishedAt");

-- CreateIndex
CREATE INDEX "BusEvent_tenantId_publishedAt_idx" ON "BusEvent"("tenantId", "publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "EventHandler_name_key" ON "EventHandler"("name");

-- CreateIndex
CREATE INDEX "EventHandler_eventType_enabled_idx" ON "EventHandler"("eventType", "enabled");

-- CreateIndex
CREATE INDEX "EventDelivery_status_createdAt_idx" ON "EventDelivery"("status", "createdAt");

-- CreateIndex
CREATE INDEX "EventDelivery_eventId_idx" ON "EventDelivery"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "PodcastShow_slug_key" ON "PodcastShow"("slug");

-- CreateIndex
CREATE INDEX "PodcastShow_brand_idx" ON "PodcastShow"("brand");

-- CreateIndex
CREATE INDEX "PodcastEpisode_showId_publishedAt_idx" ON "PodcastEpisode"("showId", "publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PodcastEpisode_showId_episodeNumber_seasonNumber_key" ON "PodcastEpisode"("showId", "episodeNumber", "seasonNumber");

-- CreateIndex
CREATE INDEX "LiveBroadcast_brand_scheduledStart_idx" ON "LiveBroadcast"("brand", "scheduledStart");

-- CreateIndex
CREATE INDEX "LiveBroadcast_status_idx" ON "LiveBroadcast"("status");

-- CreateIndex
CREATE INDEX "BroadcastClip_status_createdAt_idx" ON "BroadcastClip"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "BroadcastClip_broadcastId_sequence_key" ON "BroadcastClip"("broadcastId", "sequence");

-- CreateIndex
CREATE INDEX "Resource_tenantId_brand_active_idx" ON "Resource"("tenantId", "brand", "active");

-- CreateIndex
CREATE INDEX "Resource_type_startsAt_idx" ON "Resource"("type", "startsAt");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_stripeCheckoutId_key" ON "Booking"("stripeCheckoutId");

-- CreateIndex
CREATE INDEX "Booking_tenantId_status_idx" ON "Booking"("tenantId", "status");

-- CreateIndex
CREATE INDEX "Booking_resourceId_status_idx" ON "Booking"("resourceId", "status");

-- CreateIndex
CREATE INDEX "Booking_customerEmail_idx" ON "Booking"("customerEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_ticketCode_key" ON "Ticket"("ticketCode");

-- CreateIndex
CREATE INDEX "Ticket_resourceId_status_idx" ON "Ticket"("resourceId", "status");

-- CreateIndex
CREATE INDEX "Ticket_customerEmail_idx" ON "Ticket"("customerEmail");

-- CreateIndex
CREATE INDEX "Ticket_status_scannedAt_idx" ON "Ticket"("status", "scannedAt");

-- CreateIndex
CREATE UNIQUE INDEX "QuoteRequest_stripePaymentIntentId_key" ON "QuoteRequest"("stripePaymentIntentId");

-- CreateIndex
CREATE INDEX "QuoteRequest_tenantId_status_idx" ON "QuoteRequest"("tenantId", "status");

-- CreateIndex
CREATE INDEX "QuoteRequest_status_createdAt_idx" ON "QuoteRequest"("status", "createdAt");

-- CreateIndex
CREATE INDEX "QuoteRequest_customerEmail_idx" ON "QuoteRequest"("customerEmail");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModuleEngagement" ADD CONSTRAINT "ModuleEngagement_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventDelivery" ADD CONSTRAINT "EventDelivery_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "BusEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventDelivery" ADD CONSTRAINT "EventDelivery_handlerId_fkey" FOREIGN KEY ("handlerId") REFERENCES "EventHandler"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PodcastEpisode" ADD CONSTRAINT "PodcastEpisode_showId_fkey" FOREIGN KEY ("showId") REFERENCES "PodcastShow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BroadcastClip" ADD CONSTRAINT "BroadcastClip_broadcastId_fkey" FOREIGN KEY ("broadcastId") REFERENCES "LiveBroadcast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

