import { Prisma, Alignment as ADbModel } from '@prisma/client';

export type Alignment = ADbModel;

export type Player = Prisma.PlayerGetPayload<{ include: { team?: true } }>;

export type Team = Prisma.TeamGetPayload<{
  include: { alignment: true; players: true };
}>;
