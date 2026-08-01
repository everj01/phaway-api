import { User } from 'generated/prisma/client';
import { Exclude, Expose } from 'class-transformer'; // Para excluir campos no necesarios de USER
import { UserRole } from 'generated/prisma/client';

export class UserDefaultEntity implements User {
  @Expose({ name: 'cod' })
  get publicId(): string {
    return this.uuid;
  }

  email!: string;
  role!: UserRole;

  @Exclude()
  password!: string;
  @Exclude()
  id!: number;
  @Exclude()
  deletedAt!: Date | null;
  @Exclude()
  restaurantId!: number;
  @Exclude()
  createdAt!: Date;
  @Exclude()
  updatedAt!: Date;
  @Exclude()
  uuid!: string;

  constructor(partial: Partial<UserDefaultEntity>) {
    Object.assign(this, partial);
  }
}
