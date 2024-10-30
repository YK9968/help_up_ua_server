/*
  Warnings:

  - Changed the type of `type_work` on the `Opportunity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Opportunity" DROP COLUMN "type_work",
ADD COLUMN     "type_work" TEXT NOT NULL;

-- DropEnum
DROP TYPE "VolunteerType";
