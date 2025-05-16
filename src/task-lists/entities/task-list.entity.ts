import { User } from '../../users/entities/user.entity'; // TypeORM
import { Task } from '../../tasks/entities/task.entity'; // TypeORM



// Prisma schema.prisma definition:
model TaskList {
  id        Int      @id @default(autoincrement())
  name      String
  userId    Int
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tasks     Task[]   @relation(onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([userId, name])