-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Run" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "uploadTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processingStatus" TEXT NOT NULL,
    "rawDataS3Key" TEXT NOT NULL,
    "processedDataS3Key" TEXT,
    "duration" DOUBLE PRECISION,
    "resort" TEXT,
    "runType" TEXT,
    "totalDistance" DOUBLE PRECISION,
    "avgSpeed" DOUBLE PRECISION,
    "maxSpeed" DOUBLE PRECISION,
    "turnCount" INTEGER,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TurnMetric" (
    "id" TEXT NOT NULL,
    "runId" TEXT NOT NULL,
    "turnNumber" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "radius" DOUBLE PRECISION NOT NULL,
    "maxGForce" DOUBLE PRECISION NOT NULL,
    "avgSpeed" DOUBLE PRECISION NOT NULL,
    "rollAngle" DOUBLE PRECISION NOT NULL,
    "circleCenterX" DOUBLE PRECISION,
    "circleCenterY" DOUBLE PRECISION,

    CONSTRAINT "TurnMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Run_userId_uploadTime_idx" ON "Run"("userId", "uploadTime");

-- CreateIndex
CREATE INDEX "TurnMetric_runId_turnNumber_idx" ON "TurnMetric"("runId", "turnNumber");

-- AddForeignKey
ALTER TABLE "Run" ADD CONSTRAINT "Run_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TurnMetric" ADD CONSTRAINT "TurnMetric_runId_fkey" FOREIGN KEY ("runId") REFERENCES "Run"("id") ON DELETE CASCADE ON UPDATE CASCADE;
