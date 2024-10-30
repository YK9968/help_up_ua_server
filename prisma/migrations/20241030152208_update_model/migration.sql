/*
  Warnings:

  - Changed the type of `type_work` on the `Opportunity` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "VolunteerType" AS ENUM ('SOCIAL_ASSISTANCE', 'ENVIRONMENTAL_ACTIVITIES', 'EDUCATION_MENTORING', 'MEDICAL_SERVICES', 'SUPPORT_FOR_ELDERLY', 'ANIMAL_WELFARE', 'CULTURAL_INITIATIVES', 'HUMANITARIAN_MISSIONS', 'SPORTS_INITIATIVES', 'CRISIS_RESPONSE_VOLUNTEERING');

-- AlterTable
ALTER TABLE "Opportunity" DROP COLUMN "type_work",
ADD COLUMN     "type_work" "VolunteerType" NOT NULL;

-- DropEnum
DROP TYPE "VolunteerCategory";
