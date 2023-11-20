/*
  Warnings:

  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `authorId` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `accessLevel` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'DONE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'ES', 'FR', 'DE', 'IT', 'JA', 'KO', 'PT', 'ZH');

-- CreateEnum
CREATE TYPE "TimeFormat" AS ENUM ('TWELVE', 'TWENTY_FOUR');

-- CreateEnum
CREATE TYPE "DateFormat" AS ENUM ('YYYY_MM_DD', 'MM_DD_YYYY', 'DD_MM_YYYY', 'YYYY_MM_DD_HH_MM_SS', 'MM_DD_YYYY_HH_MM_SS', 'DD_MM_YYYY_HH_MM_SS');

-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('LIGHT', 'DARK');

-- CreateEnum
CREATE TYPE "Font" AS ENUM ('ROBOTO', 'ARIAL', 'TIMES_NEW_ROMAN', 'VERDANA');

-- CreateEnum
CREATE TYPE "View" AS ENUM ('LIST', 'BOARD', 'CALENDAR');

-- CreateEnum
CREATE TYPE "SortOrder" AS ENUM ('PRIORITY', 'DUE_DATE', 'CREATED_DATE', 'TITLE');

-- CreateEnum
CREATE TYPE "SortDirection" AS ENUM ('ASC', 'DESC');

-- CreateEnum
CREATE TYPE "TrackMode" AS ENUM ('COUNTDOWN', 'COUNTUP');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'BANK_TRANSFER');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "CommentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('NEWS', 'REVIEWS', 'HOW_TO_GUIDES', 'OPINIONS');

-- CreateEnum
CREATE TYPE "ChatStatus" AS ENUM ('ONLINE', 'OFFLINE', 'BUSY', 'AWAY');

-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('SENT', 'DELIVERED', 'READ');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'IMAGE', 'VIDEO');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "UserRole" ADD VALUE 'MODERATOR';
ALTER TYPE "UserRole" ADD VALUE 'EDITOR';
ALTER TYPE "UserRole" ADD VALUE 'MANAGER';
ALTER TYPE "UserRole" ADD VALUE 'SUPER_ADMIN';

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "authorId" SET NOT NULL,
ALTER COLUMN "authorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Post_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "role",
ADD COLUMN     "accessLevel" TEXT NOT NULL,
ADD COLUMN     "passwordHash" VARCHAR(255) NOT NULL,
ADD COLUMN     "resetPasswordToken" TEXT DEFAULT '',
ADD COLUMN     "roles" "UserRole"[] DEFAULT ARRAY['USER']::"UserRole"[],
ADD COLUMN     "userProfileId" INTEGER,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "name" SET NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "Configuration" (
    "id" SERIAL NOT NULL,
    "headless" BOOLEAN NOT NULL,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeadlessJob" (
    "id" SERIAL NOT NULL,
    "jobType" TEXT NOT NULL,
    "parameters" JSONB NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HeadlessJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Password" (
    "userId" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Password_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMembership" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMembership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "TaskStatus" NOT NULL,
    "creatorId" TEXT NOT NULL,
    "assigneeId" TEXT,
    "assignerId" TEXT,
    "assignedToId" TEXT,
    "teamId" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3),
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentsOnPosts" (
    "id" SERIAL NOT NULL,
    "postId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "CommentsOnPosts_pkey" PRIMARY KEY ("postId","commentId")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT,
    "address" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipCode" TEXT,
    "country" TEXT,
    "dateOfBirth" TIMESTAMP(3),
    "gender" TEXT,
    "occupation" TEXT,
    "education" TEXT,
    "bio" TEXT,
    "website" TEXT,
    "profileImage" TEXT,
    "twitterHandle" TEXT,
    "facebookProfile" TEXT,
    "linkedinProfile" TEXT,
    "instagramHandle" TEXT,
    "tiktokHandle" TEXT,
    "snapchatHandle" TEXT,
    "youtubeChannel" TEXT,
    "interests" TEXT[],
    "hobbies" TEXT[],
    "favoriteMovies" TEXT[],
    "favoriteMusic" TEXT[],
    "favoriteBooks" TEXT[],
    "favoriteTVShows" TEXT[],
    "favoriteGames" TEXT[],
    "favoriteQuotes" TEXT[],
    "skills" TEXT[],
    "certifications" TEXT[],
    "awards" TEXT[],
    "languages" TEXT[],
    "otherDetails" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "userSettingsId" TEXT,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Persona" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "attributes" JSONB,

    CONSTRAINT "Persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL,
    "language" TEXT DEFAULT 'en',
    "timeFormat" TEXT DEFAULT '24',
    "dateFormat" TEXT DEFAULT 'YYYY-MM-DD',
    "timeZone" TEXT DEFAULT 'UTC',
    "emailNotifications" BOOLEAN DEFAULT true,
    "pushNotifications" BOOLEAN DEFAULT true,
    "desktopNotifications" BOOLEAN DEFAULT true,
    "audioNotifications" BOOLEAN DEFAULT false,
    "messageNotifications" BOOLEAN DEFAULT true,
    "videoNotifications" BOOLEAN DEFAULT false,
    "autoPlayVideos" BOOLEAN DEFAULT false,
    "theme" TEXT DEFAULT 'light',
    "font" TEXT DEFAULT 'Roboto',
    "fontSize" INTEGER DEFAULT 16,
    "showCompletedTasks" BOOLEAN DEFAULT false,
    "userPreferences" TEXT,
    "darkMode" BOOLEAN,
    "reminders" BOOLEAN,
    "defaultView" TEXT,
    "twoFactorAuth" BOOLEAN,
    "passwordReset" BOOLEAN,
    "exportData" BOOLEAN,
    "importData" BOOLEAN,
    "activityLog" BOOLEAN,
    "socialMediaSharing" BOOLEAN,
    "connectedAccounts" TEXT,
    "quickAddButton" BOOLEAN,
    "contactList" BOOLEAN,
    "keyboardShortcuts" TEXT,
    "timeTrackings" BOOLEAN,
    "languageSettings" TEXT,
    "invoiceSettings" BOOLEAN,
    "feedback" BOOLEAN,
    "taskSortOrder" TEXT DEFAULT 'priority',
    "taskSortDirection" TEXT DEFAULT 'asc',
    "goalTrackMode" TEXT DEFAULT 'countdown',
    "dailyGoal" INTEGER DEFAULT 0,
    "weeklyGoal" INTEGER DEFAULT 0,
    "monthlyGoal" INTEGER DEFAULT 0,
    "yearlyGoal" INTEGER DEFAULT 0,
    "autoRefresh" BOOLEAN DEFAULT false,
    "autoRefreshInterval" INTEGER DEFAULT 10,
    "fileAttachments" BOOLEAN NOT NULL DEFAULT false,
    "quickAdd" BOOLEAN NOT NULL DEFAULT false,
    "soundEffects" BOOLEAN NOT NULL DEFAULT true,
    "dataVisualization" BOOLEAN NOT NULL DEFAULT false,
    "teamSettings" BOOLEAN NOT NULL DEFAULT false,
    "timeTracking" BOOLEAN NOT NULL DEFAULT false,
    "helpCenter" BOOLEAN NOT NULL DEFAULT false,
    "videoTutorials" BOOLEAN NOT NULL DEFAULT false,
    "exportUserData" BOOLEAN NOT NULL DEFAULT false,
    "socialMediaLinks" BOOLEAN NOT NULL DEFAULT false,
    "emailSignature" TEXT DEFAULT '',
    "contactInformation" BOOLEAN NOT NULL DEFAULT false,
    "habitTracking" BOOLEAN NOT NULL DEFAULT false,
    "customFields" BOOLEAN NOT NULL DEFAULT false,
    "imageUploads" BOOLEAN NOT NULL DEFAULT false,
    "videoUploads" BOOLEAN NOT NULL DEFAULT false,
    "documentUploads" BOOLEAN NOT NULL DEFAULT false,
    "taskTemplates" BOOLEAN NOT NULL DEFAULT false,
    "projectTemplates" BOOLEAN NOT NULL DEFAULT false,
    "customStatuses" BOOLEAN NOT NULL DEFAULT false,
    "communityForum" BOOLEAN NOT NULL DEFAULT false,
    "timeBlocking" BOOLEAN NOT NULL DEFAULT false,
    "customLabels" BOOLEAN NOT NULL DEFAULT false,
    "emailIntegration" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "notification_preferences_id" TEXT NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotificationPreferences" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userSettingsId" TEXT,
    "email" BOOLEAN NOT NULL,
    "push" BOOLEAN NOT NULL,
    "desktop" BOOLEAN NOT NULL,
    "audio" BOOLEAN NOT NULL,
    "message" BOOLEAN NOT NULL,
    "video" BOOLEAN NOT NULL,
    "autoPlay" BOOLEAN NOT NULL,

    CONSTRAINT "NotificationPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_background_jobs" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_profile_personas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_user_personas" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_creatorId_key" ON "Task"("creatorId");

-- CreateIndex
CREATE INDEX "task_creator" ON "Task"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentsOnPosts_id_key" ON "CommentsOnPosts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userSettingsId_key" ON "UserProfile"("userSettingsId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_user_id_key" ON "UserSettings"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationPreferences_userId_key" ON "NotificationPreferences"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_background_jobs_AB_unique" ON "_background_jobs"("A", "B");

-- CreateIndex
CREATE INDEX "_background_jobs_B_index" ON "_background_jobs"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_profile_personas_AB_unique" ON "_profile_personas"("A", "B");

-- CreateIndex
CREATE INDEX "_profile_personas_B_index" ON "_profile_personas"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_user_personas_AB_unique" ON "_user_personas"("A", "B");

-- CreateIndex
CREATE INDEX "_user_personas_B_index" ON "_user_personas"("B");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMembership" ADD CONSTRAINT "TeamMembership_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMembership" ADD CONSTRAINT "TeamMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignerId_fkey" FOREIGN KEY ("assignerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentsOnPosts" ADD CONSTRAINT "CommentsOnPosts_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentsOnPosts" ADD CONSTRAINT "CommentsOnPosts_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userSettingsId_fkey" FOREIGN KEY ("userSettingsId") REFERENCES "UserSettings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotificationPreferences" ADD CONSTRAINT "NotificationPreferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserSettings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_background_jobs" ADD CONSTRAINT "_background_jobs_A_fkey" FOREIGN KEY ("A") REFERENCES "HeadlessJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_background_jobs" ADD CONSTRAINT "_background_jobs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_profile_personas" ADD CONSTRAINT "_profile_personas_A_fkey" FOREIGN KEY ("A") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_profile_personas" ADD CONSTRAINT "_profile_personas_B_fkey" FOREIGN KEY ("B") REFERENCES "UserProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_personas" ADD CONSTRAINT "_user_personas_A_fkey" FOREIGN KEY ("A") REFERENCES "Persona"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_user_personas" ADD CONSTRAINT "_user_personas_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
